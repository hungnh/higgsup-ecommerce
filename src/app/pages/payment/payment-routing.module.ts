import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PaymentComponent} from "./payment.component";

const routes: Routes = [{
  path: '',
  component: PaymentComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
