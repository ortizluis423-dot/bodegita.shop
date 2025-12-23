"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatToUSD, formatToVES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { rate } = useExchangeRate();

  const priceVES = product.priceUSD * rate;

  return (
    <div className="group relative flex flex-col h-full bg-card p-4 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          data-ai-hint={product.image.hint}
        />
         <div className="absolute bottom-2 right-2 flex flex-col items-end">
          <p className="text-lg font-bold text-background bg-foreground/80 px-2 py-0.5 rounded-md backdrop-blur-sm">{formatToUSD(product.priceUSD)}</p>
          <p className="text-xs text-background bg-foreground/60 px-2 py-0.5 rounded-md backdrop-blur-sm mt-1">{formatToVES(priceVES)}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-base font-semibold text-foreground">
             {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
       
      </div>
      <Button variant="outline" size="sm" className="w-full mt-4" onClick={(e) => {
         e.preventDefault();
         addToCart(product)
        }}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir
        </Button>
    </div>
  );
}
