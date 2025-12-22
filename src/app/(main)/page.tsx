import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center bg-accent/20 p-8 rounded-lg mb-12 shadow-md">
        <h2 className="text-4xl font-extrabold tracking-tight font-headline text-primary">
          ¡Ofertas de la Semana!
        </h2>
        <p className="mt-4 text-lg text-foreground">
          Los mejores productos, al mejor precio. Directo a tu puerta.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
