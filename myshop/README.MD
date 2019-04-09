#解读 Express 框架
1. package.json文件： express工程的配置文件
2. 问什么可以执行npm start ? 相当与执行： node .bin/www

"scripts": {
    "start": "node ./bin/www"
  },

3. 运行 ./bin/www 文件： ./ 表示当前路径

  wwww文件不带后缀 .js

  www 的引用：
  1. 引入node.js 的 http 模块（module）
  2. 创建http的服务：
  3. 设定端口（3000
  4.启动服务，并监听

  var app = require('../app');
  目的是执行 app.js, 核心是app.js
  程序入口： ./bin/www(可以改写端口号)；
  我们编写程序的入口： app.js

#RESTful API 的构建
  思路： 模拟 json-server 所做的事情

  1。 为前端提供路由
  2。提供数据（来自数据库）
    创建 model (schema . collection , 相当于 mySQL 中的表)

  3。提供RESTful API 再routes  products中完成
    GET/POST/PUT/DELETE
  4.创建数据库

  #运行注意事项：

  因为需要操作数据库，所以，要启动数据库应用服务（方法：新打开一个终端窗口 ，执行 mongod

  2.新开启一个终端窗口， 运行express 工程，先出后运

  3.不能找到mongoose ，需要安装它， npm install mongoose --save

  4.正常运行结果：终端窗口看到 connection successful!
  mongoose.connect( 'mongodb://localhost/myshop') 坑 mongodb://这里一定要注意//必加

  5.借助 postman 
  6.robo 3T工具
    
  7.前后端分离验证：
  前端启动angular程序
  

  #实现 RESTful API 的 CRUD

  #注意事项 // CORS 必须放在其他路由之前

  app.use(cors()); //CORS
//设置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', ProductsRouter);// 商品路由



#[知识点]

  mogoose 的类似 findByIdAndRemove , 都带 ById . 特别注意 这里的id 是 mongodb 数据库中的 集合
  （collection) 中的 document （文档对象）的_id, 是唯一， 对于同一个collection 中的
  _id 类型是 ObjectId ,通常可以理解为 字符串， 24 位的字符串。

  # 如何验证 node.js server 的 RESTful CRUD

  使用 postman

  #通过 postman 工具 验证 Node。js server 提供的 RESTful API 正确无误！

  之后开启前端之旅

  #创建 用户登陆注册的 RESTful API

具体给前端提供的API：
1. login（username, password), return 成功，用户名不存在， 密码有错
2. register 注册： register(username,password,email)


#[实现方法]
1.构建 user model

2.构建 API （login， register）

3.用postman验证自己写的 API

# 重构"注册" api

1.如果要注册的用户名已经存在，给前端提示，告知前端信息（比如： 用户名已经存在）

2. 如果注册成功。 返回 code ="0"

#[知识点]： 安装 Node.js 服务自动重启工具 --nodemon

 安装方法： npm install -g nodemon

 通常启动 server 的方法： node server.js

 现在可以用 nodemon server.js

 运行 express 工程的指令： npm start

 "scripts": {
    "start": "node ./bin/www"
  },

  用了 nodemon 之后： 
  "scripts": {
    "start": "nodemon ./bin/www"
  },

  # 
  user_entity
  .save()  // var obj1 = user_entity.seve();
  .then( result => { //var obj2 = obj1.then();
        console.log(result);
        res.json( {
          code: "0",
          msg: "用户创建成功！"
        });
      })
      .catch( err => {
        //这种方法 叫做： chained operation

#用 mongoose 时，有3个概念：
  1. schema 定义表的结构
  2. model 操作mongodb 数据库
  3. entity  实体。也是操作数据库

