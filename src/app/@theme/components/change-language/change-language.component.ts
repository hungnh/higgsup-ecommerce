import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  useLang(lang: string) {
    this.translate.use(lang);
  }
}
