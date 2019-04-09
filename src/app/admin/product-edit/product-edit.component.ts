import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';

import { Router, ActivatedRoute} from "@angular/router";



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product:  any = {}; //它代表的是一个商品的对象

  constructor(
              private productService: ProductService,
              private router: Router,
              private route : ActivatedRoute
              ) { }

  ngOnInit() {
    // var product_id: number;
    // this.myForm = new FormGroup(
    //   {
    //     title: new FormControl('', [Validators.required] ),
    //     detail: new FormControl('', [Validators.required] ),
    //     price: new FormControl('', [Validators.required] ),
    //   }
    // );
    // var strId : string;
    //  strId = localStorage.getItem("key_edit_product"); 
    // this.service.getProductById( + strId).subscribe( data =>{
    //   this.myForm.setValue(data);
    //  });
  

    //根据商品id，获取到商品的详情
    this.route.params.subscribe( params => {
      this.productService.getProductById(params['id'])
      .subscribe(data => {
        this.product = data;
        console.log("商品详情=", this.product);
      });
      });
  }

    

    
  updataProduct() {
    const obj = {
      title: this.product.title,
      detail: this.product.detail,
      price : this.product.price,
    };
    this.route.params.subscribe(params => {
      this.productService.updateProduct(params['id'], obj)
      .subscribe(data => {  //一定要调用 subscribe,只有调用subscribe后，才会发起网络请求
        this.router.navigate(['/admin/product-list']);
      });
    });
    // if (this.myForm.valid) {
    //   this.service.updateProduct(this.myForm.value)
    //   .subscribe( data => {
    //     this.router.navigate(['product-list']);
    //   })
    // }
  }
}
