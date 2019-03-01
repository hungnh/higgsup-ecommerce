import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpService} from "./http.service";
import {PathConfig} from "../constant/path-config"
import {Observable} from "rxjs/Observable";

@Injectable({providedIn: 'root'})

export class ResultListService {

  constructor(private http: HttpClient, private httpService: HttpService) {

  }

  private supplierUrl = PathConfig.URL.toString() + PathConfig.SUPPLIERS.toString();
  private productUrl = PathConfig.URL.toString() + PathConfig.PRODUCT.toString();

  getSupplierList(paramsList: any): Observable<any> {
    return this.http.get(this.supplierUrl, {params: paramsList});
  }

  getProductList(paramsList: any): Observable<any> {
    return this.http.get(this.productUrl, {params: paramsList});
  }

  getSupplierListByCategoryId(params: any): Observable<any> {
    let categorySupplierUrl = PathConfig.URL.toString() + PathConfig.CATEGORY.toString() + '/' + `${params}` + '/' + PathConfig.SUPPLIERS.toString();
    return this.http.get(categorySupplierUrl,{params : params});
  }

  getProductListByCategoryId (paramsList: HttpParams): Observable<any>  {
    let categoryProductUrl = PathConfig.URL.toString() + PathConfig.CATEGORY.toString() + '/' + `${paramsList.get('id')}` + '/' + PathConfig.PRODUCT.toString();
    return this.http.get(categoryProductUrl,{params : paramsList});
  }

}
