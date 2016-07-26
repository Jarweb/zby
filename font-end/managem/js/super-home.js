$(function(){
	$('.del').click(function(e) {
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)
		console.log(id,tr)
		$.ajax({
			type:'DELETE',
			url:'/super/manager/del?id='+id
		})
		.done(function(results){
			console.log(results)
			if(results.msg === 1){
				console.log(tr.length)
				if(tr.length>0){
					tr.remove()
				}
			}
		})
	})
})