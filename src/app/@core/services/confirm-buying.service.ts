import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable({'providedIn': 'root'})
export class ConfirmBuyingService {
  constructor(private httpClient: HttpClient) {
    var obj;
    this.getJSON().subscribe(data => obj = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get("assets/address_tree.json");

  }
}
