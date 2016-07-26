var Customer =require('../models/customer')
var Manager =require('../models/manager')
var Order =require('../models/order')
var Good =require('../models/good')
var GoodLike =require('../models/goodlike')
var Strategy = require('../models/strategy')
var StrategyLike = require('../models/strategylike')


var fs=require('fs')
var path=require('path')

exports.managerLoginPage = function(req,res){
	res.render('managerlogin',{
		title:'管理员登陆'
	})
}
exports.managerLogin =function(req,res){
	var email = req.body.manager.email
	var password = req.body.manager.password
	var password_bcy = password
	console.log(email,password)
	Manager.findOne({email:email},function(err,manager){
		if(err){
			console.log(err)
		}
		if(!manager){
			return res.redirect('/manager/login')
		}
		manager.comparePassword(password_bcy,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				req.session.manager = manager
				return res.redirect('/manager/home')
			}else{
				return res.redirect('/manager/login')
			}
		})
	})
}
exports.managerLogout =function(req,res){
	delete req.session.manager
	console.log(req.session.manager)
	res.redirect('/manager/login')
}

exports.orderList = function(req,res){
	Order
		.find({})
		.populate('goodId')
		.sort({'meta.createAt':-1})
		.exec(function(err,orders){
			res.render('manager-home',{
			orders:orders
			})
		})
}
exports.goodSubmitPage = function(req,res){
	res.render('good-submit',{
		title: '商品提交'
	})
}
exports.saveGoodPoster = function(req,res){
	var posterData = req.files.uploadPoster
	console.log(posterData)
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename
	if (originalFilename) {
	 	  fs.readFile(filePath, function(err, data) {
	    var timestamp = Date.now()
	    var type = posterData.type.split('/')[1]
	    var poster = timestamp + '.' + type
	    var newPath = path.join(__dirname, '../', '/public/upload/' + poster)
	    fs.writeFile(newPath, data, function(err) {
	      req.session.poster = poster
	      res.json({msg:1})
	    })
	  })
	}
	else {
	  res.json({msg:0})
	}
}
exports.goodPost =function(req,res){
	var id = req.session.manager._id
	if(req.session.poster){
		var	_poster = req.session.poster
		console.log(_poster)
	}
	console.log(req.body)
	if(req.body){
		var _good = {
			 city : req.body.city,
			 tag : req.body.tag,
			 title : req.body.title,
			 subTitle : req.body.subTitle,
			 poster : _poster,
			 address : req.body.address,
			 tell : req.body.tell,
			 name : req.body.name,
			 priceA : req.body.priceA,
			 priceB : req.body.priceB,
			 bed : req.body.bed,
			 goodTotal : req.body.goodTotal,
			 buyNum: 0 ,
			 include : req.body.include,
			 buyInfo : req.body.buyInfo,
			 useInfo : req.body.useInfo,
			 detail : req.body.detail
		}
		console.log(_poster)
		if(id){
			var good = new Good(_good)
			good.save(function(err,manager){
				if(err){
					console.log(err)
				}
				delete req.session.poster
				console.log(req.session.poster)
				// return res.redirect('/manager/good/list')//ajax不能跳转
				res.json({msg:1})
			})
		}
	}
	else{
		res.json({msg:0})
	}
}
exports.goodList =function(req,res){
	Good.find({},function(err,goods){
		res.render('good-list',{
			goods:goods
		})
	})
}
exports.goodDel =function(req,res){
	var id = req.query.id
	console.log('gooddelid',id)
	if(id){
		Good.remove({_id:id},function(err,good){
			if(err){
				console.log(err)
				res.json({msg:0})
			}else{
				res.json({msg:1})
			}
		})
	}
}

exports.strategySubmitPage = function(req,res){
	res.render('strategy-submit',{
		title: '攻略'
	})
}
exports.saveStrategyPoster = function(req,res,next){
	var posterData = req.files.uploadPoster
	console.log(posterData)
	var filePath = posterData.path
	var originalFilename = posterData.originalFilename
	if (originalFilename) {
	 	  fs.readFile(filePath, function(err, data) {
	    var timestamp = Date.now()
	    var type = posterData.type.split('/')[1]
	    var poster = timestamp + '.' + type
	    var newPath = path.join(__dirname, '../', '/public/upload/' + poster)

	    fs.writeFile(newPath, data, function(err) {
	      req.session.poster = poster
	      res.json({msg:1})
	    })
	  })
	}
	else {
	   res.json({msg:0})
	}
}
exports.strategyPost =function(req,res){
	var id = req.session.manager._id
	if(req.session.poster){
		var	_poster = req.session.poster
		console.log(_poster)
	}
	console.log(111,req.body)
	if(req.body){
		var _strategy = {
			city: req.body.city,
			tag: req.body.tag,
			title: req.body.title,
			poster: _poster,
			address: req.body.address,
			tell: req.body.tell,
			price: req.body.price,
			time: req.body.time,
			detail: req.body.detail
		}
		console.log(_poster)
		console.log(_strategy)
		if(id){
			var strategy = new Strategy(_strategy)
			strategy.save(function(err,strategy){
				if(err){
					console.log(err)
				}
				delete req.session.poster
				console.log(req.session.poster)
				// return res.redirect('/manager/strategy/list')
				res.json({msg:1})
			})
		}
	}else{
		res.json({msg:0})
	}
}
exports.strategyList =function(req,res){
	Strategy.find({},function(err,strategys){
		if(err){
			console.log(err)
		}
		res.render('strategy-list',{
			strategys : strategys
		})
	})
}
exports.strategyDel =function(req,res){
	var id = req.query.id
	console.log('strategydelid',id)
	if(id){
		Strategy.remove({_id:id},function(err,strategy){
			if(err){
				console.log(err)
				res.json({msg:0})
			}else{
				res.json({msg:1})
			}
		})
	}
}

exports.showCustomer = function(req,res){
	Customer.find({})
		.sort({'meta.createAt':-1})
		.exec(function(err,customers){
			if(err){
				console.log(err)
			}
			res.render('customer-list',{
				customers : customers
			})
		})
}

exports.signinRequired=function(req,res,next){
	var manager=req.session.manager
	if(!manager){
		return res.redirect('/manager/login')
	}
	next()
}
