<template>
	<transition name='index'>
		<div ref='page' v-if='show' class="lt-full zmiti-index-main-ui " >
			<div class='zmiti-start' :class='{"active":showCanvas}'  @touchstart='touchstart' @touchend='touchend' >
				长按
			</div>
			<img class='zmiti-img' v-if='iNow>=0' :src='imgs[(imgDone?"img":"gif")+indexArr[iNow]]'/>
			<div  class='zmiti-tip' style='color:#fff;text-align:center;top:60px'>长按选择图片</div>
			<div v-if='imgDone && !result.wish' style='color:#fff;text-align:center'>长按选择祝福语</div>
			<div class='zmiti-wish-text' v-if='imgDone'>
				{{wishes[textIndexArr[textInow]].wish}}
			</div>

			<div class='zmiti-btns' v-if='showBtns'>
				<div v-tap='[cancel]'>取消</div>
				<div v-tap='[sure]'>确定</div>
			</div>

			<div class='zmiti-create-btn' v-if='result.wish' v-tap='[create]'>生成海报</div>

			<canvas v-show='showCanvas' :width="viewW" height="500" ref='canvas' class='zmiti-canvas'>

			</canvas>

			<div class='lt-full zmiti-poster' v-if='createImg'>
				<img :src="imgs.wish" alt="">
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import {zmitiUtil} from '../lib/util';
	import Point from './point';
	export default {
		props:['obserable','nickname','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				count:0,
				points:[],
				len:9,
				wishes:window.config.wishes,
				show:true,
				start:false,
				showIndex:false,
				showCanvas:false,
				textIndexArr:[1],
				textInow:0,
				indexArr:[1],
				imgIndex:1,
				imgDone:false,
				iNow:-1,
				showBtns:false,
				createImg:'',
				result:{
					img:'',
					wish:''
				}
			}
		},
		components:{
		},
		
		methods:{
			imgStart(e){
				e.preventDefault(); 
			},
			initPoints(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');
				canvas.height = this.viewH;
				var width = canvas.width,
					height = canvas.height;
				var img = new Image();
				var center = [canvas.width>>1,height - 130];
				img.onload = ()=>{
					for(var i = 0 ;i<100;i++){
						var p = new Point({
							img,
							context,
						});
						p.speedY = (p.defaultY - center[1])/(p.defaultX - center[0])*p.speedX;
						this.points.push(p);
					}
				}
				img.src = imgs.point;

				var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame,
					m = Math;

				

				var render = ()=>{
					if(width<=0){
						width = canvas.width,
						height = canvas.height;
					}
					context.clearRect(0,0,width,height);
					this.points.map((point,i)=>{
						if(point.x<center[0]){
							point.x += Math.abs( point.speedX);
						}
						else{
							point.x += -Math.abs( point.speedX);
						}
						if(point.y<center[1]){
							point.y+=Math.abs( point.speedY);
						}else{
							point.y+= -Math.abs( point.speedY);
						}
						point.angle += point.speed;
						//point.angle = (point.angle | 0)
						point.angle %= 360;
						//point.x += m.sin(point.angle/180*m.PI)*point.speedX;

						

						/* point.y -= 3;
						point.y = this.viewH - 100; */
						if(Math.abs(point.y -center[1]) <50  && Math.abs(point.x - center[0]) <50){
							point.y = point.defaultY;
							point.x = point.defaultX;
						}
						point.update();
					});
					 animationFrame(render);
				}
				
				render()


			},
			sure(){
				if(!this.imgDone){
					this.imgDone = true;
					this.showBtns = false;
				}else{//开始显示文字
					this.result.img = this.imgs["img"+this.indexArr[this.iNow]];
					this.result.wish = this.wishes[this.textIndexArr[this.textInow]].wish;
					this.showBtns = false;

				}
			},
			create(){
				this.createImg = true;
			},
			cancel(e){
				this.showBtns = false;
				/* if(this.imgDone){
					this.imgDone = false;
				}
				else{
					this.imgDone = true;
				} */
			},
			touchstart(e){
				e.preventDefault();
				e.stopPropagation();

				this.showCanvas = true;
				this.showBtns = false;

				if(this.iNow <= -1){
					this.iNow = 0;
				}
				
				this.timer = setInterval(()=>{
					if(this.imgDone){
						if(this.textInow === 0){
							this.textIndexArr.sort(()=>{
								return Math.random()>.5;
							});
						}
						this.textInow++;
						this.textInow %= this.len;
						console.log(this.textIndexArr,this.textInow);
					}else{
						if(this.iNow === 0){
							this.indexArr.sort(()=>{
								return Math.random()>.5;
							});
						}
						this.iNow++;
						this.iNow %= this.len;
					}
				},1000);
			},
			touchend(){

				clearInterval(this.timer);
				this.showBtns = true;
				this.showCanvas = false;
			},
			
			end(){
				this.showIndex = true;
			},
		},
		mounted(){
			this.indexArr = [];
			this.textIndexArr = [];
			for(var i =1;i<this.len+1;i++){
				this.indexArr[i-1]= i;
				this.textIndexArr[i-1]= i-1;
			}

			this.initPoints();
			setTimeout(() => {
				this.showIndex = true;
			}, 1000);

		}
	}
</script>