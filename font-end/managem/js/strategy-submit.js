/*
	成功跳转刷新填写页面
 */
$(document).ready(function() {
	$('.summernote').summernote({
		height:430,
		minHeight:null,
		maxHeight:null,
		codemirror: {
	          mode: 'text/html',
	          htmlMode: true,
	          lineNumbers: true
	        }
	})

	$('.save').bind('click',function(){
		var poster = new FormData($('#uploadForm')[0])
		$.ajax({
			url: '/manager/strategy/poster/post',
			type:'POST',
			data: poster,
			async: false,
			contentType: false,
			processData: false,
			success: function(data){
				console.log(data.msg)
				if(data.msg === 1){
					$('.save').html('上传成功')
				}
			},
			error: function(data){
				if(data.msg === 0){
					$('.save').html('上传不成功')
				}
			}
		})
	})

	$('.submit').bind('click',function(){
		var city = $('#inputCity').val()
		var tag = $("input[name='tag']:checked").val()
		var title = $('#inputTitle').val()
		var address = $('#inputAddress').val()
		var tell = $('#inputTell').val()
		var price = $('#inputPrice').val()
		var time = $('#inputTime').val()
		var detail = $('.summernote').summernote('code')

		var _strategy = {
			city: city,
			tag: tag,
			title: title,
			address: address,
			tell: tell,
			price: price,
			time: time,
			detail: detail
		}
		console.log(_strategy)
		// var strategy = JSON.stringify(_strategy) 为什么不用？
		$.ajax({
			type:'POST',
			url:'/manager/strategy/post',
			async:false,
			data: _strategy
		}).success(function(data){
			// if(data.msg === 1){
			// 	console.log('')
			// 	// window.location.href('http://127.0.0.1:3001/manager/strategy/submit')//刷新填写页面
			// }
		}).error(function(data){
			console.log(error)
			if(data.msg === 0){
				alert('提交不成功')
			}
		})
	})
})

