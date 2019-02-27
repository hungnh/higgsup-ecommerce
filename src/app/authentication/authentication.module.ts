import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NotFoundComponent} from "../pages/not-found/not-found.component";
import { AuthenticationComponent } from './authentication.component';
import {ThemeModule} from "../@theme/theme.module";
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    RegisterComponent,
  ],
})
export class AuthenticationModule { }
