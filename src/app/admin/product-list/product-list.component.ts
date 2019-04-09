import { Component, OnInit } from '@angular/core';

import { Router  } from "@angular/router";

import { NzModalService } from 'ng-zorro-antd';

import { ProductService } from '../product.service';
// import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any = [];
  // products: Product[];

  constructor(private service: ProductService,
              private router: Router,
              private  modalService: NzModalService
              ) { }

  ngOnInit() {

    this.service.getProducts()
      .subscribe( data => {
        this.products = data;
        console.log("获取到的商品列表=", this.products);

      });
  }


  // editProduct(product: Product){
  //   localStorage.removeItem ('key_edit_product');    
  //   localStorage.setItem ('key_edit_product', product.id.toString());
  //   this.router.navigate(['product-edit']);

  // }
   删除商品
  deleteProduct(id){

    //在这里弹出提示框
    this.modalService.confirm({
      nzTitle     : '删除商品？',
      nzContent   : '<b style="color: red;">真的要删除？</b>',
      nzOkText    : '是的',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        console.log('OK'),
        this.service.deleteProduct(id).subscribe( data =>{
        // 刷新商品列表页面, 对数据刷新      
        this.router.navigate(['/admin/product-list']);
        // 对数据进行过滤
        this.products = this.products.filter( product => product._id !== id );
        });
      },
      nzCancelText: '不要',
      nzOnCancel  : () => console.log('Cancel')
    });

  }

}
