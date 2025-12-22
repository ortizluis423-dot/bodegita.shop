"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatToUSD, formatToVES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export function CartSheet() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPriceUSD } = useCart();
  const { rate } = useExchangeRate();

  const totalPriceVES = totalPriceUSD * rate;

  return (
    <>
      <SheetHeader>
        <SheetTitle>Mi Carrito</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      {cartItems.length > 0 ? (
        <div className="flex flex-col h-full">
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
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
          <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <div className="text-right">
                  <p>{formatToUSD(totalPriceUSD)}</p>
                  <p className="text-muted-foreground text-base">{formatToVES(totalPriceVES)}</p>
                </div>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </div>
          </SheetFooter>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold">Tu carrito está vacío</p>
          <p className="text-muted-foreground">¡Añade productos para empezar!</p>
        </div>
      )}
    </>
  );
}
