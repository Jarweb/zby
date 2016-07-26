angular.module('starter.services', [])

.factory('Storage', function($window){
  var set = function(key, value){
    $window.localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value);
  };
  var get = function(key){
    return $window.localStorage.getItem(key) || null;
  };
  var remove = function(key){
    $window.localStorage.removeItem(key);
  };
  return {
    set: set,
    get: get,
    remove: remove
  }
})

.factory('Geolation',function($http){
  var api = 'http://restapi.amap.com/v3/geocode/regeo?output=xml&location='
  var options = '&key=8b175be7186404948092d82510546d27&radius=1000&extensions=all&batch=false&roadlevel=1'
  var getGeo = function(w,j,success,err){
    $http.get(api+w+','+j+options).success(success).error(err)
  }

  return {
    getGeo:getGeo
  }
})

.factory('Customer', function($http,Storage) {
  var api ='http://192.168.191.1:3001';
  //注册 得到customer 和token 保存
  var signup = function(data,success,err){
    $http.post(api+'/user/signup/post',data).success(success).error(err)
  }
  //登录 得到customer 和token
  var login = function(data,success,err){
    $http.post(api+'/user/login/post',data).success(success).error(err)
  }
  //登出 删除本地 跳转到登录 删除当前用户 /user/logout
  var logout = function(success){
    success()
  }

  return {
    signup: signup,
    login: login,
    logout: logout
  }
})

.factory('Good',function($http){
  var api = 'http://192.168.191.1:3001'
  //获取goods 通过tag city
  var goods = function(data,success,err){
    $http.post(api+'/good/list',data).success(success).error(err)
  }
  //获取good 通过id
  var good = function(data,success,err){
    $http.get(api+'/good/list/'+data).success(success).error(err)
  }

  return {
    goods: goods,
    good: good
  }

})

.factory('Strategy',function($http){
  var api = 'http://192.168.191.1:3001'
  //strategys 通过tag city
  var strategys = function(data,success,err){
    $http.post(api+'/strategy/list',data).success(success).error(err)
  }
  //strategy 通过id
  var strategy = function(data,success,err){
    $http.get(api+'/strategy/list/'+data).success(success).error(err)
  }

  return {
    strategys: strategys,
    strategy: strategy
  }
})

.factory('Goodlike',function($http){
  var api = "http://192.168.191.1:3001"
  //提交goodlike 通过goodid customerid 拿到goodlikeid
  var save = function(data,success,err){
    $http.post(api+'/good/like/post',data).success(success).error(err)
  }
  //删除goodlike 通过 goodlikeid
  var del = function(data,success,err){
    $http.post(api+'/good/like/del',data).success(success).error(err)
  }

  return {
    save: save,
    del: del
  }
})

.factory('Strategylike',function($http){
  var api = "http://192.168.191.1:3001"
  //提交strategylike 通过strategyid strategyid 拿到strategylikeid
  var save = function(data,success,err){
    $http.post(api+'/strategy/like/post',data).success(success).error(err)
  }
  //删除strategylike 通过 strategylikeid
  var del = function(data,success,err){
    $http.post(api+'/strategy/like/del',data).success(success).error(err)
  }

  return {
    save: save,
    del: del
  }
})

.factory('Like',function($http){
  var api = "http://192.168.191.1:3001"
  //获取goodlikes strategylikes 通过customerid
  var get = function(data,success,err){
    $http.get(api+'/user/like/'+data).success(success).error(err)
  }

  return {
    get:get
  }
})

.factory('Order',function($http){
  var api = "http://192.168.191.1:3001"
  //保存order
  var save = function(data,success,err){
    $http.post(api+'/good/pay/post',data).success(success).error(err)
  }
  //获取orders 通过customerid
  var get = function(data,success,err){
    $http.get(api+'/user/order/'+data).success(success).error(err)
  }

  return {
    save: save,
    get: get
  }
})

.factory('City',function($http){
  var api = "http://192.168.191.1:3001"
  //获取citys 没有参数 直接通过good模型搜索
  var get = function(success,err){
    $http.get(api+'/city').success(success).error(err)
  }

  return {
    get: get
  }
})