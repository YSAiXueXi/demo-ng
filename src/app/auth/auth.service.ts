import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: any = false;
  baseUrl: string = "http://localhost:3000/users"

  constructor(private http:HttpClient) { }

  //user register 对象obj：{ username:,password}
  login(obj : any){
    console.log('login data=', obj);
    return this.http.post(`${this.baseUrl}/login`, obj);
  }

  register(obj : any){
    console.log('register data=', obj);
    return this.http.post(`${this.baseUrl}/register`, obj);
  }
  // //用户登陆 （sign in）
  // login( name: string, password: string) : boolean {
    
  //   if( ("admin" == name) && ("123456" == password)) {
  //     this.isLogin = true;

  //     sessionStorage.setItem('status', this.isLogin);
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }


  //用户注销（sign out）
  logout (){
    this.isLogin = false;
    sessionStorage.removeItem('satus');
  }
}
