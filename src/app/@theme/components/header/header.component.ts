import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {filter, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  loginFlg: boolean;
  inputSearch: any;
  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private translate: TranslateService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        }
      });

  }

  ngOnInit() {
    this.loginFlg = false;
    this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            this.loginFlg = true;
          }
        }),
      );
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  goToCart() {
    this.router.navigate(['./pages/cart']);
  }

  goToLogin() {
    this.router.navigate(['./auth/login']);
  }

  goToRegister() {
    this.router.navigate(['./auth/register']);
  }

  goToSearch() {
    this.router.navigate(['./pages/search', this.inputSearch]);
  }
}
