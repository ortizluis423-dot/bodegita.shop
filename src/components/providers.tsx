'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ExchangeRateProvider } from '@/context/ExchangeRateContext';
import { ProductProvider } from '@/context/ProductContext';
import { Toaster } from './ui/toaster';
import { FirebaseProvider } from '@/context/FirebaseContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <FirebaseProvider>
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
      </FirebaseProvider>
    </ThemeProvider>
  );
}
