import {Component, OnInit} from '@angular/core';
import {DeliveryInformation} from "../../@core/model/delivery-information";
import {Router} from "@angular/router";

@Component({
  selector: 'confirm-buying',
  templateUrl: './confirm-buying.component.html',
  styleUrls: ['./confirm-buying.component.scss']
})
export class ConfirmBuyingComponent implements OnInit {
  deliveryInfo: DeliveryInformation = new DeliveryInformation();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  cancelBuying() {
    this.router.navigate(['pages/cart']);
  }

  gotoPayment() {
    this.router.navigate(['pages/payment']);
  }

  getAddress() {
  }
}
