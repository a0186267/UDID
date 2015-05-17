$(".my_name").keydown(function (event) {
	if (event.which == 13) {
		YDID.registName($('#nick_name_textbar').val(), function(finalName){
			$("#input_info").hide();
			$('#welcome_into_game').show();
			$('.my_name').off('keydown');
			$('#my_name').text(finalName);
		});
	}
});

$("#is_ready").on('click', function () {
	$("#welcome_into_game").hide();
	$('#reciprocal').show();
});

$(document).ready(function(){
	YDID.changeStatus('login');
});