
'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CashAdvanceCard } from '@/components/cash-advance-card';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

export default function HomePage() {
  const { products: allProducts, loading } = useProducts();

  const visibleProducts = useMemo(() => allProducts.filter((p) => p.isVisible !== false), [allProducts]);
  
  const categories = useMemo(() => [
    'Todos',
    ...Array.from(new Set(visibleProducts.map((p) => p.category))),
  ], [visibleProducts]);

  return (
    <>
      <section className="mb-12">
        <CashAdvanceCard />
      </section>

      <Tabs defaultValue="Todos" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="flex-shrink-0">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {loading && !visibleProducts.length ? (
            <div className="flex items-center justify-center min-h-[40vh]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        ) : (
            <>
                <TabsContent value="Todos">
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>

                {categories
                  .filter((c) => c !== 'Todos')
                  .map((category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {visibleProducts
                          .filter((p) => p.category === category)
                          .map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                      </div>
                    </TabsContent>
                  ))}
            </>
        )}
      </Tabs>
    </>
  );
}
