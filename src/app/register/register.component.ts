import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../auth/auth.service";

import { Router } from "@angular/router";

import { AlertService } from "../alert/alert.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  validateForm: FormGroup;
  
  isLogin: any=false;

  forbiddenNames = ['zhangsan', 'lisi'];
  
  constructor(private authService :AuthService,
              private router :Router,
              private alertService:AlertService,
              ) { }

  ngOnInit() {
    this.validateForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required, 
          this.forbiddenNamesValidator.bind(this),
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ]),
        password: new FormControl('', [Validators.required,Validators.minLength(6),
          Validators.pattern('^(?=.*[a-zA-z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ]),
        email   : new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-z0-9-]+.[a-zA-Z0-9-.]+$')] ),
        checkPassword: new FormControl('', [Validators.required, this.confirmationValidator.bind(this)] ),
      }
    );
  }
 
  //函数表达式的写法
  // confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  // }
  updateConf
  // 常规的函数（方法）：
  confirmationValidator( checkCtrl : FormControl) : { [s: string] : boolean } {
    if (!checkCtrl.value) {
      return { required: true };
    } else if (checkCtrl.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    else 
    return null; //不能return false
    }

    // 自定义验证器，注册时，判断用户名是否已经存在？
    forbiddenNamesValidator( control: FormControl) : { [s: string] : boolean } {
      if(this.forbiddenNames.indexOf(control.value) !== -1)//如果不在黑名单中，返回 -1
  
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.validateForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      else 
      return null; //不能return false
      }
  

  register(){
    if (this.validateForm.valid) {
      const obj = {
        username: this.validateForm.controls.userName.value,
        password: this.validateForm.controls.password.value,
        email: this.validateForm.controls.email.value,
      };
      this.authService.register(obj).subscribe(
        data => {
          if( data['code'] == "0"){
            this.isLogin = true; //注册成功即为登陆成功
            sessionStorage.setItem('status', this.isLogin);
            this.router.navigate(['/admin/product-list']);
        }else{
          this.alertService.error(data['msg']); //msg 时server给的key
        } 

        }
      );

    }
  }

}

