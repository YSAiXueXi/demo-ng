import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Route, Router } from "@angular/router";

import { ProductService } from "../product.service"

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  myForm: FormGroup;

  //特别注意class 与 template的对应关系
  constructor( private service: ProductService , private router :Router ) { 
    this.myForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required] ),
        detail: new FormControl('', [Validators.required] ),
        price: new FormControl('', [Validators.required] ),
      }
    );
  }

  ngOnInit() {
  }
  onSubmit() {
    
    if(this.myForm.valid){
      this.service.createProduct(this.myForm.value).subscribe( date => { 
        //此处应该返回到商品列表页面。（从哪里来，回到哪里去）
        this.router.navigate(['/admin/product-list']);
      });
    }
  }

}
