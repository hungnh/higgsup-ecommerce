import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbPopoverDirective} from "@nebular/theme";
import {NbJSThemeOptions} from "@nebular/theme/services/js-themes/theme.options";
import {AccountHeaderListComponent} from "./account-header-list/account-header-list.component";
import {UserService} from "../../../@core/services/user.service";
import {HttpService} from "../../../@core/services/http.service";
import {ResponseMessage} from "../../../@core/model/response-message.model";
import {UserResponse} from "../../../@core/model/user-response.model";

@Component({
  selector: 'account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  @Input() showTitle: boolean = true;

  accountHeaderListComponent = AccountHeaderListComponent;
  theme: NbJSThemeOptions;
  userName: string = '';

  constructor(private userService: UserService,
              private httpService: HttpService) { }

  ngOnInit() {
    if (this.httpService.getToken()) {
      this.userService.getUserInfo().subscribe((res) => {
        if (res.responseMessage.data) {
          this.userName = res.responseMessage.data.firstName + ' ' + res.responseMessage.data.lastName;
        }
      });
    }
  }

}
