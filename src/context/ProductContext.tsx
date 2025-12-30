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

const PRODUCT_STATE_STORAGE_KEY = 'bodega_product_state';

interface ProductContextType {
  products: Product[];
  toggleProductVisibility: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem(PRODUCT_STATE_STORAGE_KEY);
      if (storedState) {
        const productState = JSON.parse(storedState);
        setProducts((prevProducts) =>
          prevProducts.map((p) => ({
            ...p,
            isVisible: productState[p.id]?.isVisible ?? true,
            priceUSD: productState[p.id]?.priceUSD ?? p.priceUSD,
          }))
        );
      } else {
        setProducts((prevProducts) =>
          prevProducts.map((p) => ({ ...p, isVisible: true }))
        );
      }
    } catch (e) {
      console.error('Could not access local storage:', e);
       setProducts((prevProducts) =>
          prevProducts.map((p) => ({ ...p, isVisible: true }))
        );
    }
  }, []);

  const saveProductState = (updatedProducts: Product[]) => {
    try {
       const productState = updatedProducts.reduce((acc, p) => {
        acc[p.id] = { isVisible: p.isVisible, priceUSD: p.priceUSD };
        return acc;
      }, {} as Record<string, { isVisible?: boolean, priceUSD: number }>);

      localStorage.setItem(
        PRODUCT_STATE_STORAGE_KEY,
        JSON.stringify(productState)
      );
    } catch (e) {
       console.error('Could not access local storage:', e);
    }
  }

  const toggleProductVisibility = useCallback((productId: string) => {
    setProducts((currentProducts) => {
      const newProducts = currentProducts.map((p) => {
        if (p.id === productId) {
          return { ...p, isVisible: !p.isVisible };
        }
        return p;
      });
      saveProductState(newProducts);
      return newProducts;
    });
  }, []);

  const updateProductPrice = useCallback((productId: string, newPrice: number) => {
    setProducts((currentProducts) => {
      const newProducts = currentProducts.map((p) => {
        if (p.id === productId) {
          return { ...p, priceUSD: newPrice };
        }
        return p;
      });
      saveProductState(newProducts);
      return newProducts;
    });
  }, []);

  return (
    <ProductContext.Provider value={{ products, toggleProductVisibility, updateProductPrice }}>
      {children}
    </ProductContext.Provider>
  );
};
