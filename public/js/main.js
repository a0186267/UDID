$(".my_name").keydown(function (event) {
	if (event.which == 13) {
		YDID.registName($('#nick_name_textbar').val(), function(finalName){
			YDID.changeStatus('welcome');
			$('.my_name').off('keydown');
			$('#my_name').text(finalName);
		});
		console.log('input_nickname_click');
	}
});
$("#is_ready").on('click', function () {
	$("#welcome_into_game").hide();
	$('#reciprocal').show();
	console.log('is_ready_click');
	
});

$(document).ready(function () {
	YDID.changeStatus('login');
});

function countdown_by_secs(secs) {
	for (var i = secs; i >= 0; i--) {
		window.setTimeout("doUpdate(" + i + ")", (secs - i) * 1000);
	}
}
function doUpdate(num) {
	var number = num;
	if (parseInt(num) < 10 && parseInt(num) != 0) {
		number = "0" + num;
	}
	$('.countdown').html(number);
}
