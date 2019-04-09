import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService,
               private router: Router
               ){ }
  
  isGoLogin(url): boolean{
    const isLogin = sessionStorage.getItem('status');

    if (isLogin) {//用户处于登陆状态
      return true;
    }
    else {  //用户处于未登陆状态
      this.router.navigate(['/login']);
      return false;
    }
    
  }

  canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |boolean{
     
      const url: string = state.url;
      return this.isGoLogin(url);
    }

    canLoad(route: Route): boolean {
      const url = `${route.path}`
      return this.isGoLogin(url);
    }
}
