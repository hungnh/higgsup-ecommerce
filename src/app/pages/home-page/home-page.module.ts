import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {HomePageRoutingModule} from './home-page-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {MatIconModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    ThemeModule,
    HomePageRoutingModule,
    CommonModule,
  ],
})
export class HomePageModule { }
