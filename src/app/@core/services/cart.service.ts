import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {PathConfig} from "../constant/path-config";
import {Observable} from "rxjs";
import {ResponseDTO} from "../model/response-dto.model";


@Injectable({'providedIn': 'root'})
export class CartService {


  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  httpOptions = this.httpService.setHeaderToken();

  cartUrl: string = PathConfig.URL + PathConfig.CART;

  getCart(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.cartUrl, this.httpOptions);
  }

  changeAmount(product): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(this.cartUrl + '/' + `${product.id}`, product, this.httpOptions);
  }

  removeFromCart(id): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(this.cartUrl + '/' + `${id}`, this.httpOptions);
  }
}
