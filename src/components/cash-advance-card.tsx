"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { formatToUSD, formatToVES } from "@/lib/utils";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { format } from "date-fns";

export function CashAdvanceCard() {
  const [amount, setAmount] = useState(0);
  const { rate } = useExchangeRate();
  const cashAdvanceImage = PlaceHolderImages.find(
    (img) => img.id === "avance-efectivo"
  );

  if (!cashAdvanceImage) {
    return null;
  }

  const surcharge = 0.1; // 10%
  const totalAmount = amount * (1 + surcharge);
  const totalAmountVES = totalAmount * rate;
  const phoneNumber = "584122877326";

  const handleWhatsAppRequest = () => {
    if (amount <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }

    const referenceNumber = format(new Date(), "yyyyMMddHHmmss");

    const message = `
¡Hola! 👋 Quiero solicitar un Avance de Efectivo.

*Número de Referencia:* ${referenceNumber}

*Detalles de la Solicitud:*
  - Monto Solicitado: ${formatToUSD(amount)}
  - Recargo (10%): ${formatToUSD(amount * surcharge)}
-----------------------------------
*Total a Pagar (USD):* ${formatToUSD(totalAmount)}
*Total a Pagar (Bs.):* ${formatToVES(totalAmountVES)} (Tasa: ${rate.toFixed(
      2
    )} Bs./USD)

¡Gracias!
    `;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message.trim()
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl">
      <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto">
        <Image
          src={cashAdvanceImage.imageUrl}
          alt={cashAdvanceImage.description}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          data-ai-hint={cashAdvanceImage.imageHint}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Avance de Efectivo
          </CardTitle>
          <CardDescription>
            Solicita tu avance de efectivo con un 10% de recargo. Recibe el
            pago por transferencia.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cash-amount">Monto en USD</Label>
            <Input
              type="number"
              id="cash-amount"
              placeholder="Ej: 50.00"
              value={amount || ""}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="text-lg font-bold"
            />
          </div>
          {amount > 0 && (
            <div className="p-4 bg-muted rounded-md text-sm">
              <p>
                <strong>Monto a solicitar:</strong> {formatToUSD(amount)}
              </p>
              <p>
                <strong>Recargo (10%):</strong> {formatToUSD(amount * surcharge)}
              </p>
              <hr className="my-2" />
              <p className="font-bold text-base">
                Total a pagar: {formatToUSD(totalAmount)}
              </p>
              <p className="text-muted-foreground">
                Equivalente a: {formatToVES(totalAmountVES)}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleWhatsAppRequest}
            disabled={amount <= 0}
          >
            <Send className="mr-2 h-4 w-4" />
            Solicitar por WhatsApp
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}