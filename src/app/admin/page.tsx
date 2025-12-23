'use client';

import Image from 'next/image';
import { useExchangeRate } from '@/hooks/use-exchange-rate';
import { useProducts } from '@/hooks/use-products';
import { formatToUSD, formatToVES } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/logout-button';
import { Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminPage() {
  const { rate, setRate } = useExchangeRate();
  const { products, toggleProductVisibility } = useProducts();

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-headline">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu tienda Bodega Express.
            </p>
          </div>
          <LogoutButton />
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tasa de Cambio</CardTitle>
                <CardDescription>
                  Establece el valor de 1 USD en Bolívares (Bs.). El valor se
                  guarda automáticamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="exchange-rate">1 USD = Bs.</Label>
                  <Input
                    type="number"
                    id="exchange-rate"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    step="0.01"
                    className="text-lg font-bold"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventario de Productos</CardTitle>
                <CardDescription>
                  Gestiona la visibilidad de los productos en tu tienda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.image.src}
                              alt={product.image.alt}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                              data-ai-hint={product.image.hint}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.isVisible ? 'default' : 'destructive'
                              }
                              className="bg-green-500 text-white data-[variant=destructive]:bg-red-500"
                            >
                              {product.isVisible ? 'Visible' : 'Oculto'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                toggleProductVisibility(product.id)
                              }
                            >
                              {product.isVisible ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                Cambiar visibilidad
                              </span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
