import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ResultListComponent} from "./result-list.component";

const routes: Routes = [{
  path: '',
  component: ResultListComponent,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultListRoutingModule {}
