import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {ProductDetailComponent} from "./product-detail.component";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";
import {CarouselModule} from "primeng/primeng";
import {SliceStringPipe} from "../../@core/pipe/slice-string.pipe";

@NgModule({
  declarations: [
    ProductDetailComponent,
    SliceStringPipe
  ],
  imports: [
    CommonModule,
    ThemeModule,
    ProductDetailRoutingModule,
    CarouselModule,
  ],
})
export class ProductDetailModule {
}
