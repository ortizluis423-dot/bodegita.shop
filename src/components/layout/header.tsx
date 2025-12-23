"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { useCart } from "@/hooks/use-cart";
import { useMounted } from "@/hooks/use-mounted";

export function Header() {
  const { cartCount } = useCart();
  const mounted = useMounted();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-foreground font-headline">Mercadito Express</h1>
        </Link>
        
        <div className="flex items-center space-x-1">
          {mounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Open shopping cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <CartSheet />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
