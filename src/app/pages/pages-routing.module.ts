import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SecurityGuard} from '../@core/auth/security-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'feature-01',
      loadChildren: 'app/pages//feature01/feature01.module#Feature01Module',
      // canActivate: [SecurityGuard],
    },
    {
      path: 'cart',
      loadChildren: 'app/pages/cart/cart.module#CartModule',
      // canActivate: [SecurityGuard],
    },
    {
      path: 'confirm-buying',
      loadChildren: 'app/pages/confirm-buying/confirm-buying.module#ConfirmBuyingModule',
      // canActivate: [SecurityGuard],
    },
    {
      path: 'payment',
      loadChildren: 'app/pages/payment/payment.module#PaymentModule',
      // canActivate: [SecurityGuard],
    },
    {
      path: 'product-detail',
      loadChildren: 'app/pages/product-detail/product-detail.module#ProductDetailModule',
      // canActivate: [SecurityGuard],
    },
    {
      path: 'home',
      loadChildren: 'app/pages/home-page/home-page.module#HomePageModule',
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
