var Manager =require('../models/manager')

exports.superLoginPage = function(req,res){
	res.render('superlogin',{
		title:'超级管理员登陆'
	})
}
exports.superLogin = function(req,res){
	var email = req.body.super.email
	var password = req.body.super.password
	console.log(email,password)
	var _email = '215795076@qq.com'
	var _password = '123'
	var _super ={
		email: email,
		password: password
	}

	if(email == _email && password == _password){
		req.session.super = _super
		res.redirect('/super/manager')
	}else{
		res.redirect('/super/login')
	}
}
exports.superLogout = function(req,res){
	delete req.session.super
	console.log(req.session.super)
	res.redirect('/super/login')
}
exports.managerSubmit = function(req,res){
	Manager.find({},function(err,managers){
		if(err){
			console.log(err)
		}
		res.render('super-home',{
			title:'管理员注册',
			managers:managers
		})
	})
}
exports.managerPost = function(req,res){
	var _manager = req.body.manager
	var _password_bcy =  _manager.password
	_manager.password_bcy = _password_bcy
	console.log(_manager)
	Manager.findOne({email:_manager.email},function(err,manager){
		if(err){
			console.log(err)
		}
		if(manager){
			return res.redirect('/super/manager')
		}else{
			var manager = new Manager(_manager)
			manager.save(function(err,manager){
				if(err){
					console.log(err)
				}
				res.redirect('/super/manager')
			})
		}
	})
}
exports.managerDel = function(req,res){
	var id = req.query.id
	console.log(id)
	if(id){
		Manager.remove({_id:id},function(err,manager){
			if(err){
				console.log(err)
				res.json({msg:0})
			}else{
				res.json({msg:1})
			}
		})
	}
}