import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'ngx-warning',
  styleUrls: ['./warning.component.scss'],
  templateUrl: './warning.component.html',
})
export class WarningComponent implements OnInit {

  warningHeader: string;
  warningMessage: string;

  constructor(private  modalService: NgbActiveModal) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.close();
  }

}
