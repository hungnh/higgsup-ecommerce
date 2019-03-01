import {RatingCount} from "./rating-count.model";

export class ProductModel {
  id: number;
  name: string;
  unitPrice: number;
  priceDiscount : number;
  discountPercent: number;
  mainImgUrl: string;
  avgRating: number;
  totalRating: number;
  amount: number;
  productId: number;
  productName: string;
  supplierName: string;
  unitPrice: number;
  imgUrl: string;
  availableItem: number;
  avgRating: number;
  brandName: string;
  categoryId: number;
  discountPercent: number;
  fullDesc: string;
  id: number;
  imgUrl: string;
  name: string;
  ratingCount: Array<RatingCount>;
  shortDesc: string;
  status: string;
  supplierAddress: string;
  supplierId: number;
  supplierName: string;
  totalRating: number;
  unitPrice: number;
  weight: number;
  amount: number;
}
