import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpService} from "./http.service";
import {PathConfig} from "../constant/path-config";
import {Observable} from "rxjs";
import {ResponseDTO} from "../model/response-dto.model";


@Injectable({'providedIn': 'root'})
export class BreadcrumbService {


  constructor(private http: HttpClient, private httpService: HttpService) {
  }

  breadcrumbUrl: string = PathConfig.URL + PathConfig.BREADCRUMB;

  getBreadcrumb(params: any): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.breadcrumbUrl, {params: params});
  }
}
