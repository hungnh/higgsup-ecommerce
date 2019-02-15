## Coding guide & conventions
 
### Background
Firstly, please read "Angular Application Architecture Documentation.docx" file to understand the architecture overview of this application.

### Coding guide
This document will guide developer step by step, follow strictly the project structure we have defined in the Architecture Documentation to develop a new feature of their application:
1. **Create new feature module inside `PagesModule`**
    
    Let name it `feature02` for example
    ```
    cd src/app/pages
    ng generate module feature02
    ```
    A new folder `feature02` will be created along with `feature02.module.ts` file inside which declares `Feature02Module`.

2. **Add new route to `Feature02Module` in `PagesRoutingModule`**
    
    ```angular2
    const routes: Routes = [{
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'feature-01',
          loadChildren: 'app/pages/feature01/feature01.module#Feature01Module',
        },
        {
          path: 'feature-02',
          loadChildren: 'app/pages/feature02/feature02.module#Feature02Module',
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
    }];
    ```

3. **Add a new item for this feature in `pages-menu.ts` file**
    
    ```angular2
    export const MENU_ITEMS: NbMenuItem[] = [
      {
        title: 'Dashboard',
        icon: 'nb-home',
        link: '/pages/dashboard',
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
        title: 'Feature 02',
        icon: 'nb-gear',
        link: '/pages/feature-02',
      },
    ];
    ```
    This will append a new menu item to the sidebar with the defined **title** and **icon**. If users click on this menu item, then it will route to `Feature02Module`, as specified by **link** property.

4. **Create a new component inside `Feature02Module`**
    Let name it `feature02` for example.
    ```
    cd src/app/pages
    ng generate component feature02
    ```
    A new component `Feature02Component` will be created inside the `feature02` folder.

5. **Create a new routing module and config routes to components of feature module**
    ```
    cd src/app/pages
    ng generate module feature02/feature02-routing --flat
    ``` 
    `Feature02RoutingModule` will be created. We need to add the routes config to components inside `Feature02Module`. For example:
    ```angular2
    const routes: Routes = [{
      path: '',
      component: Feature02Component,
      children: [
        {
          path: 'sub-feature02',
          component: SubFeature02Component,
        },
      ],
    }];
    
    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    export class Feature02RoutingModule { }
    ```
    Routes to child components of `Feature02Component` will be configured in the children array.

6. **Finish.**
### Localization For Datepicker
1. **Add `DatePicker`**
    `HTML files`
    ```
      <input [nbDatepicker]="datepicker">
      <nb-datepicker #datepicker></nb-datepicker>
    ```
    `Module files`
    ```
      import {NbDatepickerModule} from '@nebular/theme';
      
      imports: [
          ThemeModule,
          NbDatepickerModule,
        ],
    ```
    import `NbDatepickerModule`
2. **Localization for `DatePicker`**
    `App.module.ts`
    ```
      import vi from '@angular/common/locales/vi';
      import fr from '@angular/common/locales/fr';
      import { registerLocaleData } from '@angular/common';
      registerLocaleData(vi);
      registerLocaleData(fr);
      
      ---
      providers: [
          { provide: LOCALE_ID, useValue: 'vi' },
        ],
    ```
3. **Finish.**
