import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Feature01Component} from '../feature01/feature01.component';
import {HomePageComponent} from './home-page.component';

const routes: Routes = [{
  path: '',
  component: HomePageComponent,
  children: [],
}];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class HomePageRoutingModule { }
