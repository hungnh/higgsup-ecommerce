import {Component} from '@angular/core';

import {NbAccessChecker} from '@nebular/security';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[] ;

  constructor(public accessChecker: NbAccessChecker) {
    this.menu = [
      {
        title: 'home',
        icon: 'nb-home',
        link: '/pages/home',
        home: true,
      },
      {
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Feature 01',
        icon: 'nb-gear',
        link: '/pages/feature-01',
      },
      {
        title: 'Home Page',
        icon: 'nb-gear',
        link: '/pages/home',
      },
    ];

    accessChecker.isGranted('view', 'feature-01')
      .subscribe(granted => {
        this.menu.find(item => item.title === 'Feature 01').hidden = !granted;
      });
  }
}
