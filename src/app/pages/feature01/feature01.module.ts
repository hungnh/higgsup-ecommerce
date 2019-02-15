import { NgModule } from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {Feature01Component} from './feature01.component';
import {Feature01RoutingModule} from './feature01-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    Feature01RoutingModule,
  ],
  declarations: [
    Feature01Component,
  ],
})
export class Feature01Module { }
