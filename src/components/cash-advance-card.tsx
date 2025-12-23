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
    <Card className="overflow-hidden shadow-sm border-none bg-secondary">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col flex-grow p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-bold text-xl">
              Avance de Efectivo
            </CardTitle>
            <CardDescription>
              Solicita tu avance con un 10% de recargo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-0">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="cash-amount" className="font-semibold">Monto en USD</Label>
              <Input
                type="number"
                id="cash-amount"
                placeholder="Ej: 50.00"
                value={amount || ""}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="text-base font-bold bg-background border-border"
              />
            </div>
            {amount > 0 && (
              <div className="p-4 bg-background rounded-md text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Monto a solicitar:</span>
                  <span className="font-medium">{formatToUSD(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recargo (10%):</span>
                  <span className="font-medium">{formatToUSD(amount * surcharge)}</span>
                </div>
                <hr className="my-1 border-border" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total a pagar:</span>
                  <span>{formatToUSD(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Equivalente a:</span>
                  <span>{formatToVES(totalAmountVES)}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-0 pt-4">
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleWhatsAppRequest}
              disabled={amount <= 0}
            >
              <Send className="mr-2 h-4 w-4" />
              Solicitar por WhatsApp
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
