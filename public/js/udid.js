var YDID = (function () {
	var allStatus = ['login', 'welcome', 'wait_start', 'playing'],
		allScreen = ['#input_info', '#welcome_into_game', '#reciprocal', '#container'],
		udid = {
			status: 'login',
			changeStatus: function(newStatus){
				if(allStatus.indexOf(newStatus) !== -1){
					this.status = newStatus;
					changeScreen(newStatus);
					this.listen();
				} else {
					console.log('change status to ' + newStatus + ' not current');
				}
			},
			registName: function(name, callback){
				var len = name.trim().length;
				this.registName.callback = callback;
				if( len > 0 && len <= 20 ){
					this.socket.emit('regUser', name.trim());
				} else {
					alert('暱稱請輸入 1~20 個字');
				}
			},
			listen: function(){
				var status = this.status,
					socket = this.socket;
				
				switch(status){
					case 'login':
						useListener('userChecked');
						socket.on('userChecked', function(data){
							udid.registName.callback(data);
						});
						break;
					case 'welcome':
						break;
					case 'wait_start':
						break;
					case 'playing':
						break;
					default:
						useListener(); //等於清除所有 listener
						break;
				}
			}
		};
	
	udid.socket = io();
	
	//使用 listener 前先註冊
	function useListener(lisName){
		var lisList = useListener.allListeners,
			lisNameList = [], 
			socket = useListener.socket, len = 0, i;
	
		if(typeof(lisName) === 'string'){
			lisNameList.push(lisName);
		}else{
			lisNameList = lisName;
		}
		
		len = lisNameList.length;
		for( i=0 ; i<len ; i+=1){
			if(lisList.indexOf(lisNameList[i]) === -1){
				lisList.push(lisNameList[i]);
			}
		}
		
		len = lisList.length;
		for( i=0 ; i<len ; i+=1 ){
			socket.removeAllListeners(lisList[i]);
		}
	}
	useListener.allListeners = [];
	useListener.socket = udid.socket;
	
	//切換場景
	function changeScreen(status){
		var index = allStatus.indexOf(status);
		if(index !== -1){
			$(changeScreen.allSelector).hide();
			$(allScreen[index]).show();
		}
	}
	changeScreen.allSelector = allScreen.join(', ');
	
	return udid;
}());