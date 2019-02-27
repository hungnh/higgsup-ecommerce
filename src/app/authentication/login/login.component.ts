import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../@core/services/login.service";
import {AuthGuard} from "../../@core/auth/auth-guard.service";
import {LoginResult} from "../../@core/model/login-result.model";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private authenService: AuthGuard) { }

  ngOnInit() {
    this.loginInfo = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

  get formControls() { return this.loginInfo.controls; }

  submitLogin() {
    this.submitted = true;
    if (this.loginInfo.invalid) {
      return;
    }
    this.loginService.login(this.loginInfo.controls.email.value, this.loginInfo.controls.password.value).subscribe(
      (res: LoginResult) => {
        localStorage.setItem('Authorization', res.token);
        console.log(localStorage.getItem('Authorization'));
      }
    );
  }
}
