$(function () {

    var search = {};
	(location.search + location.hash || '').replace(/([^?=&#]+)=([^?&#]*)/gi,function($0,k,v){
		search[k] = decodeURIComponent(v || '');	//统一强制decode
	});


	//加载博客列表
	$.ajax({
		url:'/api/blog?id='+search.id
	}).done(function(d){
		if(d.code === 0){
            console.log(d)
            $("#j-title").html(d.data.title);
            $("#j-content").html(d.data.content);
		}
	})

})
