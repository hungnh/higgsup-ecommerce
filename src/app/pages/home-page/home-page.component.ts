import {Component, OnInit} from '@angular/core';
import {HomePageService} from '../../@core/data/home-page.service';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'ngx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  topSaleItems = [];
  shopByCategoryItems = [];
  menuList = [];
  subMenuList = [];
  subMenuSecondList = [];
  seeMore = true;
  showMenu = false;
  slide: number;

  constructor(private homeService: HomePageService, private router: Router) {
  }

  ngOnInit() {
    this.getTopSale();
    this.getShopByCategory();
    this.getMenu();
  }
  goToProductDetail(productId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "productId": productId
      }
    };
    this.router.navigate(['./pages/product-detail'], navigationExtras);
  }

  getTopSale() {
    this.homeService.getTopSale().subscribe(data => {
      this.topSaleItems = data['responseMessage'].data;
    });
  }

  getShopByCategory() {
    this.homeService.getShopByCategory().subscribe(data => {
      this.shopByCategoryItems = data['data'];
    });
  }

  getMenu() {
    this.homeService.getMenu().subscribe(data => {
      this.menuList = data['menu'];
    });
  }

  getSubMenu(menu) {
    this.subMenuList = this.menuList[menu].sub;
  }

  getSubMenuSecond(subMenu) {
    this.subMenuSecondList = this.subMenuList[subMenu].sub;
    if (this.subMenuSecondList) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  onSeeMore() {
    this.seeMore = !this.seeMore;
  }

  changeBg(event) {
    this.slide = event.current;
  }

  routeToResultList(id: number, searchFrom: string) {
    this.router.navigate(['./pages/result-list'], {
      queryParams: {
        'categoryId': id,
        'from': searchFrom
      }
    });
  }
}
