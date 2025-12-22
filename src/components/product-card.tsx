"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatToUSD, formatToVES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { rate } = useExchangeRate();

  const priceVES = product.priceUSD * rate;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-xl">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={product.image.hint}
        />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold font-headline flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <div className="w-full mb-4">
          <p className="text-2xl font-bold">{formatToUSD(product.priceUSD)}</p>
          <p className="text-sm text-muted-foreground">{formatToVES(priceVES)}</p>
        </div>
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
