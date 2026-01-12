
'use client';

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useFirestore } from '@/hooks/use-firestore';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const SETTINGS_COLLECTION = 'settings';
const CONFIG_DOC = 'config';
const DEFAULT_RATE = 36.5;

interface ExchangeRateContextType {
  rate: number;
  loading: boolean;
  setRate: (rate: number) => void;
}

export const ExchangeRateContext = createContext<
  ExchangeRateContextType | undefined
>(undefined);

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const [rate, setRateState] = useState(0);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) return;

    setLoading(true);
    const docRef = doc(firestore, SETTINGS_COLLECTION, CONFIG_DOC);

    const unsubscribe = onSnapshot(
      docRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRateState(data.exchangeRate || DEFAULT_RATE);
        } else {
          // If the config document doesn't exist, create it with the default rate
          try {
            await setDoc(docRef, { exchangeRate: DEFAULT_RATE });
            setRateState(DEFAULT_RATE);
          } catch (error) {
            console.error("Error creating config document:", error);
            setRateState(DEFAULT_RATE); // Fallback
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to exchange rate changes:", error);
        setRateState(DEFAULT_RATE); // Fallback on error
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firestore]);


  const setRate = useCallback(async (newRate: number) => {
    if (!firestore) {
      console.error("Firestore not available to set rate.");
      return;
    }
    const docRef = doc(firestore, SETTINGS_COLLECTION, CONFIG_DOC);
    try {
      await setDoc(docRef, { exchangeRate: newRate }, { merge: true });
      // The onSnapshot listener will automatically update the state
    } catch (e) {
      console.error('Could not save rate to Firestore:', e);
    }
  }, [firestore]);

  return (
    <ExchangeRateContext.Provider value={{ rate, setRate, loading }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
