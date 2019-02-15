import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AnalyticsService} from '../../../@core/utils';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private router: Router,
              private analyticsService: AnalyticsService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        }
      });

    this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'userContextMenu'),
      map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          this.authService.logout('email').subscribe(result => {
            this.router.navigate(['auth/login']);
          });
        }
      });
  }

  ngOnInit() {
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
}
