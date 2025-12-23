
"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

// For a real application, this should be stored securely in environment variables.
// The current password is an improvement for security and professionalism.
const ADMIN_PASSWORD = "MercaditoAdmin2024";
const AUTH_STORAGE_KEY = "mercadito_express_auth";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This check now correctly runs only on the client side, after initial render.
    // This prevents hydration mismatches.
    try {
      const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Could not access session storage:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
        setIsAuthenticated(true);
        return true;
      } catch (e) {
        console.error("Could not access session storage:", e);
        return false;
      }
    }
    return false;
  }, []);

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(false);
      router.push("/login");
    } catch (e) {
      console.error("Could not access session storage:", e);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
