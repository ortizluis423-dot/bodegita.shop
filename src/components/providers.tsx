
'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { ExchangeRateProvider } from '@/context/ExchangeRateContext';
import { ProductProvider } from '@/context/ProductContext';
import { Toaster } from './ui/toaster';
import { FirebaseProvider } from '@/context/FirebaseContext';
import { ThemeProvider } from 'next-themes';

/**
 * @deprecated Use AppProviders instead. This is kept for backwards compatibility.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProviders>{children}</AppProviders>
    </ThemeProvider>
  )
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
