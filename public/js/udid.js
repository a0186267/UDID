var YDID = (function () {
	var allStatus = ['login', 'playing', 'over'],
		udid = {
			status: 'login',
			changeStatus: function(newStatus){
				if(allStatus.indexOf(newStatus) !== -1){
					this.status = newStatus;
				} else {
					console.log('change status to ' + newStatus + ' not current');
				}
			},
			registName: function(name){
				var len = name.trim().length;
				if( len > 0 && len <= 20 ){
					this.socket.emit('regUser', name.trim());
				} else {
					alert('暱稱請輸入 1~20 個字');
				}
			}
		};
	udid.socket = io();
	
	return udid;
}());