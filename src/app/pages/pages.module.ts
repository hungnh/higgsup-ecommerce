import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
],
  declarations: [
    PagesComponent,
    NotFoundComponent,
  ],
})
export class PagesModule {
}
