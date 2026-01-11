
'use client';

import Image from 'next/image';
import { useProducts } from '@/hooks/use-products';
import { Input } from '@/components/ui/input';
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
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AuthGuard from '@/components/auth-guard';
import { ExchangeRateAdmin } from '@/components/exchange-rate-admin';
import { useToast } from '@/hooks/use-toast';
import { AdminDashboard } from '@/components/admin-dashboard';
import { Product } from '@/lib/types';

function ProductRow({ product, onPriceChange, onVisibilityToggle }: { product: Product, onPriceChange: (id: string, price: number) => void, onVisibilityToggle: (id: string) => void }) {
  return (
    <>
      {/* Desktop View */}
      <TableRow className="hidden md:table-row">
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
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>
          <Input
            type="number"
            defaultValue={product.priceUSD}
            onBlur={(e) => onPriceChange(product.id, parseFloat(e.target.value) || 0)}
            step="0.01"
            className="h-9 w-[120px]"
          />
        </TableCell>
        <TableCell>
          <Badge
            variant={product.isVisible ? 'default' : 'destructive'}
            className="bg-green-500 text-white data-[variant=destructive]:bg-red-500"
          >
            {product.isVisible ? 'Visible' : 'Oculto'}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onVisibilityToggle(product.id)}
          >
            {product.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">Cambiar visibilidad</span>
          </Button>
        </TableCell>
      </TableRow>

      {/* Mobile View */}
      <TableRow className="md:hidden">
        <TableCell colSpan={5} className="p-0">
          <div className="flex items-start gap-4 p-4">
             <Image
                src={product.image.src}
                alt={product.image.alt}
                width={60}
                height={60}
                className="rounded-md object-cover"
                data-ai-hint={product.image.hint}
              />
            <div className="flex-grow space-y-2">
              <p className="font-bold">{product.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Precio:</span>
                <Input
                  type="number"
                  defaultValue={product.priceUSD}
                  onBlur={(e) => onPriceChange(product.id, parseFloat(e.target.value) || 0)}
                  step="0.01"
                  className="h-9 w-28"
                />
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge
                  variant={product.isVisible ? 'default' : 'destructive'}
                  className="bg-green-500 text-white data-[variant=destructive]:bg-red-500"
                >
                  {product.isVisible ? 'Visible' : 'Oculto'}
                </Badge>
              </div>
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onVisibilityToggle(product.id)}
                className="shrink-0"
              >
                {product.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">Cambiar visibilidad</span>
              </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}


export default function AdminPage() {
  const { products, toggleProductVisibility, updateProductPrice, loading: productsLoading } = useProducts();
  const { toast } = useToast();

  const handlePriceChange = (productId: string, newPrice: number) => {
    updateProductPrice(productId, newPrice);
    toast({
      title: "Precio Actualizado",
      description: `El precio del producto se ha guardado.`,
    });
  };

  const handleVisibilityToggle = (productId: string) => {
    toggleProductVisibility(productId);
    toast({
      title: "Visibilidad Cambiada",
      description: `El estado del producto ha sido actualizado.`,
    });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/40">
        <div className="container mx-auto p-4 sm:p-8">
          <header className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold font-headline">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground">
                Gestiona tu tienda Bodeguita.
              </p>
            </div>
            <LogoutButton />
          </header>

          <div className="grid gap-8 mb-8">
             <AdminDashboard />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
             <ExchangeRateAdmin />
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inventario de Productos</CardTitle>
                  <CardDescription>
                    Gestiona los precios y la visibilidad de los productos en tu tienda.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {productsLoading ? (
                    <div className="flex items-center justify-center p-8">
                       <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader className="hidden md:table-header-group">
                          <TableRow>
                            <TableHead className="w-[80px]">Imagen</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Precio (USD)</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                           {products.map((product) => (
                            <ProductRow 
                              key={product.id}
                              product={product}
                              onPriceChange={handlePriceChange}
                              onVisibilityToggle={handleVisibilityToggle}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
