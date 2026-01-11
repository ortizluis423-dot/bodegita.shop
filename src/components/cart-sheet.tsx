
'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useExchangeRate } from '@/hooks/use-exchange-rate';
import {
  formatToUSD,
  formatToVES,
  generateWhatsAppCheckoutMessage,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingCart, Send } from 'lucide-react';
import { useFirestore } from '@/hooks/use-firestore';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export function CartSheet() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPriceUSD,
  } = useCart();
  const { rate, loading: rateLoading } = useExchangeRate();
  const firestore = useFirestore();

  const totalPriceVES = useMemo(
    () => totalPriceUSD * rate,
    [totalPriceUSD, rate]
  );
  const phoneNumber = '584122877326';

  const handleWhatsAppCheckout = async () => {
    if (!firestore || rateLoading) return;

    const message = generateWhatsAppCheckoutMessage(
      cartItems,
      totalPriceUSD,
      totalPriceVES,
      rate
    );

    // 1. Save order to Firestore
    try {
      const ordersCollection = collection(firestore, 'orders');
      await addDoc(ordersCollection, {
        createdAt: serverTimestamp(),
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          priceUSD: item.priceUSD,
        })),
        totalPriceUSD,
        totalPriceVES,
        exchangeRate: rate,
      });
      // Optionally clear cart after saving, or after sending message
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
      // Optionally, show an error message to the user
    }

    // 2. Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
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
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="object-cover"
                      data-ai-hint={item.image.hint}
                    />
                  </div>
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
                  { !rateLoading && rate > 0 && <p className="text-base text-muted-foreground">{formatToVES(totalPriceVES)}</p> }
                </div>
              </div>
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleWhatsAppCheckout}
                disabled={!firestore || rateLoading}
              >
                <Send className="mr-2 h-4 w-4" />
                Realizar Pedido por WhatsApp
              </Button>
              <Button
                variant="outline"
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
          <p className="text-muted-foreground">
            ¡Añade productos para empezar!
          </p>
        </div>
      )}
    </>
  );
}
