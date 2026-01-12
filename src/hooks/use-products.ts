
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFirestore } from '@/hooks/use-firestore';
import { collection, doc, onSnapshot, writeBatch, updateDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/products';

const PRODUCTS_COLLECTION = 'products';

export const useProducts = () => {
  // Start with local data for instant load, then hydrate with Firestore
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
        // If firestore is not ready, we rely on the initial static data.
        // We can set loading to false as we are not expecting more data.
        setLoading(false);
        return;
    };

    const productsCollectionRef = collection(firestore, PRODUCTS_COLLECTION);
    
    const unsubscribe = onSnapshot(productsCollectionRef, async (querySnapshot) => {
      if (querySnapshot.empty) {
        setLoading(true);
        console.log("Products collection is empty. Initializing with default products...");
        try {
            const batch = writeBatch(firestore);
            initialProducts.forEach(product => {
              const docRef = doc(firestore, PRODUCTS_COLLECTION, product.id);
              batch.set(docRef, { 
                ...product, 
                isVisible: product.isVisible === undefined ? true : product.isVisible 
              });
            });
            await batch.commit();
            // After commit, the snapshot listener will be triggered again with the new data
            // setLoading will be set to false at that point.
        } catch (error) {
            console.error("Error initializing products:", error);
            setProducts(initialProducts); // fallback to local
            setLoading(false);
        }
      } else {
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        // Sort based on the order in the local `initialProducts` file for consistency
        productsData.sort((a, b) => {
          const aIndex = initialProducts.findIndex(p => p.id === a.id);
          const bIndex = initialProducts.findIndex(p => p.id === b.id);
          if (aIndex === -1 && bIndex === -1) return 0; // both not in initial list
          if (aIndex === -1) return 1; // a is not in the list, goes to end
          if (bIndex === -1) return -1; // b is not in the list, goes to end
          return aIndex - bIndex;
        });

        setProducts(productsData);
        setLoading(false);
      }
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      setProducts(initialProducts); // Fallback to local data on error
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);


  const toggleProductVisibility = useCallback(async (productId: string) => {
    if (!firestore) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const docRef = doc(firestore, PRODUCTS_COLLECTION, productId);
    try {
      // Use isVisible !== false to default to visible if undefined
      await updateDoc(docRef, { isVisible: !(product.isVisible !== false) });
    } catch (error) {
      console.error("Error updating product visibility:", error);
    }
  }, [products, firestore]);

  const updateProductPrice = useCallback(async (productId: string, newPrice: number) => {
    if (!firestore || isNaN(newPrice)) return;
    
    const docRef = doc(firestore, PRODUCTS_COLLECTION, productId);
    try {
      await updateDoc(docRef, { priceUSD: newPrice });
    } catch (error) {
      console.error("Error updating product price:", error);
    }
  }, [firestore]);
  
  return { products, loading, toggleProductVisibility, updateProductPrice };
};
