var express = require('express')
var path=require('path')


var mongoose=require('mongoose')
var dbUrl='mongodb://127.0.0.1/zbyou'
	mongoose.connect(dbUrl)

var session = require('express-session')
var mongoStore=require('connect-mongo')(session)

var serveStatic = require('serve-static')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')

var port=process.env.PORT||3001
var app=express()
	app.listen(port)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next()
})

app.use(cookieParser())
app.use(session({
	secret:'zbyou',
	saveUninitialized: true,
	resave: false,
	store: new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))

app.set('views', path.join(__dirname, '../font-end/managem/views'))//设置view的路径 编译jade
app.set('view engine', 'jade')

app.use(serveStatic(path.join(__dirname,'../')))//相对app.js来说 设置静态资源的路劲起点css jpg js等
app.locals.moment=require('moment')

require('./config/routes')(app)

console.log('zbyou started on port ' + port)


