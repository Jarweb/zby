/*
	套餐说明 购买规则 成功跳转刷新填写页面
 */
$(document).ready(function() {
	$('.summernote').summernote({
		height:440,
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
			url: '/manager/good/poster/post',
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
		var subTitle = $('#inputSubtitle').val()
		var address = $('#inputAddress').val()
		var tell = $('#inputTell').val()
		var name = $('#inputName').val()
		var priceA = $('#inputPriceA').val()
		var priceB = $('#inputPriceB').val()
		var bed = $("input[name='bed']:checked").val()
		var goodTotal = $('#inputGoodTotal').val()
		var include = $('#inputInclude').val()
		var buyInfo = $('#inputBuyinfo').val()
		var useInfo = $('#inputUseinfo').val()
		var detail = $('.summernote').summernote('code')

		var _good = {
			city: city,
			tag: tag,
			title: title,
			subTitle: subTitle,
			address: address,
			tell: tell,
			name: name,
			priceA: priceA,
			priceB: priceB,
			bed: bed,
			goodTotal: goodTotal,
			include: include,
			buyInfo: buyInfo,
			useInfo: useInfo,
			detail: detail
		}
		console.log(_good)
		$.ajax({
			type: 'POST',
			url: '/manager/good/post',
			async: false,
			data: _good
		}).success(function(data){
			// if(data.msg === 1){
			// 	window.location.href('http://127.0.0.1:3001/manager/good/submit')//刷新填写页面
			// }
		}).error(function(data){
			if(data.msg === 0){
				alert('提交不成功')
			}
		})
	})
})

