angular.module('starter.controllers', ['pickadate'])

.controller('AppCtrl', function($rootScope,$scope,$state,$location,$stateParams,
Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like) {
	//跳转
	$scope.navigateTo = function(state){
		return $state.go(state);
	}
	
	//局部刷新
	// $scope.$on('$ionicView.beforeEnter',function(){
	// 	$scope.doRefresh()
	// })
})
.controller('AuthCtrl', function($rootScope,$scope,$state,$location,$stateParams,
Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like) {
	//注册
	$scope.signup = function(){
		console.log($scope.signuptell)
		console.log($scope.signuppass)

		Customer.signup({
			tell: $scope.signuptell,
			password: $scope.signuppass
		},function(data){
			console.log(data)
			if(data.msg==0){
				console.log('用户已注册')
				$location.path('/app/auth')
			}
			if(data.msg==1){
				console.log('注册成功')
				$location.path('/app/auth')
			}
		},function(data){
			console.log(data)
		})
	}
	//登录
	$scope.login = function(){
		Customer.login({
			tell: $scope.logintell,
			password: $scope.loginpass
		},function(data){
			if(data.msg==0){
				console.log('用户不存在 请注册')
				$location.path('/app/auth/signin')
			}
			if(data.msg==1){
				console.log('密码不正确')
				$scope.msg='密码不正确'
			}
			else{
				console.log(data)
				Storage.set('user',data)
				console.log(Storage.get('user'))
				$location.path('/app/index')
			}

		},function(data){
			console.log(data)
		})
	}

})
.controller('HomeCtrl',function($rootScope,$scope,$state,$location,$stateParams,$ionicLoading,
$cordovaGeolocation,Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like,Geolation){
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		//
		City.get(function(data){
			console.log(data)
			$scope.citys = data
		},function(data){
			console.log(data)
		})

		$scope.city ='去选择城市'
		var storageCity = Storage.get('selectcity')
		console.log(storageCity)
		//
		if(!storageCity || storageCity == null){
			console.log(111)
			var posOptions = {timeout: 3000, enableHighAccuracy: false};
			$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
				 var w  = position.coords.latitude//维度
				 var j = position.coords.longitude//经度
				 console.log(w)
				 console.log(j)
				 Geolation.getGeo(w,j,function(data){
				 	console.log(data)
				 	var _city = data.regeocode.addressComponent.city
			 		console.log('已获取定位城市')
				 	if(storageCity==_city){
				 		$scope.city = Storage.get('selectcity')
				 	}else{
				 		$scope.city = _city || '去选择城市'
				 	}
				 },function(data){
				 	console.log(data)
				 })
			}, function(err) {
			 console.log(err)
			 console.log('获取位置不成功')
			 $scope.city = storageCity || '去选择城市'
			})
		}else{
			$scope.city = storageCity
		}
	}
	$scope.load()
	$ionicLoading.hide()

	//选择城市
	$scope.selectCity = function($index){
		Storage.set('selectcity',$scope.citys[$index])
		$scope.newcity = $scope.citys[$index]
		console.log($scope.newcity)
		if($scope.newcity != $scope.city){
			$scope.city = $scope.newcity
			$location.path('/app/index')
		}else if($scope.newcity == $scope.city){
			$location.path('/app/index')
		}
	}
	//跳转
	$scope.toGoods = function(tag){
		$location.path('/app/goods/'+tag)
	}
	$scope.toSrtategys = function(tag){
		$location.path('/app/strategys/'+tag)
	}
	$scope.toCity = function(state){
		return $state.go(state);
	}
})

.controller('UserCtrl', function($rootScope,$scope,$state,$location,$stateParams,
Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like) {
	//初始化
	$scope.load = function(){
		var key = 'user'
		$scope.user=angular.fromJson(Storage.get(key))
		console.log($scope.user)
	}
	$scope.load()

	//登出
	$scope.toLogout = function(){
		$scope.user = null
		Customer.logout(function(){
			Storage.remove('user')
			Storage.remove('selectcity')
			$location.path('/app/auth')
			console.log('登出',$scope.user)
		})
		console.log($scope.user)
	}
})

.controller('OrdersCtrl',function($rootScope,$scope,$state,$location,$stateParams,
$ionicLoading,Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope._user = angular.fromJson(Storage.get('user'))
		console.log($scope._user._id)
		Order.get($scope._user._id,function(data){
			console.log(data)
			$scope.orders = data
		},function(data){
			console.log(data)
		})
	}
	$scope.load()
	$ionicLoading.hide()
})

.controller('LikesCtrl',function($rootScope,$scope,$state,$location,$stateParams,
$ionicLoading,Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope._user = angular.fromJson(Storage.get('user'))
		console.log($scope._user._id)
		Like.get($scope._user._id,function(data){
			console.log(data)
			$scope.goodlikes = data.goodLikes
			$scope.strategylikes = data.strategyLikes
		},function(data){
			console.log(data)
		})
	}
	$scope.load()
	$ionicLoading.hide()
	//跳转
	$scope.goDetail = function(type,tag,id){
		console.log(type)
		console.log(tag)
		console.log(id)
		var url = '/app/'+type+'/'+tag+'/'+id
		console.log(url)
		$location.path(url)
	}
})

.controller('GoodsCtrl', function($rootScope,$scope,$state,$location,$ionicModal,
$stateParams,$location,$document,$ionicLoading,Storage,Customer,Good,Strategy,Goodlike,Strategylike,
Order,City,Like) {
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope.tag = $stateParams.tag
		$scope.city = Storage.get('selectcity')
		Good.goods({
			tag:$scope.tag,
			city:$scope.city
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.goods=0
			}else{
				$scope.goods = data
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.goods = 0
				console.log($scope.goods)
			}
		})
	}
	$scope.load()
	$ionicLoading.hide()
	//跳转
	$scope.showDetail = function(id){
 		$scope.id = id
		$location.path('/app/goods/'+$scope.tag+'/'+$scope.id)
   	}
})
.controller('GoodCtrl', function($rootScope,$scope,$state,$filter,$location,$ionicModal,
$stateParams,$location,$document,$ionicLoading,Storage,Customer,Good,Strategy,Goodlike,Strategylike,
Order,City,Like) {
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope._user = angular.fromJson(Storage.get('user'))
		console.log($scope._user._id)

		$scope.id = $stateParams.id
		Good.good($scope.id,function(data){
			console.log('good',data)
			$scope.good = data
			$scope.includes = $scope.make($scope.good.include)
			$scope.useInfos = $scope.make($scope.good.useInfo)
			$scope.buyInfos = $scope.make($scope.good.buyInfo)
			$scope.count = $scope.good.buyNum
			Storage.set('address',$scope.good.address)
			console.log($scope.includes)

			var key = $scope.good._id
			if(Storage.get(key)){
				$scope.trun = false
			}else{
				$scope.trun = true
			}

		},function(data){
			conosle.log(data)
		})
	}
	$scope.load()
	$ionicLoading.hide()
	//工具
	$scope.make = function(str){
			var arr = []
		if(str.indexOf('&') != -1){
			return str.split('&')
		}else{
			arr.push(str)
			console.log(arr)
			return arr
		}
	}
	//日期弹窗
	$ionicModal.fromTemplateUrl('templates/good/datepiker.html',
	    function(modal) {
	        $scope.datemodal = modal;
	    },{
	    scope: $scope,
	    animation: 'slide-in-up'
	    }
	)
	$scope.opendateModal = function() {
	  $scope.datemodal.show();
	}
	$scope.closedateModal = function(modal) {
	  $scope.datemodal.hide();
	  $scope.datepicker = modal;
	}
	//减
	$scope.reduce = function(){
		if($scope.count != 0){
			$scope.count--
			console.log($scope.count)
		}
	}
	//加
	$scope.add = function(){
		$scope.count++
	}
	//保存订单填写
	$scope.save = function(username,usertell,userremark,datepicker){
		console.log(username)
		console.log(usertell)
		console.log(userremark)
		console.log($scope.count)
		console.log(datepicker)
		if(username && usertell && userremark && $scope.count && datepicker){

			Storage.set('order',{
				title: $scope.good.title,
				name: $scope.good.name,
				address: $scope.good.address,
				tell: $scope.good.tell,
				goodId: $scope.good._id,
				customerId: $scope._user._id,
				sumPrice: $scope.count*$scope.good.priceA,
				price: $scope.good.priceA,
				username: username,
				usertell: usertell,
				remark: userremark,
				count: $scope.count,
				date: datepicker
			})
			$state.go('app.goods.good.buyinfo.ordersubmit.pay')
		}else{
			console.log('请选择')
		}
	}

	//收藏
	$scope.like = function(){
		Goodlike.save({
			userId: $scope._user._id,
			goodId: $scope.good._id
		},function(data){
			console.log('like',data)
			if(data.msg==1){
				$scope.trun = false
				var key = $scope.good._id
				Storage.set(key,$scope.good._id)
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.trun = true
			}
		})
	}
	//取消
	$scope.unlike = function(){
		Goodlike.del({
			userId: $scope._user._id,
			goodId: $scope.good._id
		},function(data){
			console.log('unlike',data)
			if(data.msg==1){
				var key = $scope.good._id
				Storage.remove(key)
				$scope.trun = true
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.trun = false
			}
		})
	}
})
.controller('PayCtrl',function($rootScope,$scope,$state,$location,$stateParams,$ionicLoading,
$document, $cordovaKeyboard,Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	// $cordovaKeyboard.hideAccessoryBar(true)
	// $cordovaKeyboard.disableScroll(true)
	// $cordovaKeyboard.close()
	// var isVisible = $cordovaKeyboard.isVisible()
	//初始化
	$scope.load = function(){
		$ionicLoading.show({
      		template: 'Loading...'
   		})
		$scope.order = angular.fromJson(Storage.get('order'))
		console.log($scope.order)
	}
	$scope.load()
	$ionicLoading.hide()
	//跳转
	$scope.toOrderSubmit = function(state){
		Storage.remove('order')
		$state.go(state)
	}
	//提交
	$scope.pay = function(){
		Order.save({order:$scope.order},function(data){
			console.log(data)
			if(data.msg==1){
				console.log('保存成功')
				Storage.remove('order')
				$state.go('app.index')
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				console.log('保存失败')
			}
		})
	}
})
.controller('StrategysCtrl',function($rootScope,$scope,$state,$location,$stateParams,
$document,$ionicLoading,Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	//初始化
	$scope.load = function(){
		$scope.tag = $stateParams.tag
		$scope.city = Storage.get('selectcity')
		console.log($scope.city)
		Strategy.strategys({
			tag: $scope.tag,
			city: $scope.city
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.strategys=0
			}else{
				$scope.strategys = data
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.strategys = 0
			}
		})
	}
	$scope.load()
	//跳转
	$scope.showDetail = function(id){
		$scope.id = id
		$location.path('/app/strategys/'+$scope.tag+'/'+$scope.id)
	}
})
.controller('StrategyCtrl', function($scope,$state,$stateParams,$document,$ionicLoading,
Storage,Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like) {
	//初始化
	$scope.load = function(){
		$scope.id = $stateParams.id

		$scope._user = angular.fromJson(Storage.get('user'))
		console.log($scope._user._id)

		Strategy.strategy($scope.id,function(data){
			console.log(data)
			$scope.strategy = data

			var key = $scope.strategy._id
			if(Storage.get(key)){
				$scope.trun = false
			}else{
				$scope.trun = true
			}

			Storage.set('address',$scope.strategy.address)
		},function(data){
			console.log(data)
		})
	}
	$scope.load()
	//收藏
	$scope.like = function(){
		Strategylike.save({
			userId: $scope._user._id,
			strategyId: $scope.strategy._id
		},function(data){
			console.log('like',data)
			if(data.msg==1){
				$scope.trun = false
				var key = $scope.strategy._id
				Storage.set(key,$scope.strategy._id)
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.trun = true
			}
		})
	}
	//取消
	$scope.unlike = function(){
		Strategylike.del({
			userId: $scope._user._id,
			strategyId: $scope.strategy._id
		},function(data){
			console.log('unlike',data)
			if(data.msg==1){
				var key = $scope.strategy._id
				Storage.remove(key)
				$scope.trun = true
			}
		},function(data){
			console.log(data)
			if(data.msg==0){
				$scope.trun = false
			}
		})
	}
})
.controller('GMapCtrl',function($scope,$state,$document,$ionicLoading,Storage,
Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	//初始化
	$scope.load=function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope.city = Storage.get('selectcity')
		$scope.address = Storage.get('address')
		console.log($scope.city)
		console.log($scope.address)

		var p = document.createElement('p')
		p.id='city'
		p.innerHTML = $scope.city
        $document[0].body.appendChild(p)

        var span = document.createElement('span')
		span.id='point'
		span.innerHTML = $scope.address
        $document[0].body.appendChild(span)

		var script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "js/map.js";
        $document[0].body.appendChild(script)
    }
    $scope.load()
    $ionicLoading.hide()
    //跳转
    $scope.navigateTo = function(state){
		var city=document.getElementById('city')
		var point=document.getElementById('point')
		if(city || point){
			$document[0].body.removeChild(city)
			$document[0].body.removeChild(point)
		}
		return $state.go(state)
	}
})
.controller('SMapCtrl',function($scope,$state,$document,$ionicLoading,Storage,
Customer,Good,Strategy,Goodlike,Strategylike,Order,City,Like){
	//初始化
	$scope.load=function(){
		$ionicLoading.show({
      		template: 'Loading...'
    	})
		$scope.city = Storage.get('selectcity')
		$scope.address = Storage.get('address')
		console.log($scope.city)
		console.log($scope.address)

		var p = document.createElement('p')
		p.id='city'
		p.innerHTML = $scope.city
        $document[0].body.appendChild(p)

        var span = document.createElement('span')
		span.id='point'
		span.innerHTML = $scope.address
        $document[0].body.appendChild(span)

		var script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "js/map.js";
        $document[0].body.appendChild(script)
    }
    $scope.load()
    $ionicLoading.hide()
    //跳转
    $scope.navigateTo = function(state){
		var city=document.getElementById('city')
		var point=document.getElementById('point')
		if(city || point){
			$document[0].body.removeChild(city)
			$document[0].body.removeChild(point)
			return $state.go(state)
		}else{
			return $state.go(state)
		}
	}
});
