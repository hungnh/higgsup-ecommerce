import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentWay: string = 'payCash';
  bankLogos: Array<any> = [];

  constructor(public element: ElementRef) {
  }

  addImg() {
    for (let i = 0; i <= 28; i++) {
      this.bankLogos.push(i + '.jpg');
    }
  }

  ngOnInit() {
    this.addImg();
  }

}
