import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../@core/services/register.service";
import {RegisterDTO} from "../../@core/model/register-dto.model";
import {Router} from "@angular/router";
import {LoginService} from "../../@core/services/login.service";
import {LoginResult} from "../../@core/model/login-result.model";
import {HttpService} from "../../@core/services/http.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private httpService: HttpService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    }, {
      validator: this.mustMatchValidate('password', 'confirmPassword')
    });
  }

  get registerFormControls() { return this.registerForm.controls; }

  submitRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerService.register(this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value).subscribe(
    (res: RegisterDTO) => {
      if (res.responseMessage.messageCode === null) {
          this.httpService.setHeaderToken();
          this.loginService.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe((res: LoginResult) => {
            if (res) {
              localStorage.setItem('Authorization', 'Bearer ' +  res.token);
              this.httpService.setHeaderToken();
              this.router.navigate(['/pages/home']);
            }
          });
        } else if (res.responseMessage.messageCode == 14) {
          this.registerForm.controls.email.setErrors({emailExisted: true});
        } else if (res.responseMessage.messageCode == 1) {
          this.registerForm.setErrors({invalidInput: true});
        }
      }
    );
  }

  mustMatchValidate(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        this.registerForm.setErrors({ mustMatch: true });
      } else {
        this.registerForm.setErrors(null);
      }
    }
  }
}

