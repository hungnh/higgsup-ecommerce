import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {PaymentRoutingModule} from "./payment-routing.module";
import {PaymentComponent} from "./payment.component";

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
