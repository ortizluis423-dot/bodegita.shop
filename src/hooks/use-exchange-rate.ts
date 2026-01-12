
'use client';

import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/use-firestore';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const SETTINGS_COLLECTION = 'settings';
const CONFIG_DOC = 'config';
const DEFAULT_RATE = 36.5;

export const useExchangeRate = () => {
  const [rate, setRateState] = useState(DEFAULT_RATE);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(true);
      return;
    };

    const docRef = doc(firestore, SETTINGS_COLLECTION, CONFIG_DOC);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRateState(data.exchangeRate || DEFAULT_RATE);
      } else {
        setDoc(docRef, { exchangeRate: DEFAULT_RATE }).catch(e => console.error("Failed to create default rate doc", e));
        setRateState(DEFAULT_RATE);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error subscribing to exchange rate:", error);
      setRateState(DEFAULT_RATE);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const setRate = async (newRate: number) => {
    if (!firestore) {
      console.error("Firestore not available to set rate.");
      return;
    }
    const docRef = doc(firestore, SETTINGS_COLLECTION, CONFIG_DOC);
    try {
      await setDoc(docRef, { exchangeRate: newRate }, { merge: true });
    } catch (e) {
      console.error('Could not save rate to Firestore:', e);
    }
  };

  return { rate, loading, setRate };
};
