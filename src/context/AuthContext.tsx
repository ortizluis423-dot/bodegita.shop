"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "cazaputas32";
const AUTH_STORAGE_KEY = "bodega_auth";

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

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch (e) {
        console.error("Could not access session storage:", e);
      }
      return true;
    }
    return false;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Could not access session storage:", e);
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
