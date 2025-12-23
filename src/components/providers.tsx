'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ExchangeRateProvider } from '@/context/ExchangeRateContext';
import { ProductProvider } from '@/context/ProductContext';
import { Toaster } from './ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExchangeRateProvider>
        <ProductProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ProductProvider>
      </ExchangeRateProvider>
    </AuthProvider>
  );
}
