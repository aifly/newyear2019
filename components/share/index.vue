<template>
	<div  class="lt-full zmiti-share-main-ui " :style="{background:'url('+imgs.modelBg+') no-repeat center top',backgroundSize:'cover'}"   :class="{'show':show}">
		<div class='zmiti-share-subtitle'>
			<img :src="imgs.subtitle" alt="">
		</div>
		<div class='zmiti-share-main'>

		</div>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util'; 
	export default {
		props:['obserable','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				
				viewW:document.documentElement.clientWidth,
				showBtns:false,
				viewH:document.documentElement.clientHeight,

			}
		},
		components:{
		},
		
		methods:{


		
			imgStart(e){
				e.preventDefault();
			},
		

			share(){
				this.showMasks = true
			},

			rechoose(){
				var {obserable} = this;
				obserable.trigger({
					type:'toggleShare',
					data:{
						show:false,
						index:-1,
						headimg:''
					}
				});
				obserable.trigger({
					type:'clearFile'
				});
				this.index = -1;
				this.headimg = '';
				this.createImg = '';
			},

			afterEnter(){
				this.showBtns = true;
			},
			
			deleteImg(url){//删除原图

				setTimeout(()=>{
					$.ajax({
						url: window.protocol+'//api.zmiti.com/v2/share/delete_file/',
						type:'post',
						data:{
							filepath:url
						},
						success(data){
							console.log(data);
						}
					})

				},2000)
			},
			
			
		},
		mounted(){

			var dt = new Date();

			var year = dt.getFullYear();
			var month = dt.getMonth() + 1;
			var date = dt.getDate();

			this.date = year + ' / ' + month + ' / '+ date;
			var {obserable} = this;

			obserable.on('toggleShare',(data)=>{

				this.show = data.show;

			 
			})

		 


		}
	}
</script>