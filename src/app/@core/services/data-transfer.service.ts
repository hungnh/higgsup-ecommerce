import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataTransferService {
  private data: {
    order: boolean,
    dataTransfer: number
  };

  eventSource = new BehaviorSubject(this.data);
  currentEvent = this.eventSource.asObservable();

  constructor() {
  }

  addConfirmation(event) {
    this.eventSource.next(event);
  }

}
