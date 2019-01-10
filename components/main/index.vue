<template>
	<transition name='main'>
		<div class='zmiti-main-ui lt-full' :class="{'show':show}" >
			<transition name='detail'>
				<div v-if='showDetail && index >-1' class='zmiti-main-detail'>
					<div class='lt-full' :style="{background:'url('+sceneList[index].imgsList[0].img+') no-repeat center center',backgroundSize:'cover'}"></div>
					<transition name='create'>
						<div v-if='createImg && !creating' class='zmiti-createimg'>
							<div class='zmiti-createimg-img'>
								<img :src="createImg" alt="">
								<div>长按保存至手机</div>
							</div>
							<div class='zmiti-btns'>
								<div v-tap='[reChangeScene]'>看看其它场景</div>
								<div v-tap='[share]'>分享</div>
							</div>

							<div class='zmiti-mask' @touchstart='showMask=false' v-if='showMask'>
								<img :src="imgs.arrow" alt="">
							</div>
						</div>
					</transition>
					<div class='zmiti-creating' v-if='creating'>
						<div>
							<img :src="imgs.waiting" alt="">
						</div>
						<div class='zmiti-point'>
							<img :src="imgs.point" alt="">
						</div>
					</div>
					<transition name='create'>
						<div v-if='!createImg && !creating && index >-1' class='zmiti-main-detail-C'>
							<div class='zmiti-main-detail-content'>
								<div class='zmiti-detail-img' :class="{'active':isWidth}">
									<img @load='imgLoad' :src="sceneList[index]['imgsList'+sceneIndex][0].img" alt="">
								</div>
								<div class='zmiti-detail-content'>
									<div v-for='(img,k) in sceneList[index].imgsList' :key="k">
										{{img.content}}
									</div>
								</div>
								<div class='zmiti-detail-close' v-tap='[toggleDetail,false]'>

								</div>
							</div>

							<div class='zmiti-btn zmiti-create-card' v-tap='[createCard]'>
								生成明信片
							</div>
						</div>
					</transition>
				</div>
			</transition>
			<div v-show='!showDetail && show '>
				<div>正在进入，请稍后...</div>
				<iframe @load='load' @error='error' :src=" href || sceneList[index]['href']" frameborder="0"></iframe>

				<div class='zmiti-scene-list' :class='{"show":showScene}'>
					<ul>
						<li :class="{'active':i === index}" v-for='(scene,i) in sceneList' :key="i">
							<div v-tap='[changeScene,scene,i]'>
								<img @touchstart='imgStart' :src='scene.thumbnail' alt="">
							</div>
							<div>
								{{scene.name}}
							</div>
						</li>
					</ul>
					<div class='zmiti-change-scene' v-tap='[change]'>
						切换场景
					</div>
				</div>
				<div class='zmiti-btn zmiti-continue'  v-tap='[toggleDetail,true]' v-if='showContinus'>
					继续
				</div>
			</div>
			
		</div>
	</transition>
</template>

<script>
	import './index.css';
	
	import {
	
		imgs,
	
		mainImgList
	
	} from '../lib/assets.js';
	
	import zmitiUtil from '../lib/util';
	import Toast from '../toast/toast.vue'
	
	export default {
	
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
	
			return {
				href:'',
				errMsg:'',
				imgs,
				showFrame:false,
				isWidth:false,
				loaded:false,
				createImg:'',
				showContinus:false,
				creating:false,
				showTeam: false,
				showMask: false,
				sceneIndex:'',
				show: false,	
				showScene:true,
				showDetail:false,
				sceneList:window.config.sceneList,
				viewW:Math.min( window.innerWidth,750),
				viewH: window.innerHeight,
				index:0,
				lastIndex:0,
			}
		},
	
		components: {Toast},
		methods: {

			error(){
				document.title = 'error';
			},
			imgLoad(e){
				this.isWidth = e.target.width>e.target.height;
			},
			share(){
				this.showMask = true;
			},
			toggleDetail(flag){
				this.showDetail = flag;
			},
			imgStart(e){
				e.preventDefault();
			},
			load(){
				this.loaded = true;
				setTimeout(()=>{
					this.showContinus = true;
				},2000)
				
				
			},
			change(){
				if(this.loaded){
					this.showScene = !this.showScene;
				}
			},
			changeScene(scene,index){
				this.index = index;
				this.loaded = false;
				document.title = scene.name;
				this.sceneIndex = index === 3 && Math.random()-.5>0 ? "1":'';
				if(index === this.lastIndex){
					this.href = this.sceneList[this.index]['href']+'?t='+new Date().getTime();
				}
				else{
					this.href = '';
				}
				this.lastIndex = index;
			},
			reChangeScene(){
				this.createImg = '';
				this.showDetail = false;
			},
			createCard(){
				this.creating = true;
				setTimeout(() => {
					this.createImg = this.sceneList[this.index]['createImg'+this.sceneIndex];
					this.creating = false;
				}, 3000);
			}
			
		},
	
		mounted() {
			var {obserable } = this;
			obserable.on('toggleMain',(data)=>{
				document.body.style.position = 'fixed'; //防止iframe页上下滚动时带动本页移动
				document.body.style.position = 'static'; //取消禁止滚动
				this.show = data.show;
				this.index = 0;
				setTimeout(() => {
					this.showScene = false;
					this.showFrame = true;
				}, 3000);
			});

			
		}
	
	}
</script>
