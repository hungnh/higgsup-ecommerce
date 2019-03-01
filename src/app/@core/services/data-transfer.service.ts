import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SearchDataModel} from "../model/search-data.model";

@Injectable()
export class DataTransferService {
  private data: {
    order: boolean,
    dataTransfer: number
  };

  eventSource = new BehaviorSubject(this.data);
  currentEvent = this.eventSource.asObservable();


  // using for search result list
  private searchData : SearchDataModel;

  eventTextSearch = new BehaviorSubject(this.searchData);
  currentTextSearch = this.eventTextSearch.asObservable();

  constructor() {
  }

  addConfirmation(event) {
    this.eventSource.next(event);
  }

  goToSearchRessultList (event) {
    this.eventTextSearch.next(event);
  }

}
