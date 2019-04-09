import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    children: [
      { path: '' , redirectTo: 'product-list', pathMatch: 'full' },
      { path: 'product-list' , component : ProductListComponent },
      { path: 'product-create' , component : ProductCreateComponent },
      { path: 'product-edit/:id' , component : ProductEditComponent },
      { path: 'product-detail' , component : ProductDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
