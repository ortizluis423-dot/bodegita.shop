
"use client";

import { useContext } from "react";
import { FirebaseContext } from "@/context/FirebaseContext";

export const useFirestore = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirestore must be used within a FirebaseProvider");
  }
  return context.firestore;
};
