import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataTransferService} from "../../../@core/services/data-transfer.service";


@Component({
  selector: 'ngx-warning',
  styleUrls: ['./warning.component.scss'],
  templateUrl: './warning.component.html',
})
export class WarningComponent implements OnInit {
  message: string = '';
  warningHeader: string;
  warningMessage: string;
  data: {
    order: boolean,
    dataTransfer: number
  };

  constructor(private  modalService: NgbActiveModal, private dataTransfer: DataTransferService) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.modalService.close();
  }

  doConfirm() {
    this.data.order = true;
    this.dataTransfer.addConfirmation(this.data);
     this.modalService.close();
  }

}
