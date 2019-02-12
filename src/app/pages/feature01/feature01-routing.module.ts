import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Feature01Component} from './feature01.component';

const routes: Routes = [{
  path: '',
  component: Feature01Component,
  children: [],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Feature01RoutingModule {}
