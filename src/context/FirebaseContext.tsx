
"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

interface FirebaseContextType {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
}

export const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

// Helper function to validate environment variables
const validateFirebaseConfig = (config: any) => {
  const requiredKeys = [
    'apiKey', 
    'authDomain', 
    'projectId', 
    'storageBucket', 
    'messagingSenderId', 
    'appId'
  ];
  const missingKeys = requiredKeys.filter(key => !config[key]);
  if (missingKeys.length > 0) {
    console.error(`Firebase config is missing or invalid: ${missingKeys.join(', ')}. Make sure your .env.local file is correct and Netlify environment variables are set.`);
    return false;
  }
  return true;
};


export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [firebase, setFirebase] = useState<FirebaseContextType>({
    app: null,
    firestore: null,
    auth: null,
  });

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    
    // Initialize Firebase only in the browser and if config is valid
    if (typeof window !== "undefined" && validateFirebaseConfig(firebaseConfig)) {
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const firestore = getFirestore(app);
      const auth = getAuth(app);
      setFirebase({ app, firestore, auth });
    }
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
