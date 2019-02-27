import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ConfirmBuyingComponent} from "./confirm-buying.component";

const routes: Routes = [{
  path: '',
  component: ConfirmBuyingComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmBuyingRoutingModule {}
