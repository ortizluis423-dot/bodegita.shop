
"use client";

import { useContext } from "react";
import { ExchangeRateContext } from "@/context/ExchangeRateContext";

export const useExchangeRate = () => {
  const context = useContext(ExchangeRateContext);
  if (context === undefined) {
    throw new Error("useExchangeRate must be used within an ExchangeRateProvider");
  }
  return context;
};
