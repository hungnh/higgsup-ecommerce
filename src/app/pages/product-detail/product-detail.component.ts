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

}
