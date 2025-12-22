import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">Imágenes de Placeholder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PlaceHolderImages.map((img) => (
          <Card key={img.id}>
            <CardHeader>
              <CardTitle className="font-headline">{img.id}</CardTitle>
              <CardDescription>{img.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video">
                <Image
                  src={img.imageUrl}
                  alt={img.description}
                  fill
                  className="rounded-md object-cover"
                  data-ai-hint={img.imageHint}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 break-all">{img.imageUrl}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
