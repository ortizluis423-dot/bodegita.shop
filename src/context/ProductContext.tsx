
'use client';

import { createContext, ReactNode } from 'react';
import type { Product } from '@/lib/types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  toggleProductVisibility: (productId: string) => Promise<void>;
  updateProductPrice: (productId: string, newPrice: number) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // The provider is now a shell. The data fetching logic has been moved 
  // to the useProducts hook to improve performance and data ownership.
  const contextValue = {
    products: [],
    loading: true,
    toggleProductVisibility: async () => {},
    updateProductPrice: async () => {},
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
