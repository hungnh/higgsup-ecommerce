import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import Swal from "sweetalert2";

@Injectable({'providedIn': 'root'})
export class ConfirmBuyingService {
  constructor(private httpClient: HttpClient) {
    var obj;
    this.getJSON().subscribe(data => obj = data, error => Swal.fire({
      type: 'error',
      title: 'Something went wrong!',
    }));
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get("assets/address_tree.json");

  }
}
