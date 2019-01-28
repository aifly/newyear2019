﻿var imgs = {
  logo: "./assets/images/logo.png",
  point: "./assets/images/point.png",
  sure: "./assets/images/sure.png",
  prize: "./assets/images/prize.png",
  arrow: "./assets/images/arrow.png",
  open: "./assets/images/open.png",
  qrcode: "./assets/images/qrcode1.png",
  index: "./assets/images/index.jpg",
  teamBtn:'./assets/images/team-btn.png',
  back:'./assets/images/back.png',
  player:'./assets/images/player1.png',
  team:"./assets/images/team.jpg",
  mask: "./assets/images/mask-1.jpg",
  index1: "./assets/images/index1.jpg",
  createBg:'./assets/images/create-bg.jpg',
  index2: "./assets/images/index2.jpg",
  loading: "./assets/images/loading.gif",
  wish: "./assets/images/wish.jpg",
  gif1: "./assets/images/caishen-1.gif",
  gif2: "./assets/images/change-1.gif",
  gif3: "./assets/images/menshen-1.gif",
  gif4: "./assets/images/nuozha-1.gif",
  gif5: "./assets/images/sunwukong-1.gif",
  gif6: "./assets/images/tuotatianwang-1.gif",
  gif7: "./assets/images/wushi-1.gif",
  gif8: "./assets/images/zhongkui-1.gif",
  gif9: "./assets/images/zhubajie-1.gif",
  img1: "./assets/images/caishen-1.jpg",
  img2: "./assets/images/change-1.jpg",
  img3: "./assets/images/menshen-1.jpg",
  img4: "./assets/images/nuozha-1.jpg",
  img5: "./assets/images/sunwukong-1.jpg",
  img6: "./assets/images/litianwang-1.jpg",
  img7: "./assets/images/wushi-1.jpg",
  img8: "./assets/images/zhongkui-1.jpg",
  img9: "./assets/images/zhubajie-1.jpg",
  okBtn:'./assets/images/ok-btn.png',
  cancelBtn:'./assets/images/cancel-btn.png'
};


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}


window.config = {
  indexvideo:'./assets/video/index3.mp4',
  indexvideo1:'./assets/video/index3.mp4',
  baseUrl: "https://xlive.xinhuaapp.com",
  secretKey: "e9469538b0623783f38c585821459454",
  wishes:[
    {
      wish: '祝福语新年快乐祝福语新年快乐祝福语新年快乐祝福语新年快乐祝福语新年快乐1'
    },
    {
      wish: '祝福语财源滚滚财源滚滚财源滚滚财源滚滚财源滚滚财源滚滚财源滚滚财源滚滚2'
    },
    {
      wish: '祝福语开门大吉开门大吉开门大吉开门大吉开门大吉开门大吉开门大吉开门大吉3'
    },
    {
      wish: '祝福语百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐4'
    },
    {
      wish: '祝福语年年有鱼年年有鱼年年有鱼年年有鱼年年有鱼年年有鱼年年有鱼年年有鱼5'
    },
    {
      wish: '祝福语恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财6'
    },
    {
      wish: '祝福语财源广进财源广进财源广进财源广进财源广进财源广进财源广进财源广进7'
    },
    {
      wish: '祝福语一生平安一生平安一生平安一生平安一生平安一生平安一生平安一生平安8'
    },
    {
      wish: '祝福语事事顺心事事顺心事事顺心事事顺心事事顺心事事顺心事事顺心事事顺心9'
    },
    
  ]
};
 
var musics = {
	music: {
		src: './assets/music/bg.mp3',
		autoplay: false,
		name: 'bg2',
		loop: true
	}
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();