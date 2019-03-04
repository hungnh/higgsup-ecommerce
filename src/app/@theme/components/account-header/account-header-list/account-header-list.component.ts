import {Component, Input, OnInit} from '@angular/core';
import {LogoutService} from "../../../../@core/services/logout.service";
import {NbPopoverDirective} from "@nebular/theme";

@Component({
  selector: 'account-header-list',
  templateUrl: './account-header-list.component.html',
  styleUrls: ['./account-header-list.component.scss']
})
export class AccountHeaderListComponent implements OnInit {

  @Input() popover: NbPopoverDirective;

  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
  }

  logout() {
    this.popover.hide();
    this.logoutService.logout();
  }

}
