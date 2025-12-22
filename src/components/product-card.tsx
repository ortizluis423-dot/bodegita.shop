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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.image.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
        <CardDescription className="mt-2 text-sm">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 pt-0">
        <div className="w-full">
          <p className="text-xl font-bold">{formatToUSD(product.priceUSD)}</p>
          <p className="text-md text-muted-foreground">{formatToVES(priceVES)}</p>
        </div>
        <Button className="w-full mt-4" onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
