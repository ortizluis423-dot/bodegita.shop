"use client";

import { useState, useMemo } from "react";
import { formatToUSD, formatToVES, generateWhatsAppCashAdvanceMessage } from "@/lib/utils";
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

export function CashAdvanceCard() {
  const [amountVES, setAmountVES] = useState(0);
  const { rate } = useExchangeRate();
  const phoneNumber = "584122877326";
  const surcharge = 0.1; // 10%

  const { amountUSD, totalUSDToPay, totalVESToPay } = useMemo(() => {
    const amountUSD = rate > 0 ? amountVES / rate : 0;
    const totalUSDToPay = amountUSD * (1 + surcharge);
    const totalVESToPay = totalUSDToPay * rate;
    return { amountUSD, totalUSDToPay, totalVESToPay };
  }, [amountVES, rate, surcharge]);


  const handleWhatsAppRequest = () => {
    if (amountVES <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }
    const message = generateWhatsAppCashAdvanceMessage(
      amountVES,
      amountUSD,
      totalUSDToPay,
      totalVESToPay,
      rate,
      surcharge
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="overflow-hidden shadow-lg border-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col flex-grow p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-bold text-xl font-headline">
              Avance de Efectivo
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Solicita tu avance con un 10% de recargo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-0">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="cash-amount" className="font-semibold text-primary-foreground/90">Monto en Bolívares</Label>
              <Input
                type="number"
                id="cash-amount"
                placeholder="Ej: 2000.00"
                value={amountVES || ""}
                onChange={(e) => setAmountVES(parseFloat(e.target.value) || 0)}
                className="text-base font-bold bg-background/20 text-primary-foreground border-border/50 placeholder:text-primary-foreground/50 focus:bg-background/30"
              />
            </div>
            {amountVES > 0 && (
              <div className="p-4 bg-background/10 rounded-md text-sm space-y-2 backdrop-blur-sm">
                <div className="flex justify-between">
                  <span className="text-primary-foreground/80">Monto a solicitar:</span>
                  <span className="font-medium">{formatToVES(amountVES)}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-primary-foreground/80">Equivale a (USD):</span>
                  <span className="font-medium">{formatToUSD(amountUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-foreground/80">Recargo (10%):</span>
                  <span className="font-medium">{formatToUSD(amountUSD * surcharge)}</span>
                </div>
                <hr className="my-1 border-primary-foreground/20" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total a pagar:</span>
                  <span>{formatToVES(totalVESToPay)}</span>
                </div>
                <div className="flex justify-between text-primary-foreground/70 text-sm">
                  <span>Equivalente en USD:</span>
                  <span>{formatToUSD(totalUSDToPay)}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-0 pt-4">
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleWhatsAppRequest}
              disabled={amountVES <= 0}
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
