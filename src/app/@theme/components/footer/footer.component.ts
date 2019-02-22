import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: `./footer.component.html`,

})
export class FooterComponent {

  constructor(private translate: TranslateService) {
    translate.get('footer.customer_support').subscribe((res: string) => {
      console.log(res);
      //=> 'hello world'
    });
  }

}
