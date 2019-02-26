import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeliveryInformation} from "../../@core/model/delivery-information";
import {Currency} from "../../@theme/glossary/currency.constant";

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentWay: string = 'payCash';
  bankLogos: Array<any> = [];
  deliveryInfo: DeliveryInformation = new DeliveryInformation();
  productList: Array<any> = [];
  subTotal: number = null;
  currency: string = '';

  constructor(public element: ElementRef, private activeRoute: ActivatedRoute, private router: Router) {
  }

  addImg() {
    for (let i = 0; i <= 28; i++) {
      this.bankLogos.push(i + '.jpg');
    }
  }

  ngOnInit() {
    this.addImg();
    this.deliveryInfo = JSON.parse(this.activeRoute.snapshot.queryParams.deliveryInfo);
    this.productList= JSON.parse(this.activeRoute.snapshot.queryParams.productList);
    this.productList.forEach(product => {
      return this.subTotal += product.price * product.quantity;
    });
    this.currency = Currency.USD;
  }

  gotoCart() {
    this.router.navigate(['pages/cart']);
  }

  gotoEditAddress() {
    window.history.back();
  }
}
