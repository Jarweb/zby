
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])


.run(function($ionicPlatform,$rootScope,$http,$location,$ionicLoading,Storage) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
    }

    if (navigator.connection) {
      var tmptypes = navigator.connection.type
      if (tmptypes.toUpperCase().indexOf('NONE') > -1 || tmptypes.toUpperCase().indexOf('UNKNOWN') > -1) {
          if (navigator.notification) {
              navigator.notification.confirm('您的设备未开启网络',
                 function (buttonIndex) {
                       if (buttonIndex == 1) {
                         if (cordova.plugins.settings) {
                             cordova.plugins.settings.openSetting("wifi",
                              function () { console.log("network setting openning"); },
                              function () { console.log("open network setting failed"); })
                          }
                        }
                  }, '提示',['开启', '取消'])
          }
      }
    }

    


    // navigator.splashscreen.hide();
  })

  document.addEventListener("deviceready", function () {
    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState
    })
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState
    })
  }, false)

  //监听
  // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //   // $ionicLoading.show({
  //   //   template: 'Loading...'
  //   // })
    if(Storage.get('user')){
      console.log(Storage.get('user'))
      $location.path("/app/index")
      event.preventDefault()
    }else if(!Storage.get('user')){
      console.log(Storage.get('user'))
      $location.path("/app/auth")
      event.preventDefault()
    }
  // })

  //监听
  // $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
  //   $ionicLoading.hide()
  // })


})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {

  // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization, Access-Control-Allow-Headers';
  // $httpProvider.interceptors.push('TokenInterceptor');
  // $ionicConfigProvider.views.maxCache(0)//全局清除缓存
  $ionicConfigProvider.scrolling.jsScrolling(false)
  $ionicConfigProvider.navBar.alignTitle('center')


  $stateProvider
  // 首页
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/layout.html',
    controller:'AppCtrl'
  })
  .state('app.index', {
    url: '/index',
    cache:false,
    views:{
      'content@app':{
        templateUrl: 'templates/app.html'
      }
    }
  })
  // 首次进入
  .state('app.index.firstcome', {
    url: 'firstcome',
    views: {
      'content@app': {
        templateUrl: 'templates/firstcome.html',
        controller: 'FirstcomeCtrl'
      }
    }
  })
  // 登录注册
  .state('app.auth', {
      url: '/auth',
      views: {
        'content@app': {
          templateUrl: 'templates/auth/login.html'
        }
      }
  })
  .state('app.auth.signin', {
    url: '/signin',
    views: {
      'content@app': {
        templateUrl: 'templates/auth/signin.html'
      }
    }
  })
  // 用户相关
  .state('app.user', {
    url: '/user',
    cache:false,
    views: {
      'content@app': {
        templateUrl: 'templates/user/user.html'
      }
    }
  })
  .state('app.user.order', {
    url: '/order',
    views: {
      'content@app': {
        templateUrl: 'templates/user/order.html'
      }
    }
  })
  .state('app.user.like', {
    url: '/like',
    views: {
      'content@app': {
        templateUrl: 'templates/user/like.html'
      }
    }
  })
  .state('app.user.logout', {
    url: '/logout',
    views: {
      'content@app': {
        templateUrl: 'templates/user/logout.html'
      }
    }
  })
  //城市页面
  .state('app.city', {
    url: '/city',
    views: {
      'content@app': {
        templateUrl: 'templates/city/city.html'
      }
    }
  })
  // 商品
  .state('app.goods', {
    url: '/goods/:tag',
    cache: false,
    views: {
      'content@app': {
        templateUrl: 'templates/good/goodlist.html'
      }
    }
  })
  .state('app.goods.good', {
    url: '/:id',
    views: {
      'content@app': {
        templateUrl: 'templates/good/gooddetail.html'
      }
    }
  })
  .state('app.goods.good.buyinfo', {
    url: '/buyinfo',
    views: {
      'content@app': {
        templateUrl: 'templates/good/buyinfo.html'
      }
    }
  })
  .state('app.goods.good.buyinfo.map', {
    url: '/gmap',
    views: {
      'content@app': {
        templateUrl: 'templates/city/gmap.html'
      }
    }
  })
  .state('app.goods.good.buyinfo.ordersubmit', {
    url: '/ordersubmit',
    views: {
      'content@app': {
        templateUrl: 'templates/good/ordersubmit.html'
      }
    }
  })
  .state('app.goods.good.buyinfo.ordersubmit.pay', {
    url: '/pay',
    views: {
      'content@app': {
        templateUrl: 'templates/good/pay.html'
      }
    }
  })
  // 攻略
  .state('app.strategys', {
    url: '/strategys/:tag',
    cache: false,
    views: {
      'content@app': {
        templateUrl: 'templates/strategy/strategylist.html'
      }
    }
  })
  .state('app.strategys.strategy', {
    url: '/:id',
    views: {
      'content@app': {
        templateUrl: 'templates/strategy/strategydetail.html'
      }
    }
  })
  .state('app.strategys.strategy.map', {
    url: '/smap',
    views: {
      'content@app': {
        templateUrl: 'templates/city/smap.html'
      }
    }
  })
  $urlRouterProvider.otherwise('/app/index');
});
