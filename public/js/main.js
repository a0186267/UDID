function test() {
	console.log('test');
}

/**
 $(document).ready(function(){
 var height = document.body.scrollHeight-70;
 var height = $('.container').height;
 $('.bubble_container').animate({
 height:height
 },1000);
 });
 **/
$(".my_name").keydown(function (event) {
	if (event.which == 13) {
		// sent to server the nickname
		$("#input_info").hide();
		$('#welcome_into_game').show();
	}
});

$("#is_ready").on('click', function () {
	$("#welcome_into_game").hide();
	$('#reciprocal').show();

}); 