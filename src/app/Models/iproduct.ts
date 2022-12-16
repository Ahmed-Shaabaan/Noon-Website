export interface Iproduct {
  id?: any;
  title: string;
  name: string;
  nameArabic: string;
  description: string;
  descriptionAr: string;
  productImages: string[];
  quantity: number;
  sail:number;
  rating?: number;
  unitPrice: number;
  newPrice: number;
  categoryID:number
  brandID:number;
  priceOffer:string;
  brand: string;
  discountString?:string;
  discount: number;
  category: string;
  color:string;
  size:number;

}
