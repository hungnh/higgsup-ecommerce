import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PathConfig} from "../constant/path-config";
import {Observable} from "rxjs";
import {ResponseDTO} from "../model/response-dto.model";

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {

  constructor(private http: HttpClient) {
  }

  prodDetailUrl = PathConfig.URL + PathConfig.PRODUCTS;

  getProductDetail(id): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.prodDetailUrl + '/' + id);
  }
  getFeedback(id): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(PathConfig.URL + PathConfig.FEEDBACK + '/' + + id)
  }
  getRelatedProduct(id): Observable<any> {
    return this.http.get<any>(this.prodDetailUrl + '/' + id + '/' + PathConfig.RELATION)
  }

}
