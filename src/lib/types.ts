export interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    hint: string;
  };
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
