export class ProductDetail {
  availableItem: number;
  avgRating: number;
  brandName: string;
  categoryId: number;
  discountPercent: number;
  fullDesc: string;
  id: number;
  imgUrl: string;
  name: string;
  ratingCount: [
    {
      counting: number;
      rating: number;
    }
    ];
  shortDesc: string;
  status: string;
  supplierAddress: string;
  supplierId: number;
  supplierName: string;
  totalRating: number;
  unitPrice: number;
  weight: number;
}
