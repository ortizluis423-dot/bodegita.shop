
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
import { useExchangeRate } from '@/hooks/use-exchange-rate';

const PRODUCT_STATE_STORAGE_KEY = 'bodega_product_state';

interface ProductContextType {
  products: Product[];
  toggleProductVisibility: (productId: string) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
  loading: boolean;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { rate } = useExchangeRate(); 

  // Re-calculate prices when rate changes
  useEffect(() => {
    // This just forces a re-render of components using the product context.
    setProducts(currentProducts => [...currentProducts]);
  }, [rate]);

  // Load initial products from localStorage on the client side
  useEffect(() => {
    setLoading(true);
    try {
      const storedState = localStorage.getItem(PRODUCT_STATE_STORAGE_KEY);
      const baseProducts = initialProducts.map(p => ({ ...p, isVisible: p.isVisible ?? true }));
      
      let hydratedProducts: Product[];
      if (storedState) {
        const productState = JSON.parse(storedState);
        hydratedProducts = baseProducts.map((p) => ({
          ...p,
          isVisible: productState[p.id]?.isVisible ?? p.isVisible,
          priceUSD: productState[p.id]?.priceUSD ?? p.priceUSD,
        })).sort((a, b) => {
            const initialIndexA = initialProducts.findIndex(p => p.id === a.id);
            const initialIndexB = initialProducts.findIndex(p => p.id === b.id);
            return initialIndexA - initialIndexB;
        });
      } else {
        hydratedProducts = baseProducts;
      }
      setProducts(hydratedProducts);
    } catch (e) {
      console.error('Could not access local storage, using initial products:', e);
      setProducts(initialProducts.map(p => ({ ...p, isVisible: p.isVisible ?? true })));
    } finally {
       setLoading(false);
    }
  }, []);

  const saveProductState = useCallback((updatedProducts: Product[]) => {
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
  }, []);

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
  }, [saveProductState]);

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
  }, [saveProductState]);

  return (
    <ProductContext.Provider value={{ products, toggleProductVisibility, updateProductPrice, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
