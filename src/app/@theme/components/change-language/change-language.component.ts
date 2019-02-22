import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NbPopoverDirective} from "@nebular/theme";
import {NbJSThemeOptions} from "@nebular/theme/services/js-themes/theme.options";
import { ChangeLanguageListComponent } from './change-language-list/change-language-list.component';

@Component({
  selector: 'change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  @Input() showTitle: boolean = true;

  changeLanguageListComponent = ChangeLanguageListComponent;
  theme: NbJSThemeOptions;

  constructor() { }

  ngOnInit() {
  }

}
