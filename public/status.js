
$(window).load(function(){
	$(".endpoint").each(function() {
		var node = $(this);
		var id = $(this).attr('id');
		var url = $(this).text();
		$.get(url).then(function(a, b) {
			console.log(url+' '+b);
		})
		.done(function (data) { node.css('color', 'green'); })
		.fail(function (data) { node.css('color', 'red'); });
	});
});