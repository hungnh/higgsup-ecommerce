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
  imagePreview = '//vn-test-11.slatic.net/p/d8ae05f5890cb3c42cb37c5635de68dc.jpg_340x340q80.jpg_.webp';
  imageItem = 'https://png.pngtree.com/element_origin_min_pic/17/09/15/ff9b22c2cc9d02950137e064d0f72217.jpg';
  constructor() { }
  starRate: number = 4.5;
  ratingCount: number = 9999;
  currency: string = '';
  product: Product = new Product();
  constructor() {
  }

  ngOnInit() {
    this.currency = Currency.USD;
    this.product.amount = 1;
  }




  checkPressKey() {
    return false;
  }

  doEncreaseQuantity() {
    return this.product.amount += 1;
  }

  doDecreaseQuantity() {
    return this.product.amount -= 1;
  }
  viewImages() {
    this.imagePreview = this.imageItem;
  }

}
