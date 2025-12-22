"use client";

import { useState, useEffect } from "react";

/**
 * Hook para determinar si un componente está montado en el cliente.
 * Ayuda a prevenir errores de hidratación en Next.js al renderizar componentes
 * que dependen de APIs del navegador o generan IDs únicos solo en el lado del cliente.
 *
 * @returns {boolean} `true` si el componente está montado, de lo contrario `false`.
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
