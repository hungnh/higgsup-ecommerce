import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../@core/services/login.service";
import {LoginResult} from "../../@core/model/login-result.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpService} from "../../@core/services/http.service";

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
              private httpService: HttpService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.httpService.getToken()) {
      this.router.navigate(['/pages/home']);
    }
    this.loginInfo = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });
  }

  get formControls() {
    return this.loginInfo.controls;
  }

  submitLogin() {
    this.submitted = true;
    this.loginInfo.setErrors(null);
    if (this.loginInfo.invalid) {
      return;
    }
    this.loginService.login(this.loginInfo.controls.email.value, this.loginInfo.controls.password.value).subscribe(
      (res: LoginResult) => {
        if (res) {
          localStorage.setItem('Authorization', 'Bearer ' +  res.token);
          this.httpService.setHeaderToken();
          this.router.navigate(['/pages/home']);
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginInfo.setErrors({authenFailed: true});
        }
      }
    );
  }
}
