import {Component, OnInit} from '@angular/core';
import {Currency} from "../../@theme/glossary/currency.constant";
import {ResponseDTO} from "../../@core/model/response-dto.model";
import {Product} from "../../@core/model/product.model";
import {ProductDetailsService} from "../../@core/services/product-details.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  imagePreview = '//vn-test-11.slatic.net/p/d8ae05f5890cb3c42cb37c5635de68dc.jpg_340x340q80.jpg_.webp';
  imageItem = 'https://png.pngtree.com/element_origin_min_pic/17/09/15/ff9b22c2cc9d02950137e064d0f72217.jpg';
  newPrice: number = null;
  amount: number = 1;
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
  viewImages() {
    this.imagePreview = this.imageItem;
  }

}
