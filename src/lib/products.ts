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
const slicedBreadImage = PlaceHolderImages.find(img => img.id === 'pan-dulce-rebanado');
const razorImage = PlaceHolderImages.find(img => img.id === 'cuchilla-de-afeitar');
const sardineImage = PlaceHolderImages.find(img => img.id === 'sardina-en-lata');
const detergentImage = PlaceHolderImages.find(img => img.id === 'detergente-oso-blanco');
const glupImage = PlaceHolderImages.find(img => img.id === 'glup-chinoto-2l');
const glupColitaImage = PlaceHolderImages.find(img => img.id === 'glup-colita-2l');
const cartonDeHuevosImage = PlaceHolderImages.find(img => img.id === 'carton-de-huevos');
const salRubiImage = PlaceHolderImages.find(img => img.id === 'sal-rubi-500g');
const galletaMariaPaqueteImage = PlaceHolderImages.find(img => img.id === 'galleta-maria-paquete');
const galletaMariaUnidadImage = PlaceHolderImages.find(img => img.id === 'galleta-maria-unidad');
const harinaPampaImage = PlaceHolderImages.find(img => img.id === 'harina-trigo-pampa');


if (!halfEggImage || !cigarImage || !singleCigarImage || !soapImage || !singleEggImage || !catalinaImage || !toiletPaperPackImage || !toiletPaperRollImage || !coffeeImage || !nutribelaImage || !slicedBreadImage || !razorImage || !sardineImage || !detergentImage || !glupImage || !glupColitaImage || !cartonDeHuevosImage || !salRubiImage || !galletaMariaPaqueteImage || !galletaMariaUnidadImage || !harinaPampaImage) {
  throw new Error('Placeholder images not found');
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cartón de Huevos',
    description: '30 unidades de huevos frescos.',
    priceUSD: 7.00,
    image: {
      src: cartonDeHuevosImage.imageUrl,
      alt: 'Cartón de 30 huevos',
      width: 600,
      height: 400,
      hint: cartonDeHuevosImage.imageHint,
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
      width: 600,
      height: 400,
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
    id: '14',
    name: 'Sardina en Lata',
    description: 'Sardinas en lata, 170g.',
    priceUSD: 1.00,
    image: {
      src: sardineImage.imageUrl,
      alt: 'Lata de sardinas',
      width: 600,
      height: 600,
      hint: sardineImage.imageHint,
    },
    category: 'Víveres',
  },
  {
    id: '18',
    name: 'Sal Refinada Rubi 500g',
    description: 'Bolsa de sal refinada de 500 gramos.',
    priceUSD: 0.25,
    image: {
      src: salRubiImage.imageUrl,
      alt: 'Sal Refinada Rubi 500g',
      width: 500,
      height: 500,
      hint: salRubiImage.imageHint,
    },
    category: 'Víveres',
  },
  {
    id: '21',
    name: 'Harina de Trigo La Pampa 920g',
    description: 'Harina de trigo todo uso La Pampa, 920g.',
    priceUSD: 1.45,
    image: {
      src: harinaPampaImage.imageUrl,
      alt: 'Harina de Trigo La Pampa 920g',
      width: 480,
      height: 480,
      hint: harinaPampaImage.imageHint,
    },
    category: 'Víveres',
  },
  {
    id: '16',
    name: 'Glup Chinotto 2L',
    description: 'Bebida gaseosa sabor a chinotto, 2 litros.',
    priceUSD: 1.00,
    image: {
      src: glupImage.imageUrl,
      alt: 'Botella de Glup Chinotto de 2 litros',
      width: 500,
      height: 500,
      hint: glupImage.imageHint,
    },
    category: 'Bebidas',
  },
  {
    id: '17',
    name: 'Glup Colita 2L',
    description: 'Bebida gaseosa sabor a colita, 2 litros.',
    priceUSD: 1.00,
    image: {
      src: glupColitaImage.imageUrl,
      alt: 'Botella de Glup Colita de 2 litros',
      width: 480,
      height: 480,
      hint: 'soda bottle',
    },
    category: 'Bebidas',
  },
  {
    id: '3',
    name: 'Caja de Cigarros Sahara',
    description: 'Caja de cigarros Sahara, 20 unidades.',
    priceUSD: 1.15,
    image: {
      src: cigarImage.imageUrl,
      alt: 'Caja de cigarros marca Sahara',
      width: 960,
      height: 720,
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
      width: 1200,
      height: 675,
      hint: singleCigarImage.imageHint,
    },
    category: 'Cigarrillos',
  },
    {
    id: '19',
    name: 'Paquete de Galletas María',
    description: 'Paquete de galletas María.',
    priceUSD: 1.00,
    image: {
      src: galletaMariaPaqueteImage.imageUrl,
      alt: 'Paquete de galletas María',
      width: 225,
      height: 225,
      hint: galletaMariaPaqueteImage.imageHint,
    },
    category: 'Galletas',
  },
  {
    id: '20',
    name: 'Galleta María (unidad)',
    description: 'Una (1) galleta María.',
    priceUSD: 0.11,
    image: {
      src: galletaMariaUnidadImage.imageUrl,
      alt: 'Una galleta María',
      width: 225,
      height: 225,
      hint: galletaMariaUnidadImage.imageHint,
    },
    category: 'Galletas',
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
    id: '13',
    name: 'Cuchilla de Afeitar',
    description: 'Cuchilla de afeitar desechable.',
    priceUSD: 0.5,
    image: {
      src: razorImage.imageUrl,
      alt: 'Cuchilla de afeitar desechable',
      width: 500,
      height: 500,
      hint: razorImage.imageHint,
    },
    category: 'Cuidado Personal',
  },
    {
    id: '15',
    name: 'Detergente en Polvo',
    description: 'Detergente en polvo para la ropa.',
    priceUSD: 1.00,
    image: {
      src: detergentImage.imageUrl,
      alt: 'Bolsa de detergente en polvo',
      width: 225,
      height: 278,
      hint: 'detergent powder',
    },
    category: 'Limpieza',
  },
  {
    id: '7',
    name: 'Catalina (unidad)',
    description: 'Una (1) catalina criolla.',
    priceUSD: 0.19,
    image: {
      src: catalinaImage.imageUrl,
      alt: 'Una catalina o paledonia',
      width: 800,
      height: 533,
      hint: catalinaImage.imageHint,
    },
    category: 'Panadería',
  },
  {
    id: '12',
    name: 'Pan Dulce Rebanado',
    description: 'Una rebanada de pan dulce.',
    priceUSD: 0.15,
    image: {
      src: slicedBreadImage.imageUrl,
      alt: 'Una rebanada de pan dulce',
      width: 260,
      height: 173,
      hint: 'sliced bread',
    },
    category: 'Panadería',
  }
];
