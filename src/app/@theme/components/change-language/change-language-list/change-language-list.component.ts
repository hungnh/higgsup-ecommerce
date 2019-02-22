import {Component, Input, OnInit} from '@angular/core';
import {NbJSThemeOptions} from "@nebular/theme/services/js-themes/theme.options";
import {NbPopoverDirective, NbThemeService} from "@nebular/theme";
import {AnalyticsService} from "../../../../@core/utils/analytics.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'change-language-list',
  templateUrl: './change-language-list.component.html',
  styleUrls: ['./change-language-list.component.scss']
})
export class ChangeLanguageListComponent implements OnInit {
  @Input() popover: NbPopoverDirective;

  theme: NbJSThemeOptions;

  languageList = [
    {
      title: 'English',
      image:'united-states.png',
      key: 'en',
    },
    {
      title: 'Korean',
      image:'south-korea.png',
      key: 'kr',
    },
    {
      title: 'Japanese',
      image:'japan.png',
      key: 'jp',
    },
  ];
  constructor(private translate: TranslateService,
              private analyticsService: AnalyticsService,) { }

  ngOnInit() {
  }

  onToggleLanguage(key: string) {
    this.translate.use(key)
    this.popover.hide();
  }

}
