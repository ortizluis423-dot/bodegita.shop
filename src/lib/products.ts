import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const eggImage = PlaceHolderImages.find(img => img.id === 'carton-de-huevos');
const halfEggImage = PlaceHolderImages.find(img => img.id === 'medio-carton-de-huevos');
const singleEggImage = PlaceHolderImages.find(img => img.id === 'huevo-detal');
const cigarImage = PlaceHolderImages.find(img => img.id === 'caja-de-cigarros');
const singleCigarImage = PlaceHolderImages.find(img => img.id === 'cigarrillo-detal');
const soapImage = PlaceHolderImages.find(img => img.id === 'jabon-de-bano');


if (!eggImage || !halfEggImage || !cigarImage || !singleCigarImage || !soapImage || !singleEggImage) {
  throw new Error('Placeholder images not found');
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
    },
    category: 'Víveres',
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
    category: 'Víveres',
  },
  {
    id: '6',
    name: 'Huevo (detal)',
    description: 'Un (1) huevo fresco.',
    priceUSD: 0.25,
    image: {
      src: singleEggImage.imageUrl,
      alt: 'Un huevo individual',
      width: 225,
      height: 225,
      hint: singleEggImage.imageHint,
    },
    category: 'Víveres',
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
    },
    category: 'Cigarrillos',
  },
  {
    id: '4',
    name: 'Cigarrillo Sahara (detal)',
    description: 'Un (1) cigarrillo Sahara.',
    priceUSD: 0.07,
    image: {
      src: singleCigarImage.imageUrl,
      alt: 'Un cigarrillo individual',
      width: 400,
      height: 300,
      hint: singleCigarImage.imageHint,
    },
    category: 'Cigarrillos',
  },
  {
    id: '5',
    name: 'Jabón de Baño',
    description: 'Jabón de baño para una limpieza refrescante.',
    priceUSD: 0.80,
    image: {
      src: soapImage.imageUrl,
      alt: 'Una barra de jabón de baño',
      width: 612,
      height: 408,
      hint: soapImage.imageHint,
    },
    category: 'Cuidado Personal',
  }
];
