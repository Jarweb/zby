var Customer = require('../controllers/customer')
var Manager = require('../controllers/manager')
var Super = require('../controllers/super')

var multipart=require('connect-multiparty')
var multipartMiddleware=multipart()

module.exports = function(app) {

  app.use(function(req, res, next) {
    var _customer = req.session.customer
    app.locals.customer = _customer
    next()
  })

  app.get('/super/login',Super.superLoginPage)
  app.post('/super/login/post',multipartMiddleware,Super.superLogin) // 超级管理员登陆
  app.get('/super/logout',Super.superLogout) //超级管理员登出
  app.get('/super/manager',Super.managerSubmit) //管理员生成页及列表页
  app.post('/super/manager/post',multipartMiddleware,Super.managerPost) //管理员生成提交
  app.delete('/super/manager/del',Super.managerDel) //管理员删除

  app.get('/manager/login',Manager.managerLoginPage) //管理员登陆页面
  app.post('/manager/login/post',multipartMiddleware,Manager.managerLogin)  //管理员登陆提交
  app.get('/manager/logout',Manager.managerLogout) //管理员登出

  app.get('/manager/home',Manager.signinRequired,Manager.orderList)//订单列表
  app.get('/manager/good/submit',Manager.signinRequired,Manager.goodSubmitPage)
  app.post('/manager/good/poster/post',multipartMiddleware,Manager.saveGoodPoster)
  app.post('/manager/good/post',multipartMiddleware,Manager.goodPost)//商品保存
  app.get('/manager/good/list',Manager.signinRequired,Manager.goodList)//商品列表
  app.delete('/manager/good/del',Manager.goodDel)//商品删除

  app.get('/manager/strategy/submit',Manager.signinRequired,Manager.strategySubmitPage)
  app.post('/manager/strategy/poster/post',multipartMiddleware,Manager.saveStrategyPoster)//攻略保存
  app.post('/manager/strategy/post',multipartMiddleware,Manager.strategyPost)//攻略保存
  app.get('/manager/strategy/list',Manager.signinRequired,Manager.strategyList)//攻略列表
  app.delete('/manager/strategy/del',Manager.strategyDel)//攻略删除
  app.get('/manager/customer/list',Manager.signinRequired,Manager.showCustomer)//获取用户列表
  

  //手机端
  // app.get('/user/signup/page')
  app.post('/user/signup/post',multipartMiddleware,Customer.signup) //用户注册 提交数据
  app.post('/user/login/post',multipartMiddleware,Customer.login)//用户登陆 提交数据
  app.get('/user/logout',Customer.logout)//用户登出 提交数据

  // app.get('/',Customer.index)//首页
  app.get('/city',Customer.showCity)//城市选择页面  前端保存选择后的城市 拉取数据

  app.post('/good/list',Customer.goodList)//商品列表   前端写死tag  根据tag city查找good集合 拉取数据
  app.get('/good/list/:id',Customer.goodDetail)//商品详情   根据id查找 数据缓存起来 拉取数据
  //app.get('/good/buy',Customer.goodBuy)//商品购买  数据保存在前端cookie
  //app.get('/good/buy/info',Customer.showGoodBuyInfo)//商品购买信息填写 数据保存在前端
  //app.get('/good/pay',Customer.showGoodPay)//商品支付 数据保存在前端
  app.post('/good/like/post',multipartMiddleware,Customer.goodLikePost)//商品收藏  点击提交goodid 用户id save goodlike集合
  app.post('/good/like/del',Customer.goodLikeDel)//移除收藏  拿到goodid 用户id del goodlike
  app.post('/good/pay/post',multipartMiddleware,Customer.goodPayPost)//商品订单提交 数据提交save order集合
  //app.get('/good/map/:id',Customer.showGoodMap)//地图导航  拿到商品id查询商品集合 city 和 address

  app.post('/strategy/list',Customer.strategyList)//攻略列表 根据tag city 查找
  app.get('/strategy/list/:id',Customer.strategyDetail)//攻略详情 根据id查找
  app.post('/strategy/like/post',multipartMiddleware,Customer.strategyLikePost)//攻略收藏  点击提交 用户id strategyid
  app.post('/strategy/like/del',Customer.strategyLikeDel)//移除收藏  拿到strategyid 用户id del strategylike
  //app.get('/strategy/map/:id',Customer.showStrategyMap)//地图导航 拿到攻略id查询攻略集合 city 和 address

  //app.get('/userinfo',Customer.showUserInfo)
  app.get('/user/like/:id',Customer.showUserLike)//用户收藏 拿到用户id 查询goodlike strategylike集合
  app.get('/user/order/:id',Customer.showUserOrder)//用户订单 拿到用户id 查询order集合
  //app.post('/user/comment',multipartMiddleware,Customer.userCommentPost)//用户评价
}