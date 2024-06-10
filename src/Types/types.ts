export interface ICategories {
    
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  quantity: number;
    availabilityStatus: string;
}

export interface ICard {
  img: string;
  title: string;
  price: number;
  description: string;
  keyy: number;
  discountPercentage: number;
  element: IProduct;
}
