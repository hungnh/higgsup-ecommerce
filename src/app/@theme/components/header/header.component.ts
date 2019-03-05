import {Component, HostListener, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {filter, map, tap} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import {DataTransferService} from "../../../@core/services/data-transfer.service";
import {SearchDataModel} from "../../../@core/model/search-data.model";
import {Constant} from "../../../@core/constant/constant";
import {UtilsService} from "../../../@core/utils/utilsService";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  private searchData : SearchDataModel;

  user: any;
  loginFlg: boolean;
  textSearch : string;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private router: Router,
              private dataTransfer: DataTransferService,
              private util: UtilsService,
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
    this.router.navigate(['']);
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

  checkKeyDown(event) {
    if (event.key === "Enter") {
      this.goToSearch();
    }
  }
  goToSearch() {
    if (this.util.isNotEmpty(this.textSearch)) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "textSearch":this.textSearch,
          "categoryId": null,
          "from": Constant.HEADER.toString()

        }
      };
      if (this.router.url.includes('/pages/result-list')) {
        // noinspection JSAnnotator
        var searchData = {
          textSearch : this.textSearch,
          categoryId : null,
          from : Constant.HEADER.toString()
        };
        this.dataTransfer.goToSearchRessultList(searchData);
      } else {
        this.router.navigate(['./pages/result-list'],navigationExtras);
      }
    }else {
      this.router.navigate(['']);
    }
  }
}
