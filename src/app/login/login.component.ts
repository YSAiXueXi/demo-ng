import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

import { AlertService } from "../alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  isLogin: any= false;

  constructor( 
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.validateForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required] ),
        password: new FormControl('', [Validators.required] ),
      }
    );
  }
  //点击登陆按钮
  login() {

    const obj = {
      username: this.validateForm.controls.userName.value,
      password: this.validateForm.controls.password.value,
    }
    this.authService.login(obj).subscribe(
      data => {
        if ( data['code'] == "0" ) {//login successful
          this.isLogin = true;
          sessionStorage.setItem('status',this.isLogin);//保存登陆状态
          this.router.navigate(['/admin/product-list']);
        }
        else if (data ['code'] == "1") {//password is wrong
          this.alertService.error(data['msg']);

        } 
        else {
          this.alertService.error(data['msg']);
        }
        
      }
    );
    // if (this.authService.login(
    //   this.validateForm.controls.userName.value,
    //   this.validateForm.controls.password.value
    // )) {
    //   this.router.navigate(['/admin/product-list']);
    // } else {
    //   this.alertService.error("登陆失败！");
    // }
  }

}
