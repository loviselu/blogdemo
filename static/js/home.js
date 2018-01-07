$(function () {

	var template = ejs.compile($("#post-tmpl").html())

	//加载博客列表
	$.ajax({
		url:'/api/blog'
	}).done(function(d){
		if(d.code === 0){
			console.log(d)
			for(var i=0;i<d.data.length;i++){
				$("#j-list-wrap").append(template({
					id:d.data[i].id,
					title:d.data[i].title,
					content:d.data[i].content,
					date:new Date(d.data[i].createdAt)
				}))
			}
		}
	})

})
