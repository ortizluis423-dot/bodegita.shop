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
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-secondary lg:h-80">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          data-ai-hint={product.image.hint}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            {/* The link is now on the product name */}
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-2 flex flex-col items-start">
          <p className="text-base font-bold text-foreground">{formatToUSD(product.priceUSD)}</p>
          <p className="text-sm text-muted-foreground">{formatToVES(priceVES)}</p>
        </div>
      </div>
       <Button size="sm" className="w-full mt-4" onClick={(e) => {
         e.preventDefault();
         addToCart(product)
        }}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir
        </Button>
    </div>
  );
}
