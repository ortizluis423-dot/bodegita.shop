
'use client';

import { createContext, ReactNode } from 'react';

interface ExchangeRateContextType {
  rate: number;
  loading: boolean;
  setRate: (rate: number) => Promise<void>;
}

export const ExchangeRateContext = createContext<
  ExchangeRateContextType | undefined
>(undefined);

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  // The provider is now a shell. The data fetching logic has been moved
  // to the useExchangeRate hook to improve performance and data ownership.
  const contextValue = {
    rate: 0,
    loading: true,
    setRate: async () => {},
  };

  return (
    <ExchangeRateContext.Provider value={contextValue}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
