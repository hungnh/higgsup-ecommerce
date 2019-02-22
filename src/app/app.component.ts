import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService ,
              private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
