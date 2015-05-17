var http = require('http');
var fs = require('fs');
var config = require('./lib/config');
var ci = require('./lib/clientInfo');

var handleRequest = function (request, response) {
	var timeStart = new Date().getTime(),
		timeCost = 0;
	switch (request.url) {
		case '/':
		case '/index':
			fs.createReadStream('./webroot/index.html').pipe(response);
			break;
		case '/socketio':
			//fs.createReadStream('./webroot/index.html').pipe(response);
		    break;
		default:
			if (request.url.indexOf('/public') === 0) {
				fs.createReadStream('.' + request.url).pipe(response);
			} else {
				fs.createReadStream('./webroot/index.html').pipe(response);
			};
			break;
	}
	timeCost = new Date().getTime() - timeStart;
	console.log(ci.getClientAddress(request), timeCost + 'ms', request.url);
};

var server = http.createServer(handleRequest);
var io = require('socket.io').listen(server);
/////////////////////////////////////////////////////////
  var userList = new Object();
  io.on('connection', function(socket){
    userList[socket.id] = "User";
    console.log('a user connected id:' + socket.id);
    socket.on('disconnect', function(){
    //移除離開的玩家
    console.log('user disconnected');
  });
  //登入暱稱
  socket.on('regUser', function(data){
    userList[socket.id] = data;
	socket.emit("userChecked",data);
    console.log(socket.id + '--login --> ' + data);
    //判斷是否有人已經在ready了，有的話建立房間物件
    //玩家1  >> 牌組/ 桌面2維 / 批號 1~20 (80)
    //玩家2  >> 牌組/ 桌面2維 / 批號 1~20 (80)
    //牌組 裡有的 不丟回來
    console.log(socket.id + '--ready --> ' + data);
    //準備配對
    if (Obj_ready.length > 0){ //表示已有人在等待
    console.log(socket.id + "1-----> ")
      var card =  shuffle(English); //洗好的牌
      //把雙方玩家拉進房號
      var roomNum = "R" + RM(9999); //亂數房號
      var user1 = new Object();
      var user2 = new Object();
      user1.id = socket.id;
      user1.all = card.slice(0, 99);
      user1.show = new Array();
      user1.num = 0;
      user1.kill=0;
      user2.id = Obj_ready.shift();//移除並取出第一個值
      console.log(socket.id + "2------> " + user2.id)
      user2.all = card.slice(100, 199);
      user2.show = new Array();
      user2.num = 0;
      user2.kill=0;
      //回傳 配發房號 / 雙方暱稱
      Obj_room[roomNum]= { user1:user1 , user2:user2 };
	    //###
      socket.emit("ReadyGo", JSON.stringify({roomNum:roomNum,me:userList[user1.id],other:userList[user2.id]}));
      //socket(user2.id).emit("Start", JSON.stringify({roomNum:roomNum,me:userList[user2.id],other:userList[user1.id]}));
    }else{ //表示沒有人在
      //      
      //登記等待他人
      Obj_ready.push(socket.id);
    }
  //    
  });
  //  
  //遊戲進行
    var runloop = setInterval(function(){
        for(var key in Obj_room){ 
          var room = Obj_room[key];
          //算位置
          room.user1.show.push( room.user1.all.slice(room.user1.num * 4 , room.user1.num * 4 + 3 ));
          room.user1.num = room.user1.num +1;
          room.user2.show.push( room.user2.all.slice(room.user2.num * 4 , room.user2.num * 4 + 3 ));
          room.user2.num = room.user2.num +1;
          
          //輸的判斷
          if (room.user1.show.length >19){
            socket.emit("End",JSON.stringify({roomNum:room.roomNum,WIN:userList[room.user2.id],LOSE:userList[room.user1.id]}));            
          }else if (room.user2.show.length >19){
            socket.emit("End",JSON.stringify({roomNum:room.roomNum,WIN:userList[room.user1.id],LOSE:userList[room.user2.id]}));
          };
//          
//          socket(room.user1.id).emit("Animant",JSON.stringify({tb1:room.user1.show,tb2:room.user2.show}));
//          socket(room.user2.id).emit("Animant",JSON.stringify({tb1:room.user1.show,tb2:room.user2.show}));
        };
	    } , 3000);
    //clearInterval(loop);
  
});


/////////////////////////////////////////////////////////
//公用物件區
  var Obj_ready = new Array();//
  var Obj_room = new Object();// 房間物件Obj_room[id]= nick
////////////////

//亂數  
function RM(n){
            return parseInt( Math.random()* n ) + 1;
        }              
//單字表    
  var English = "bar,catch,brain,cause,cut,base,brake,branch,dance,battle,brass,be,brave,dark,beat,bread,date,any,break,chain,breathe,day,act,brick,dead,bed,bridge,chance,deaf,brief,change,deal,add,bright,charge,dear,bring,chase,cheer,debt,bell,cheese,arm,brown,brush,bend,chest,deep,best,build,chief,child,art,choose,burn,church,age,as,big,burst,ash,bill,cook,ask,bus,cool,bird,claim,at,birth,but,clash,cork,aid,bite,clean,corn,aim,black,clear,air,blade,buy,cost,air,force,blame,by,climb,clock,count,bleed,call,close,blind,calm,cloth,court,block,cloud,all,blood,camp,coal,cow,blow,coast,crash,blue,can,coat,detail,board,boat,cold,body,crew,bomb,crime,die,bone,diet,back,book,car,bad,card,dig,bag,born,care,crush,come,cry,ball,both,cup,case,cure,dirt,and,ban,box,cash,bank,boy,cat,angle,boycott,communicate,custom,able,angry,barrier,community,about,animal,celebrate,company,damage,above,anniversary,basket,center,compare,accept,announce,century,compete,danger,accident,another,ceremony,complete,account,answer,certain,complex,accuse,beautiful,compromise,daughter,across,apologize,because,chairman,computer,appeal,become,champion,concern,activist,appear,condemn,actor,apple,before,condition,appoint,begin,conference,administration,approve,behind,confirm".split(",");
                
//洗牌機
function shuffle(o){
    for(var j, x, i = o.length; i;){
        j = Math.floor(Math.random() * i);
        // javascript的array是0-base
        // 所以迴圈第一次進入，--i後表示陣列最後一個位置。
        x = o[--i];
        o[i] = o[j]; 
        o[j] = x;
        // 以上三行代表以x為temp, o[i], o[j]做交換
    } 
    return o; //回傳陣列，我一開始也看錯看成回傳0
};
///////////////////////////////////////////////
server.listen(config.port, 'localhost', function () {
	console.log('HTTP伺服器在 http://127.0.0.1:' + config.port + '/ 上運行');
});
