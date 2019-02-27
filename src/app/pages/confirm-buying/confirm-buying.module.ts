import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {ConfirmBuyingComponent} from "./confirm-buying.component";
import {ConfirmBuyingRoutingModule} from "./confirm-buying-routing.module";

@NgModule({
  declarations: [
    ConfirmBuyingComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    ConfirmBuyingRoutingModule
  ]
})
export class ConfirmBuyingModule { }
