import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RoutingGuard} from "../@core/auth/routing-guard.service";

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
      canActivate: [RoutingGuard],
    },
    {
      path: 'confirm-buying',
      loadChildren: 'app/pages/confirm-buying/confirm-buying.module#ConfirmBuyingModule',
      canActivate: [RoutingGuard],
    },
    {
      path: 'payment',
      loadChildren: 'app/pages/payment/payment.module#PaymentModule',
      canActivate: [RoutingGuard],
    },
    {
      path: 'product-detail',
      loadChildren: 'app/pages/product-detail/product-detail.module#ProductDetailModule',
      //canActivate: [RoutingGuard],
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
      path:'result-list',
      loadChildren: 'app/pages/result-list/result-list.module#ResultListModule'
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
