"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ExchangeRateProvider } from "@/context/ExchangeRateContext";
import { Toaster } from "./ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExchangeRateProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </ExchangeRateProvider>
    </AuthProvider>
  );
}
