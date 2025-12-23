'use client';

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/products';

const PRODUCT_VISIBILITY_STORAGE_KEY = 'bodega_product_visibility';

interface ProductContextType {
  products: Product[];
  toggleProductVisibility: (productId: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() =>
    initialProducts.map((p) => ({ ...p, isVisible: true }))
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedVisibility = localStorage.getItem(
        PRODUCT_VISIBILITY_STORAGE_KEY
      );
      if (storedVisibility) {
        const visibilityMap = JSON.parse(storedVisibility);
        setProducts((prevProducts) =>
          prevProducts.map((p) => ({
            ...p,
            isVisible: visibilityMap[p.id] ?? true,
          }))
        );
      }
    } catch (e) {
      console.error('Could not access local storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleProductVisibility = useCallback((productId: string) => {
    let updatedVisibility: Record<string, boolean> = {};
    setProducts((prevProducts) => {
      const newProducts = prevProducts.map((p) => {
        if (p.id === productId) {
          return { ...p, isVisible: !p.isVisible };
        }
        return p;
      });

      updatedVisibility = newProducts.reduce((acc, p) => {
        acc[p.id] = p.isVisible!;
        return acc;
      }, {} as Record<string, boolean>);

      return newProducts;
    });

    try {
      localStorage.setItem(
        PRODUCT_VISIBILITY_STORAGE_KEY,
        JSON.stringify(updatedVisibility)
      );
    } catch (e) {
      console.error('Could not access local storage:', e);
    }
  }, []);
  
  if (!isLoaded) {
    return null; // Or a loading indicator
  }

  return (
    <ProductContext.Provider value={{ products, toggleProductVisibility }}>
      {children}
    </ProductContext.Provider>
  );
};
