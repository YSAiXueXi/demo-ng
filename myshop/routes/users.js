var express = require('express');
var router = express.Router();

var User = require('../models/model-user');



router.get('/',function(req, res, next) {
  User.find( function(err, user) {
    if(err) return next (err); //error
      res.json(user);
  });

});


//登陆login 用 post 方法
router.post('/login', function(req, res, next){
  //查询该用户存在？
  User.findOne( { username: req.body.username}, function( err, user) {

    if (err) throw "user not found";

    if(user) { //如何用户存在
      if(req.body.password == user.password) {
        res.json( { code:'0', msg: 'login success!'}); //login success
      } else{
        res.json( { code:'1',msg: '密码错误'}); 
      } 
    }else{
        res.json( { code:'2',msg: '用户名不存在'}); 
      }
  });
});



//user reigister POST请求 
// router.post('/register',function(req, res, next) {
//   User.create( req.body, function(err, user){
//     if(err) return next(err);//错误先行原理
//     res.json(user);
//   });
// });

router.post('/register',function(req, res, next) {

  User.findOne( {
    username: req.body.username
  })
  .exec()
  .then( user => {
    if (user) { //该用户名已经存在，需要用户重新提交注册
      return res.json( {
        code: "1",
        msg : "用户名已经存在！",
      });
    }else{
      const user_entity = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });

      user_entity    //promise 操作
      .save() 
      .then( result => {
        console.log(result);
        res.json( {
          code: "0", //写人数据库成功
          msg: "用户创建成功！"
        });
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  });
  
});

module.exports = router;
