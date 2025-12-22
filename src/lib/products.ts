import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const eggImage = PlaceHolderImages.find(img => img.id === 'carton-de-huevos');
const halfEggImage = PlaceHolderImages.find(img => img.id === 'medio-carton-de-huevos');
const cigarImage = PlaceHolderImages.find(img => img.id === 'caja-de-cigarros');

if (!eggImage || !halfEggImage || !cigarImage) {
  throw new Error('Placeholder images not found for products');
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cartón de Huevos',
    description: '30 unidades de huevos frescos.',
    priceUSD: 7.00,
    image: {
      src: eggImage.imageUrl,
      alt: 'Cartón de 30 huevos',
      width: 400,
      height: 300,
      hint: eggImage.imageHint,
    }
  },
  {
    id: '2',
    name: 'Medio Cartón de Huevos',
    description: '15 unidades de huevos frescos.',
    priceUSD: 3.55,
    image: {
      src: halfEggImage.imageUrl,
      alt: 'Medio cartón de 15 huevos',
      width: 400,
      height: 300,
      hint: halfEggImage.imageHint,
    },
  },
  {
    id: '3',
    name: 'Caja de Cigarros Sahara',
    description: 'Caja de cigarros Sahara, 10 unidades.',
    priceUSD: 1.15,
    image: {
      src: cigarImage.imageUrl,
      alt: 'Caja de cigarros marca Sahara',
      width: 400,
      height: 300,
      hint: cigarImage.imageHint,
    }
  },
];
