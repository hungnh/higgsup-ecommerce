import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PathConfig} from "../constant/path-config";

@Injectable({
  providedIn: 'root',
})
export class HomePageService {

  constructor(private http: HttpClient) { }
  getTopSale() {
    return this.http.get(PathConfig.URL +  PathConfig.PRODUCTS + '/' + PathConfig.TOP_SALE);
  }
  getShopByCategory() {
    return this.http.get('./assets/json/ShopByCategory.json');
  }
  getMenu() {
    return this.http.get('./assets/json/Menu.json');
  }
}
