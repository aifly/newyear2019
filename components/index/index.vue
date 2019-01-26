<template>
	<transition name='index'>
		<div v-if='show' class="lt-full zmiti-index-main-ui " :style='{background:"url("+imgs.createBg+") no-repeat center",backgroundSize:"cover"}'>
			<div v-show='!cacheImg' ref='page' class='lt-full' style='background:#c51a00;'>
				<img :src="bg" alt="" class="zmiti-index-img" :class="{'active':currentStep>1}"  v-tap='[playVideo]'>
				<img :src="imgs.player" v-if='showPlayer' class='zmiti-player' alt="">
				<video x-webkit-airplay="true" webkit-playsinline="true" playsinline=""
				x5-video-player-type="h5" x5-video-player-fullscreen="true" 
				v-show='showVideo1' ref='video1'  :src="indexVideo"></video>
				<div class='zmiti-index-mask lt-full' v-show='showMask'>
					<div class='zmiti-index-mask-nickname'>{{nickname||'新华社网友'}}</div>
					<img :src="imgs.mask" alt="">
					<div class='zmiti-open' v-tap='[next]'>
						<img :src="imgs.open" alt="">
					</div>
				</div>
				<div v-if='showBitmapBtns' class='zmiti-btns'>
					<div v-tap='[restart]'>
						<img :src="imgs.cancelBtn" alt="">
						<div >重玩一次</div>
					</div>
					<div v-tap='[choose]'>
						<img :src="imgs.okBtn" alt="">
						<div>确定</div>
					</div>
				</div>
				<div class='zmiti-nickname' v-if='showNickname' >
					<svg v-if='false' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
						<defs>
							<path id='p1' d="M 0 155 q 130 -160 300 0" stroke="blue" stroke-width="5" fill="none" />
						</defs>
						<text  text-anchor = "middle" >
							<textPath startOffset="50%" fill='#fff' xlink:href='#p1'>中华人民共和国</textPath>
						</text>
					</svg>
					{{nickname||'新华社网友'}}
				</div>
				<div class='zmiti-change-btn' v-if='showChangeBtn' @touchstart='touchstart' @touchend='touchend'>
					<img :src="imgs.okBtn" alt="" @touchstart='imgStart'>
					<div>长按替换对联</div>
				</div>
				<div class='zmiti-qrcode' v-if='showQrcode'>
					<img :src="imgs.qrcode" alt="">
				</div>
			</div>
			<div v-if='cacheImg && !showPrize' :style='{background:"url("+imgs.createBg+") no-repeat center",backgroundSize:"cover"}' class='lt-full zmiti-createimg' >
				<div class='zmiti-cacheimg' >
					<img :src="cacheImg" alt="" >
					<div>
						长按保存图片
					</div>
				</div>
				<div class='zmiti-btns zmiti-share'>
					<div v-tap='[showShare]'>
						<img :src="imgs.cancelBtn" alt="">
						<div>分享</div>
					</div>
					<div v-tap='[showPrizePage]'>
						<img :src="imgs.okBtn" alt="">
						<div>抽奖</div>
					</div>
				</div>
				<div class='zmiti-team-btn' @touchend='showTeamPage = true'>
					<img :src="imgs.teamBtn" alt="">
				</div>
			</div>
			<div v-if='showTeamPage'  class='zmiti-team-page lt-full' :style='{background:"url("+imgs.team+") no-repeat center",backgroundSize:"cover"}'>
				<div @touchend='showTeamPage = false'>
					<img :src="imgs.back" alt="">
				</div>
			</div>
			<div v-if='showPrize' :style='{background:"url("+imgs.createBg+") no-repeat center",backgroundSize:"cover"}' class='lt-full zmiti-createimg zmiti-prize' >
				<div class='zmiti-arrow'>
					<img :src="imgs.arrow" alt="">
				</div>
				<div class='zmiti-input-tip'>输入手机号参与抽奖</div>
				<div class='zmiti-input'>
					<input type="text" v-model="mobile"><img  v-tap='[submit]' :src='imgs.sure'/>
				</div>
				<div class='zmiti-prize-img'>
					<img :src="imgs.prize" alt="">
				</div>
			</div>

			<div class='lt-full zmiti-mask' v-if='showShareMask' @touchend='showShareMask = false'>
				<img :src="imgs.arrow" alt="">
			</div>

			<Toast :msg='successMsg' :errorMsg='errorMsg'></Toast>
		</div>

	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import {zmitiUtil} from '../lib/util';
	import Point from './point';
	import '../lib/html2canvas.js';
	import Toast from '../toast/toast';
	export default {
		props:['obserable','nickname','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				errorMsg:"",
				bg:imgs.index,
				showVideo1:false,
				secretKey: "e9469538b0623783f38c585821459454",
                host: "https://xlive.xinhuaapp.com", //测试域名：https://testxlive.xinhuaapp.com
				showMask:false,
				cacheImg:'',
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				indexVideo:window.config.indexvideo,
				showImg:true,
				showPrize:false,
				points:[],
				len:9,
				mobile:'',
				wishes:window.config.wishes,
				show:true,
				showChangeBtn:false,
				start:false,
				showIndex:false,
				showShareMask:false,
				showCanvas:false,
				showNickname:false,
				textIndexArr:[1],
				textInow:0,
				indexArr:[1],
				showQrcode:false,
				imgIndex:1,
				imgDone:false,
				currentStep:0,
				iNow:-1,
				showBitmapBtns:false,
				createImg:'',
				showTeamPage:false,
				successMsg:'',
				result:{
					img:'',
					wish:''
				},
				showPlayer:true,
			}
		},
		components:{
			Toast
		},
		
		methods:{

			showShare(){
				this.showShareMask = true;
			},
			imgStart(e){
				e.preventDefault(); 
			},


			submit(){
				if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					this.errorMsg = '手机号格式不正确';
					setTimeout(() => {
						this.errorMsg = '';
					}, 2000);
					return;
				}
				var s = this;
				axios.post(this.host+'/xhs-security-activity/activity/user/saveUser',{
					"secretKey": s.secretKey, // 请求秘钥
					"nm": "gcbn", // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
					uname:s.nickname||"新华社网友",
					unickName:s.nickname||"新华社网友",
					uphone:s.mobile
				}).then((data)=>{
					
					if(typeof data.data === 'string'){
						data = JSON.parse(data.data);
					}
					else {
						data = data.data;
					}
					if(data.rc === 0){
						s.successMsg = '提交成功';

					}else{
						s.errorMsg =  data.msg;
						s.mobile = '';
					}
					setTimeout(() => {
						s.successMsg = '';
						s.errorMsg = '';
					}, 2000);
				})
			},

			next(){
				this.showMask = false;
				this.showVideo1  = true;
				this.showImg = true;
				this.indexVideo = window.config.indexvideo1;	
				setTimeout(() => {
					this.$refs['video1'].play();
				}, 1);		
			},
			restart(){
				window.location.href = window.location.href;
			},
			choose(){
				this.bg = imgs['img'+this.indexArr[this.iNow]];
				this.showBitmapBtns = false;
				this.showQrcode = true;
				this.html2img();
			},
			showPrizePage(){//显示抽奖页面
				this.showPrize = true;
			},
			html2img(){
				var s = this;

				var {obserable} = this;

				//document.title = '开始截图....'

				setTimeout(()=>{
					//this.showLoading = true;
					var ref = 'page';
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							s.cacheImg = src;
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},100)
			},
			playVideo(){
				if(this.currentStep>0){
					return;
				}


				var video = this.$refs['video1'];
				this.video = video;
				video.play();

				video.addEventListener('play',()=>{
					///this.showImg = false;
					this.showPlayer = false;
				})

				this.showVideo1 = true;

				video.addEventListener('ended',(e)=>{
					this.currentStep++;
					if(e.target.currentSrc.indexOf(window.config.indexvideo.replace('./',''))>-1){//播放的是第一个视频
						this.bg = imgs.index1;
						this.showMask = true;
					}else if(e.target.currentSrc.indexOf(window.config.indexvideo1.replace('./',''))>-1){
						this.bg = imgs.index2;
						setTimeout(() => {
							this.showVideo1 = false;//播放完成以后，隐藏视频。
						}, 200);
						this.showNickname = true;
						this.showChangeBtn = true;
						
					}
					
				})
			},

			setSize(){
				return;
				var bgratio = 1080/1920;
				if((innerWidth/innerHeight)<=9/16){
					this.$refs['video1'].style.width = parseInt(bgratio*innerHeight) + 'px';
					this.$refs['video1'].style.height = parseInt(innerHeight) + 'px';
				}else{
					this.$refs['video1'].style.width = innerWidth + 'px';
					this.$refs['video1'].style.height = parseInt(innerWidth / bgratio) + 'px';
				}
				//this.$refs['video1'].
			},
			touchstart(e){
				e.preventDefault();
				e.stopPropagation();

				if(this.iNow <= -1){
					this.iNow = 0;
				}
				
				this.timer = setInterval(()=>{
					if(this.iNow === 0){
						this.indexArr.sort(()=>{
							return Math.random()>.5;
						});
					}
					this.iNow++;
					this.iNow %= this.len;
					this.bg = imgs['gif'+this.indexArr[this.iNow]];
				},100);
				return false;
			},
			touchend(){

				clearInterval(this.timer);
				this.showBitmapBtns = true;
				this.showCanvas = false;
				this.showChangeBtn = false;
			},
			
			end(){
				this.showIndex = true;
			},

			shake(){
				 if (window.DeviceMotionEvent) {
					   window.addEventListener('devicemotion',deviceMotionHandler,false);
 				}
				var SHAKE_THRESHOLD = 4000;
				var last_update = 0;
				var s = this;
				var x, y, z, last_x = 0, last_y = 0, last_z = 0;
				function deviceMotionHandler(eventData) {
						var acceleration =eventData.accelerationIncludingGravity;
						var curTime = new Date().getTime();
						if ((curTime-last_update)> 10) {
							var diffTime = curTime -last_update;
							last_update = curTime;
							x = acceleration.x;
							y = acceleration.y;
							z = acceleration.z;
							var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
							if (speed > SHAKE_THRESHOLD) {
								if(s.iNow <= -1){
									s.iNow = 0;
								}
								if(s.iNow === 0){
									s.indexArr.sort(()=>{
										return Math.random()>.5;
									});
								}
								s.iNow++;
								s.iNow %= s.len;
								s.bg = imgs['gif'+s.indexArr[s.iNow]];
							}
							last_x = x;
							last_y = y;
							last_z = z;
						}
				}
			}
		},
		mounted(){
			this.setSize();
			this.shake()
			this.indexArr = [];
			for(var i =1;i<this.len+1;i++){
				this.indexArr[i-1]= i;
			}

		}
	}