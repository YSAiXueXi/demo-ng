import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }
  baseUrl: string = "http://localhost:3000/products"

  //get 获取商品列表

  getProducts(){
    return this.http.get(this.baseUrl);
  }
  // <Product[]>
  //get 获取指定商品
  getProductById(id){
    return this.http.get(this.baseUrl + '/' + id);
  }

  //创建商品
  createProduct( obj) {
    return this.http.post(this.baseUrl, obj );
  }
  // product: Product
  //修改商品
  updateProduct(id, obj){
    return this.http.put(this.baseUrl + '/' + id , obj);
   }
  
  //删除商品
  deleteProduct(id) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  //以上所有的返回，都是返回一个对象Obj
}
