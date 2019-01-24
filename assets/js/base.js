﻿var imgs = {
	logo: './assets/images/logo.png',
	point: './assets/images/point.png',
	wish: './assets/images/wish.jpg',
  gif1:'./assets/images/1.gif',
  index:"./assets/images/index.jpg",
  loading:'./assets/images/loading.gif',
  gif2:'./assets/images/2.gif',
  gif3:'./assets/images/3.gif',
  gif4:'./assets/images/4.gif',
  gif5:'./assets/images/5.gif',
  gif6:'./assets/images/6.gif',
  gif7:'./assets/images/7.gif',
  gif8:'./assets/images/8.gif',
  gif9:'./assets/images/9.gif',
  img1: './assets/images/1.jpg',
  img2: './assets/images/2.jpg',
  img3: './assets/images/3.jpg',
  img4: './assets/images/4.jpg',
  img5: './assets/images/5.jpg',
  img6: './assets/images/6.jpg',
  img7: './assets/images/7.jpg',
  img8: './assets/images/8.jpg',
  img9: './assets/images/9.jpg',
}


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}


window.config = {
  indexvideo:'./assets/video/index.mp4',
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
		src: './assets/music/bg5.mp3',
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