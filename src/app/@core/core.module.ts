import {Injectable, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAuthJWTToken, NbAuthModule, NbAuthService, NbPasswordAuthStrategy} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class NbSimpleRoleProvider implements NbRoleProvider {
  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload()['scopes'][0] : 'ROLE_MEMBER';
        }),
      );
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: 'http://192.168.1.63:8080/api/',
        login: {
          endpoint: 'auth/login',
          method: 'POST',
        },
        logout: {
          endpoint: 'auth/token/invalidate',
          method: 'POST',
        },
      }),
    ],
    forms: {},
  }).providers,

  NbSecurityModule.forRoot({
      accessControl: {
        ROLE_MEMBER: {
          view: [],
        },
        ROLE_ADMIN: {
          parent: 'ROLE_MEMBER',
          view: ['feature01', 'dashboard-admin-text'],
        },
      },
    },
  ).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
