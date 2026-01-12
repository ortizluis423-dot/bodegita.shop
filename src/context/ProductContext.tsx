
'use client';

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useFirestore } from '@/hooks/use-firestore';
import { collection, doc, getDocs, onSnapshot, writeBatch, updateDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/products';

interface ProductContextType {
  products: Product[];
  toggleProductVisibility: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  loading: boolean;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

const PRODUCTS_COLLECTION = 'products';

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    setLoading(true);
    const productsCollectionRef = collection(firestore, PRODUCTS_COLLECTION);
    
    const unsubscribe = onSnapshot(productsCollectionRef, async (querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("Products collection is empty. Initializing with default products...");
        const batch = writeBatch(firestore);
        initialProducts.forEach(product => {
          const docRef = doc(firestore, PRODUCTS_COLLECTION, product.id);
          batch.set(docRef, { ...product, isVisible: product.isVisible ?? true });
        });
        await batch.commit();
      } else {
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        productsData.sort((a, b) => {
          const aIndex = initialProducts.findIndex(p => p.id === a.id);
          const bIndex = initialProducts.findIndex(p => p.id === b.id);
          // If a product is not in initialProducts, place it at the end.
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        setProducts(productsData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      setProducts(initialProducts); 
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);


  const toggleProductVisibility = useCallback(async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product || !firestore) return;
    
    const docRef = doc(firestore, PRODUCTS_COLLECTION, productId);
    try {
      await updateDoc(docRef, { isVisible: !product.isVisible });
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

  return (
    <ProductContext.Provider value={{ products, toggleProductVisibility, updateProductPrice, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
