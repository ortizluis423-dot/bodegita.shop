import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import type { CartItem } from './types';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToUSD(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatToVES(amount: number) {
  return `Bs. ${amount.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function generateWhatsAppCheckoutMessage(
  cartItems: CartItem[],
  totalPriceUSD: number,
  totalPriceVES: number,
  rate: number
): string {
  const referenceNumber = format(new Date(), 'yyyyMMddHHmmss');

  const orderDetails = cartItems
    .map(
      (item) =>
        `*${item.name}*\n` +
        `  - Cantidad: ${item.quantity}\n` +
        `  - Precio: ${formatToUSD(item.priceUSD * item.quantity)}`
    )
    .join('\n\n');

  const message = `
¡Hola! 👋 Quiero realizar el siguiente pedido:

*Número de Referencia:* ${referenceNumber}

*Detalles del Pedido:*
${orderDetails}

-----------------------------------
*Total en USD:* ${formatToUSD(totalPriceUSD)}
*Total en Bs.:* ${formatToVES(totalPriceVES)} (Tasa: ${rate.toFixed(2)} Bs./USD)

¡Gracias!
    `;

  return message.trim();
}


export function generateWhatsAppCashAdvanceMessage(
  amountVES: number,
  amountUSD: number,
  totalUSDToPay: number,
  totalVESToPay: number,
  rate: number,
  surcharge: number
): string {
  const referenceNumber = format(new Date(), 'yyyyMMddHHmmss');
  
  const message = `
¡Hola! 👋 Quiero solicitar un Avance de Efectivo.

*Número de Referencia:* ${referenceNumber}

*Detalles de la Solicitud:*
  - Monto Solicitado: ${formatToVES(amountVES)}
  - Equivalente en USD: ${formatToUSD(amountUSD)}
  - Recargo (${surcharge * 100}%): ${formatToUSD(amountUSD * surcharge)}
-----------------------------------
*Total a Pagar (USD):* ${formatToUSD(totalUSDToPay)}
*Total a Pagar (Bs.):* ${formatToVES(totalVESToPay)} (Tasa: ${rate.toFixed(2)} Bs./USD)

¡Gracias!
    `;

  return message.trim();
}
