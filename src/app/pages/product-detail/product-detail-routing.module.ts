import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductDetailComponent} from "./product-detail.component";


const routes: Routes = [{
  path: '',
  component: ProductDetailComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule { }
