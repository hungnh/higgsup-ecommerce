import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {CartComponent} from "./cart.component";
import {CartRoutingModule} from "./cart-routing.module";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    CartRoutingModule
  ]
})
export class CartModule { }
