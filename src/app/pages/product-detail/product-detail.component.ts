import {Component, OnInit} from '@angular/core';
import {Currency} from "../../@theme/glossary/currency.constant";
import {ResponseDTO} from "../../@core/model/response-dto.model";
import {Product} from "../../@core/model/product.model";

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  imagePreview: string;
  imageItem: string;
  newPrice: number = null;
  amount: number = 1;
  starRate: number = 4.5;
  ratingCount: number = 9999;
  starArray = [5, 4, 3, 2, 1];
  currency: string = '';
  product: Product = new Product();
  id: number = 96123;
  queryParams: any;
  constructor(private productService: ProductDetailsService, private router: Router, private activeRoute: ActivatedRoute) {
    this.queryParams = this.activeRoute.snapshot.queryParams;
  }

  ngOnInit() {
    this.currency = Currency.USD;
    this.product.amount = 1;
    // this.id = this.queryParams.id;
    this.productService.getProductDetail(this.id).subscribe((res: ResponseDTO)=>{
      if(!res.responseMessage.messageCode) {
        this.product = res.responseMessage.data;
        this.newPrice = this.product.unitPrice * (100 - this.product.discountPercent)/100;
      } else {
        this.router.navigate(['pages/not-found']);
      }
    });
  }




  checkPressKey() {
    return false;
  }

  doEncreaseQuantity() {
    return this.amount += 1;
  }

  doDecreaseQuantity() {
    return this.amount -= 1;
  }
  viewImages(event) {
    // console.log(event);
    // this.imagePreview = this.imageItem;
  }

}
