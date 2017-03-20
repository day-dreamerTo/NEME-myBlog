var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {
  //清空 session 中用户信息
  req.session.user = null;
  req.flash('success','登出成功');
  //登出成功后跳转到主页  以游客身份
  res.redirect('/posts');
});

module.exports = router;