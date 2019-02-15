import {Injectable, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthJWTToken,
  NbAuthModule,
  NbAuthService,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {DataModule} from './data/data.module';
import {AnalyticsService} from './utils';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {AuthGuard} from './auth/auth-guard.service';

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
        baseEndpoint: environment.apiEndpoint,
        login: {
          endpoint: 'auth/login',
          method: 'POST',
        },
        logout: {
          endpoint: 'logout',
          method: 'POST',
        },
      }),
    ],
    forms: {},
  }).providers,

  {
    provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    useValue: function (req: HttpRequest<any>) {
      return req.url === '/api/auth/token';
    },
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NbAuthJWTInterceptor,
    multi: true,
  },

  AuthGuard,

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
