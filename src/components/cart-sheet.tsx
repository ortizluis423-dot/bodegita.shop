'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { useExchangeRate } from '@/hooks/use-exchange-rate';
import { formatToUSD, formatToVES } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingCart, Send } from 'lucide-react';
import { format } from 'date-fns';

export function CartSheet() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPriceUSD } =
    useCart();
  const { rate } = useExchangeRate();

  const totalPriceVES = totalPriceUSD * rate;
  const phoneNumber = '584122877326'; // Número de Venezuela sin el '+'

  const handleWhatsAppCheckout = () => {
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

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message.trim()
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Mi Carrito</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      {cartItems.length > 0 ? (
        <div className="flex h-full flex-col">
          <ScrollArea className="flex-grow pr-4">
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={item.image.hint}
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatToUSD(item.priceUSD)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto pt-6">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <div className="text-right">
                  <p>{formatToUSD(totalPriceUSD)}</p>
                  <p className="text-base text-muted-foreground">
                    {formatToVES(totalPriceVES)}
                  </p>
                </div>
              </div>
              <Button className="w-full" onClick={handleWhatsAppCheckout}>
                <Send className="mr-2 h-4 w-4" />
                Realizar Pedido por WhatsApp
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={clearCart}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Vaciar Carrito
              </Button>
            </div>
          </SheetFooter>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
          <p className="text-lg font-semibold">Tu carrito está vacío</p>
          <p className="text-muted-foreground">¡Añade productos para empezar!</p>
        </div>
      )}
    </>
  );
}
