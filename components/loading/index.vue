<template>
	<transition name='loading'>
		<div ref='page'  class="lt-full zmiti-loading " v-if='show' >
			<div class='zmiti-loading-bar'>
				<img :src="imgs.loading" alt="">
				<div>
					<span :style='{width:width+"px"}'></span>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import {zmitiUtil} from '../lib/util';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},
		},
		mounted(){

			this.obserable.on('hideloading',()=>{
				this.show = false;
			});

		}
	}
</script>