import {Component, OnInit} from '@angular/core';
import {DeliveryInformation} from "../../@core/model/delivery-information";

@Component({
  selector: 'confirm-buying',
  templateUrl: './confirm-buying.component.html',
  styleUrls: ['./confirm-buying.component.scss']
})
export class ConfirmBuyingComponent implements OnInit {
  deliveryInfo: DeliveryInformation = new DeliveryInformation();

  constructor() {
  }

  ngOnInit() {
  }
}
