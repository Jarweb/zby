var Customer =require('../models/customer')
var Manager =require('../models/manager')
var Order =require('../models/order')
var Good =require('../models/good')
var GoodLike =require('../models/goodlike')
var Strategy = require('../models/strategy')
var StrategyLike = require('../models/strategylike')
var jwt = require("jsonwebtoken")


exports.signup = function(req,res){//注册提交
	var tell = req.body.tell
	var password = req.body.password
	var _customer = {
		tell: tell,
		password: password
	}
	_customer.token = jwt.sign(_customer, 'zby')
	console.log(_customer)
	Customer.findOne({tell:tell},function(err,customer){
		if(err){
			console.log(err)
		}
		if(customer){
			return res.json({msg:0})//前端跳到登陆页 提示用户已注册
		}else{
			var customer = new Customer(_customer)
			customer.save(function(err,customer){
				if(err){
					console.log(err)
				}
				console.log(customer)
				return res.json({msg:1})//前端同时保存一份用户数据
			})
		}
	})
}
exports.login = function(req,res){//登陆提交
	var tell = req.body.tell
	var password = req.body.password
	console.log(tell,password)
	Customer.findOne({tell:tell},function(err,customer){
		if(err){
			console.log(err)
		}
		if(!customer){
			return res.json({msg:0})//前端跳到注册页 提示用户名不存在
		}
		customer.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				req.session.customer = customer
				return res.json(customer)//前端跳到首页 保存信息到前端
			}else{
				return res.json({msg:1})//前端提示密码不正确
			}
		})
	})
}
exports.logout = function(req,res){//提交信息
	delete req.session.customer
	return res.json({mag:'已退出登陆'})//前端跳到登陆页
}
exports.showCity = function(req,res){//拉取信息
	Good.find({},function(err,goods){
		if(err){
			console.log(err)
		}
		var citys = []
		var obj = {}
		var index = 0
		var l = goods.length
		for(var i = 0;i<l;i++){
			// console.log(goods[i].city)
			if(obj[goods[i].city] == undefined){
				obj[goods[i].city ]= 1
				citys[index++] = goods[i].city

			}else if(obj[goods[i].city] == 1){
				continue
			}
		}
		console.log(citys)
		res.json(citys)//拿到数据展示列表
	})
}
exports.goodList = function(req,res){//拉取数据
	var city = req.body.city
	var tag  = req.body.tag
	console.log(req.body.city)
	console.log(req.body.tag)
	Good.find({city: city,tag: tag},function(err,goods){
		if(err){
			console.log(err)
		}
		if(!goods || goods.length == 0){
			res.json({msg:0})
		}
		else{
			console.log(goods)
			res.json(goods)//拿到数据展示列表
		}
	})
}
exports.goodDetail = function(req,res){//拉取数据
	var id = req.params.id
	console.log(id)
	Good.findById(id,function(err,good){
		if(err){
			console.log(err)
		}
		res.json(good)//拿到数据展示 并保存到前端
	})
}
//以下4个的数据都是从前端拿
// exports.goodBuyInfo = function(req,res){}
// exports.goodOrderInfo = function(req,res){}
// exports.goodPayInfo = function(req,res){}
// exports.showGoodMap = function(req,res){}


exports.goodPayPost = function(req,res){//订单数据提交
	var order = req.body.order
	console.log(req.body.order)
	if(order != null){
		var _order = {
			buyerName:  order.username,
			buyerPhone: order.usertell,
			buyerRemark:order.remark,
			customerId: order.customerId,
			goodId:     order.goodId,
			buyDate:    order.date,
			buyNum:     order.count,
			sumPrice:   order.sumPrice,
			goodTitle:  order.title,
			goodName:   order.name,
			goodAddress:order.address,
			goodTell:   order.tell,
			goodPrice:  order.price
		}
		var order = new Order(_order)
		order.save(function(err,order){
			if(err){
				console.log(err)
				res.json({msg:0})
			}
			res.json({msg:1})
		})
	}
}

exports.strategyList = function(req,res){//拉取数据
	var city = req.body.city
	var tag  = req.body.tag
	console.log(req.body.city)
	console.log(req.body.tag)
	console.log(req.body)
	Strategy.find({city: city,tag: tag},function(err,strategys){
		if(err){
			console.log(err)
		}
		if(!strategys || strategys.length == 0){
			res.json({msg:0})
		}
		else{
			console.log(strategys)
			res.json(strategys)//拿到数据展示列表
		}
	})
}
exports.strategyDetail = function(req,res){//拉取数据
	var id = req.params.id
	Strategy.findById(id,function(err,strategy){
		if(err){
			console.log(err)
		}
		res.json(strategy)//拿到数据展示
	})
}

exports.goodLikePost = function(req,res){//提交数据 前端设定延迟时间才提交数据
	console.log(req.body)
	var customerId = req.body.userId
	var goodId = req.body.goodId
	var _goodLike = {
		customerId: customerId,
		goodId: goodId
	}
	var goodLike = new GoodLike(_goodLike)
	goodLike.save(function(err,goodLike){
		if(err){
			console.log(err)
			res.json({msg:0})
		}
		res.json({msg:1})
	})
}
exports.goodLikeDel = function(req,res){//提交数据
	var goodId = req.body.goodId
	var customerId = req.body.userId
	if(goodId && customerId){
		Good.remove({goodId:goodId,customerId:customerId},function(err,goodLike){
			if(err){
				console.log(err)
				res.json({msg:0})
			}
			res.json({msg:1})
		})
	}else{
		res.json({msg:0})
	}
}
exports.strategyLikePost = function(req,res){//提交数据
	console.log(req.body)
	var customerId = req.body.userId
	var strategyId = req.body.strategyId

	var _strategyLike = {
		customerId: customerId,
		strategyId: strategyId
	}
	var strategyLike = new StrategyLike(_strategyLike)
	strategyLike.save(function(err,strategyLike){
		if(err){
			console.log(err)
			res.json({msg:0})
		}
		res.json({msg:1})
	})
}
exports.strategyLikeDel = function(req,res){
	var strategyId = req.body.strategyId
	var customerId = req.body.userId
	if(strategyId && customerId){
		Good.remove({strategyId:strategyId,customerId:customerId},function(err,strategyLike){
			if(err){
				console.log(err)
				res.json({msg:0})
			}
			res.json({msg:1})
		})
	}else{
		res.json({msg:0})
	}
}
//从前端拿数据
// exports.showStrategyMap = function(req,res){}

//exports.showUserInfo = function(req,res){}
exports.showUserLike = function(req,res){//拉取数据
	console.log(req.params.id)
	var customerId = req.params.id
	if(customerId){
		GoodLike
		.find({customerId:customerId})
		.populate('goodId')
		.sort({'meta.createAt':-1})
		.exec(function(err,goodLikes){
			if(err){
				console.log(err)
			}
			StrategyLike
			.find({customerId:customerId})
			.populate('strategyId')
			.sort({'meta.createAt':-1})
			.exec(function(err,strategyLikes){
				if(err){
					console.log(err)
				}
				res.json({
					goodLikes: goodLikes,
					strategyLikes: strategyLikes
				})//展示数据列表
			})
		})
	}

}
exports.showUserOrder = function(req,res){//拉取数据
	var customerId = req.params.id
	console.log(req.params.id)
	Order.find({customerId:customerId})
		.sort({'meta.createAt':-1})
		.exec(function(err,orders){
			if(err){
				console.log(err)
			}
			res.json(orders)//展示数据列表
		})

}
//exports.userCommentPost = function(req,res){}