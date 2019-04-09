//引入 mongoose

var mongoose = require('mongoose');

// 创建product 的schema


var productSchema = new mongoose.Schema({
  title: String,
  detail: String,
  price: Number,
});

//输出这个model , module是node.js自带的

module.exports = mongoose.model('model-product', productSchema);
