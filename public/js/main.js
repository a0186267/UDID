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

function countdown_by_secs( secs ){
	for (var i = secs ; i >= 0; i--) {
		window.setTimeout("doUpdate(" + i + ")", (secs - i) * 1000);
	}
} 
function doUpdate(num) {
	var number = num;
	if( parseInt(num) < 10 && parseInt(num) != 0){ 
		number = "0"+num ;
	}
	$('.countdown').html(number);
}