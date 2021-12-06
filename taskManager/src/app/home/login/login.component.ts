import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from 'src/app/services/account.service';
//import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpFormClass: string = 'flex';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  errorMessages:Array<string>;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {

    this.signUpForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]],
      organizationName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]]
    })
  }
  ngOnInit(): void {
  }
  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.errorMessages=null;
    this.accountService.register(this.signUpForm.value).subscribe(res => {
      if(res.code==0){
        this.accountService.createJWT(res.token, "task");
      }
      else{
        this.errorMessages=res.errors;
      }
    })
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.errorMessages=null;

    this.accountService.login(this.loginForm.value).subscribe(res => {
      if(res.code==0){
        this.accountService.createJWT(res.token, "task");
      }
      else{
        this.errorMessages=res.errors;
      }
    },
      err => {
      });
  }
  signupform(number: number) {
    this.errorMessages=null;
    if (number == 0) {
      this.signUpFormClass = 'flex';
    }
    else {
      this.signUpFormClass = 'none';
    }
  }



  get username() { return this.signUpForm.get("username") };
  get email() { return this.signUpForm.get("email") };
  get password() { return this.signUpForm.get("password") };
  get organizationName() { return this.signUpForm.get("organizationName") };
  get phoneNumber() { return this.signUpForm.get("phoneNumber") };
  get address() { return this.signUpForm.get("address") };
  get name() { return this.signUpForm.get("name") };
  get surname() { return this.signUpForm.get("surname") };
  get emailSi() { return this.loginForm.get("email") };
  get passwordSi() { return this.loginForm.get("password") }

}
