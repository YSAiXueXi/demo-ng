import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  { path: 'login' , component : LoginComponent },
  { path: 'register' , component : RegisterComponent },
  {
    path: 'admin',
    loadChildren: "./admin/admin.module#AdminModule",
    // canActivate: [AuthGuard]
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: "login" , pathMatch: 'full'},
  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
