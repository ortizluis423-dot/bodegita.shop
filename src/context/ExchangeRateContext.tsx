'use client';

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

const EXCHANGE_RATE_STORAGE_KEY = 'bodega_exchange_rate';
const DEFAULT_RATE = 36.5;

interface ExchangeRateContextType {
  rate: number;
  setRate: (rate: number) => void;
}

export const ExchangeRateContext = createContext<
  ExchangeRateContextType | undefined
>(undefined);

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const [rate, setRateState] = useState(DEFAULT_RATE);

  useEffect(() => {
    try {
      const storedRate = localStorage.getItem(EXCHANGE_RATE_STORAGE_KEY);
      if (storedRate) {
        setRateState(parseFloat(storedRate));
      }
    } catch (e) {
      console.error('Could not access local storage:', e);
    }
  }, []);

  const setRate = useCallback((newRate: number) => {
    setRateState(newRate);
    try {
      localStorage.setItem(EXCHANGE_RATE_STORAGE_KEY, newRate.toString());
    } catch (e) {
      console.error('Could not access local storage:', e);
    }
  }, []);

  return (
    <ExchangeRateContext.Provider value={{ rate, setRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
