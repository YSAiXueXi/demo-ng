//引入 mongoose

var mongoose = require('mongoose');

// 创建user 的schema


var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  emil: String,
});

//输出这个model , module是node.js自带的

module.exports = mongoose.model('model-user', userSchema);
