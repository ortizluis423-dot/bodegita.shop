"use client";

import { createContext, useState, ReactNode } from "react";

interface ExchangeRateContextType {
  rate: number;
  setRate: (rate: number) => void;
}

export const ExchangeRateContext = createContext<ExchangeRateContextType | undefined>(undefined);

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const [rate, setRate] = useState(36.50); // Default rate

  return (
    <ExchangeRateContext.Provider value={{ rate, setRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
