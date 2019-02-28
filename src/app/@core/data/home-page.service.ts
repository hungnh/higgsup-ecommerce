import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  baseUrl = 'http://192.168.1.11:8080/xshop';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) { }
  getTopSale() {
    return this.http.get(this.baseUrl + '/api/products/top-sale', this.httpOptions);
  }
  getShopByCategory() {
    return this.http.get('./assets/json/ShopByCategory.json');
  }
  getMenu() {
    return this.http.get('./assets/json/Menu.json');
  }
}
