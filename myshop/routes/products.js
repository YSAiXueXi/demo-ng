var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
var Product = require('../models/model-product');

//GET请求
router.get('/',function(req, res, next) {
  Product.find( function(err, data) {
    if(err) return next (err); //error
      res.json(data);
  });

});

//POST请求 (添加商品)
router.post('/',function(req, res, next) {

  Product.create( req.body, function(err, product){
    if(err) return next(err);
    res.json(product);
  });

});


//get 指定的商品 by id
router.get('/:id',function(req, res, next) {

  Product.findById(req.params.id, function(err, data) {
    if(err) return next(err);

    res.json(data);
  });

});
//修改指定的商品 by id
router.put('/:id', function(req, res, next) {

  Product.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if(err) return next(err);
    res.json( //返回的是一个对象， 是json 格式的javaScripr 对象
      {
         code: "0",
         msg: "更新成功！"
      }
    );
  });

});
//删除指定商品by id
router.delete('/:id', function(req, res, next) {

  Product.findByIdAndRemove(req.params.id, function(err,data){
    if(err) return next(err);
    // res.json(data);//这是返回数据，但是我们不需要
    res.json(
      {
        code: "0",
        msg: "删除成功！"
      });
  });

});
module.exports = router;
