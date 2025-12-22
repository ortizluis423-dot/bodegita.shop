import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-8 md:p-12 rounded-2xl mb-12 shadow-inner">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-primary">
          Bodega Express
        </h2>
        <p className="mt-4 text-lg md:text-xl text-foreground max-w-2xl mx-auto">
          Los mejores productos, al mejor precio. Directo a tu puerta.
        </p>
      </section>

      <Tabs defaultValue="Todos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Todos">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        {categories.filter(c => c !== "Todos").map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
