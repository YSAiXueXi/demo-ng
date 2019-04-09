# 目标： 实现添加商品的页面，并构建路由
1.创建几个 component:
  product-list（商品列表）
  product-create（添加商品）
  product-edit（编辑商品）
  product-detail（商品详情）


  创建component (home)

  导入所创建的service 


  
  1.创建几个 component:
  product-list（商品列表）
  product-create（添加商品）
  product-edit（编辑商品）
  product-detail（商品详情）

创建的构建product-create


#构建商品管理的路由

1 创建路由module
  ng g module app --routing
    构建多个modue 怎么办？
      xx.module.ts
      xx-routing.module.ts
      component1
      ...
      componentN
    创建了app-routing.module.ts,就要构建它
    approuting.module.ts 把forchild 改成forRoot
    @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
    导入到app.module.ts中
2创建 routes
  只有加了 <router-outlet>后，前没的路由component才能呈现
3在组件中添加 routerLink



#应用场景：
  点击商品列表中一件商品，把商品的Id 传给编辑页面, 用户可以 进行编辑，
  编辑后，返回到商品列表页面
#实现思路：
  构建编辑商品的template 和class
#关键技术点：
  如何把某个商品的id传给另一个页面
#具体实现:
  ~1. 创建一个组件： product-edit
  ·2. 构建template 和 class

      从template角度看， 商品的编辑页面 与商品的创建页面相似

      区别： 编辑页面需要先拿到该商品的属性，展示，后编辑

      如何获取到某个商品的详细？、
      
      调用它的service （RESTful API 的 GetById 的方法）

  传递路由的参数，有三种方法： 路由的路径/查询参数， localStorage

#第一种方法： 路由的路径
  `1.源头的跳转
  ·2.获取它的参数
  `3.获取到具体的商品，并展示
#路由传参的第二中方法： 在路径中设定查询参数
  ·1. 在 源 组件 跳转
  ·2. 在目标组件 接受
  ·3. 获取具体的商品，并展示
#路由传参的第三中方法： 在路径中设定查询参数
  ·1. 在跳转之前
  先把 商品id 存到 缓存 localStorage 所以要用到动态跳转
  ·2. 读取 商品id from： localStorage
  ·3. 获取具体的商品，并展示

#删除一个商品
 在商品列表的页面，点击删除按钮，完成删除，不需要路由的跳转
 在删除之前，需要用户确认是否真的删除
#实现的思路
 删除商品之前，要获取到商品的id : 删除之后，还要刷新商品列表页面
#具体实现
  product-list.component.html操作

  通过对products 的 filter 操作，刷新数据 从而刷新页面；

  添加对话框 alert，仅仅提示还不过，还得判断用户的操作行为，点击的是确认还是取消呢？

  对话框是有讲究的。 Modal popup （模块对话框）： 可以使用 modal 在当前页面 ”正中" 打开一个浮层（popup）,承载相应操作


  #知识点：
    bootstrap 干什么的？ 单纯的布局和样式， bootstrap 有 alert 弹出框
    如何判断 它的确认和取消? bootstrap 没有给出来

    

    bootstrap of angular / react?

    ng-bootstrap的由来

    ant design of angular / react 

#安装 ant design :  ng-zorro

    ng add ng-zorro-antd

#拿到官方文档
引入
注入
调用
import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle     : 'Are you sure delete this task?',
      nzContent   : '<b style="color: red;">Some descriptions</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOnOk      : () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
}

#添加 login 和 register 组件

`1,创建 组件 register
`1,路由配置 app.routing.module.ts

#如何添加一个路由的进度条？

#实现思路： 查找 Angular (node.js) 的官方组件 ， npmjs.com


#实现方法：
1.安装 Module
  npm install ng2-slim-loading-bar --save

2.搭桥指令， 目的：让 angular7 与第三方模块对接
  npm i rxjs-compat --save
  3. 导入module
  4.导入css //styles.css
  5.添加导航 app.component.html, 放首行
  把 <ng2-slim-loading-bar> 当做一条指令（directive)来使用
  6.加入路由事件 app.component.ts

  小结
  需要第三方插件可以去 npm6


#自定义验证器的实现
 
 自定义验证器（validator) 的规则：

 1.自定义验证器本身就是一个函数
 2。它的参数是： （xx: FormControl) (FormControl 是angular 类型)

 3.函数返回值，必须是javaScript对象key 必须字符串类型[s: string]，value必须是Boolean

 functionName(参数)：boolean && {key :value}
      return { confirm: true, error: true };
    confirm

 4. 如果验证成功，只能返回null 或者 什么也不返回， 直接 return
    不能返回 false,否则报错

  5.return {confirm: true}. confirm 是如何调用的？
   <ng-container *ngIf="validateForm.get('checkPassword').hasError('confirm')">

##新加一个 自定义验证器，应用场景： 注册时，判断用户名是否已经存在？

  实现思路：

  声明一个自定义的validater 函数
  加入到FormGroup
  关template关联


  #优化
  @应用场景： 在原有项目的基础上，优化： 通过 lazyloading

  @实现思路： 把原有的与product 相关的组件 放到一个module中（商品系列
  @具体实现
  1.创建一个module（带有routing的module），名字：admin
   ng g module admin --routing -
  2.创建一个admincomponent（module级的组件
  ng g admin/admin
  3.把组件移动出来
  4.把product相关的组件移动道admin module下
  5.改动思路

  app.module.ts<------------>admin.module.ts
  app-routing.module.ts<----------->admin-routing.module.ts
  竟然相对应进行copy
  declarations是声明，用于组件的声明，因为组件带有@component （decrator：装饰器/装饰父
  import 是引入 ，用于 module的导入，因为所要导入的module里面带有@Ngmodule
  应用场景： 第三方提供的module 比如： bootstrap, ant design这类要加入import
  declarations: [ 
    AdminComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]

  #创建lazy loading, 在 app-routing.module文件中
  关键自： loadChidren
  别导入admin.module

  #知识点：当 lazymodule 用到一些第三方的module时，需要再次引入imports

  比如：当用到 FormGroup |NgModel 需要：
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

#第三步
 进入到 lazymodule 的内容来处理


#为了好看

#应用场景： 添加导航： 顶部导航+ 侧边导航

#模板选型： bootstrap, ant -design
 

 当在Lazymodule 中用到 ant-design 时，需要重新引入 ant-design



#创建 路由守卫 （guard
  >ng g guard auth/auth --spec=false

2.登陆页面 应该有它的service， service 的作用是为了 login component 提供接口
   login service --------- auth.service
   auth.guard ------ auth.service（登陆状态

   创建 auth.service
   > ng g service auth/auth --spec=false

  3.app-routin.module.ts 添加 canActivate
  '4.在 auth.service 文件中，设置用户登陆的状态
     保存登陆状态的方法： sessionStorage()


#场景： 对接自己创建的 node.js server 和 mongod 数据库， 完善 Angular 商品管理

#[实现方法]：

删除一个商品， 需要把该商品的_id 传给后台服务器 


#场景： 如何对接商品的编辑 （前提： 对接自己的后台服务器）

#[实现方法]：

商品编辑页面的复杂性:
1.要获取编辑的数据，并展示： get请求
2.把修改后的数据，直接更行到后台： post请求

3.对我们来说，可以通过 http.put 来实现

4.需要用到two-way data binding(双向数据绑定) 具体来说就是 ngmodel 的应用


#场景： 登陆页面的提示， 当登陆失败时，给出提示

#实现 方法: 集成第三放
用到 alertService 第三方
>ng g c alert --spec=false


#前端与后台的结合 
 #注意： 启动mongod 数据库 ，启动 node.js server  运行 angular 应用

一种模式： 前端驱动
1. template （html
2. controller （ts
3. service （服务
4. 构建 node.js server 的RESTful API

另一种模式： 后端驱动
1. 构建 node.js server 的 RESTful API , 一定通过postman 验证
   我们已经构建了 login 的register API

2.前端构建 Service

3. 组件

#知识点

  掌握对象的构建，比如 register 对象：
  {
    username: xx,
    password:xxx,
    email: xx,
    mobile: xx,
  }

一定要注意 再component 中，对 service 进行 subscribe, 只有订阅（subscribe）后，才发其网络请求

#完善login 

1.已经有 login 的service接口

2.再login component 中调用service接口

#技巧
后台给声明错，前端就显示什么错

  this.alertService.error(data['msg]);

# 完善 注册流程 
1. 如果注册成，设置 router guard （路由守卫）的状态；
2. 如果注册成功， 跳转到商品列表页面；
3.如果注册失败，给出提示，告知用户，具体提示信息，有server提供

