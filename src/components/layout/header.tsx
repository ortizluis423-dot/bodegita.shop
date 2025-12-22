"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-headline text-primary">Bodega Express</h1>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
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
          </nav>
        </div>
      </div>
    </header>
  );
}
