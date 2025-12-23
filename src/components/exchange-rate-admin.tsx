"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

export function ExchangeRateAdmin() {
  const { rate: currentRate, setRate: saveRate } = useExchangeRate();
  const [localRate, setLocalRate] = useState(currentRate);
  const { toast } = useToast();

  const handleSave = () => {
    saveRate(localRate);
    toast({
      title: "Tasa guardada",
      description: `La nueva tasa de cambio es ${localRate.toFixed(2)} Bs./USD.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Cambio</CardTitle>
        <CardDescription>
          Establece el valor de 1 USD en Bolívares (Bs.).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="exchange-rate">1 USD = Bs.</Label>
          <Input
            type="number"
            id="exchange-rate"
            value={localRate}
            onChange={(e) => setLocalRate(parseFloat(e.target.value) || 0)}
            step="0.01"
            className="text-lg font-bold"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">Guardar Tasa</Button>
      </CardFooter>
    </Card>
  );
}
