<template>
	<transition name='index'>
		<div ref='page' v-if='show' class="lt-full zmiti-index-main-ui " >
			<img v-if='showImg' :src="imgs.index" alt="" class="zmiti-index-img"  v-tap='[playVideo]'>
			<video v-show='!showImg' ref='video1' width="100%"  :src="indexVideo"></video>
			<div class='zmiti-index-mask lt-full'>
				<div>说明文字说明文字</div>
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
				bg:'',
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				indexVideo:window.config.indexvideo,
				showImg:true,
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


			playVideo(){
				var video = this.$refs['video1'];
				video.play();
				this.showImg = false;

				video.addEventListener('ended',()=>{
					alert(2)
				})
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
			

		}
	}
</script>