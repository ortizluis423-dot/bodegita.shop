import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const halfEggImage = PlaceHolderImages.find(img => img.id === 'medio-carton-de-huevos');
const singleEggImage = PlaceHolderImages.find(img => img.id === 'huevo-detal');
const cigarImage = PlaceHolderImages.find(img => img.id === 'caja-de-cigarros');
const singleCigarImage = PlaceHolderImages.find(img => img.id === 'cigarrillo-detal');
const soapImage = PlaceHolderImages.find(img => img.id === 'jabon-de-bano');
const catalinaImage = PlaceHolderImages.find(img => img.id === 'catalina-unidad');
const toiletPaperPackImage = PlaceHolderImages.find(img => img.id === 'papel-higienico-paquete');
const toiletPaperRollImage = PlaceHolderImages.find(img => img.id === 'papel-higienico-rollo');
const coffeeImage = PlaceHolderImages.find(img => img.id === 'cafe-granel');
const nutribelaImage = PlaceHolderImages.find(img => img.id === 'nutribela');


if (!halfEggImage || !cigarImage || !singleCigarImage || !soapImage || !singleEggImage || !catalinaImage || !toiletPaperPackImage || !toiletPaperRollImage || !coffeeImage || !nutribelaImage) {
  throw new Error('Placeholder images not found');
}

export const products: Product[] = [
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
    id: '10',
    name: 'Café en Grano (100g)',
    description: '100 gramos de café en grano.',
    priceUSD: 1.35,
    image: {
      src: coffeeImage.imageUrl,
      alt: 'Bolsa de café en grano',
      width: 400,
      height: 400,
      hint: coffeeImage.imageHint,
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
    priceUSD: 0.8,
    image: {
      src: soapImage.imageUrl,
      alt: 'Una barra de jabón de baño',
      width: 612,
      height: 408,
      hint: soapImage.imageHint,
    },
    category: 'Cuidado Personal',
  },
  {
    id: '8',
    name: 'Papel Higiénico Caricias (4 Rollos)',
    description: 'Paquete de 4 rollos de papel higiénico.',
    priceUSD: 1.3,
    image: {
      src: toiletPaperPackImage.imageUrl,
      alt: 'Paquete de Papel Higiénico Caricias',
      width: 500,
      height: 500,
      hint: toiletPaperPackImage.imageHint,
    },
    category: 'Cuidado Personal',
  },
    {
    id: '9',
    name: 'Papel Higiénico (1 Rollo)',
    description: 'Un (1) rollo de papel higiénico.',
    priceUSD: 0.32,
    image: {
      src: toiletPaperRollImage.imageUrl,
      alt: 'Un rollo de papel higiénico',
      width: 225,
      height: 225,
      hint: toiletPaperRollImage.imageHint,
    },
    category: 'Cuidado Personal',
  },
   {
    id: '11',
    name: 'Nutribela 15 Tratamiento Capilar',
    description: 'Sachet de tratamiento capilar Nutribela.',
    priceUSD: 0.80,
    image: {
      src: nutribelaImage.imageUrl,
      alt: 'Sachet de tratamiento capilar Nutribela',
      width: 500,
      height: 500,
      hint: nutribelaImage.imageHint,
    },
    category: 'Cuidado Personal',
  },
  {
    id: '7',
    name: 'Catalina (unidad)',
    description: 'Una (1) catalina criolla.',
    priceUSD: 0.19,
    image: {
      src: catalinaImage.imageUrl,
      alt: 'Una catalina o paledonia',
      width: 400,
      height: 300,
      hint: catalinaImage.imageHint,
    },
    category: 'Panadería',
  }
];
