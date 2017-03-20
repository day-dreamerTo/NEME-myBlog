var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// app.get('/',function(req,res){
// 	res.send('hello,express');
// });
// app.get('/users/:name',function(req,res){
// 	res.send('hello,' + req.params.name);
// })

// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','ejs');

// app.use('/',indexRouter);
// app.use('/users',usersRouter);

app.use(function(req,res,next){
	console.log('1');
	next(new Error('haha'));
	// next();
});
app.use(function(req,res,next){
	console.log('2');
	res.status(200).end();
});
//错误处理
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500).send('Something broke!');
});
app.listen(3000);