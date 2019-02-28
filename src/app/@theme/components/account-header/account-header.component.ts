import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbPopoverDirective} from "@nebular/theme";
import {NbJSThemeOptions} from "@nebular/theme/services/js-themes/theme.options";
import {AccountHeaderListComponent} from "./account-header-list/account-header-list.component";

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

  constructor() { }

  ngOnInit() {
  }

}
