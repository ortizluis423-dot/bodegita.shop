
'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CashAdvanceCard } from '@/components/cash-advance-card';

export default function HomePage() {
  const { products: allProducts } = useProducts();
  const visibleProducts = allProducts.filter((p) => p.isVisible);
  
  const categories = [
    'Todos',
    ...Array.from(new Set(visibleProducts.map((p) => p.category))),
  ];

  return (
    <>
      <section className="mb-12">
        <CashAdvanceCard />
      </section>

      <Tabs defaultValue="Todos" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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
      </Tabs>
    </>
  );
}
