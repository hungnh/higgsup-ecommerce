import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {ProductDetailComponent} from "./product-detail.component";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { }
