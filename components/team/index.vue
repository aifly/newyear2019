<template>
	<transition name="team">
		<div v-tap='[hideTeam]' v-show='showTeam' class="lt-full zmiti-team-main-ui" :style="{background:'url('+imgs.teamBg+') no-repeat center center',backgroundSize:'cover'}">
			<div class="zmiti-team-main">
				<div>
					<aside>
						出品人
					</aside> 
					<aside>
						<span>陈凯星、</span> <span>冯瑛冰</span>
					</aside>
				</div>
				<div>
					<aside>
						总监制
					</aside> 
					<aside>
						<span>葛素表、</span><span>刘元旭</span>
					</aside>
				</div>

				<div>
					<aside>
						策<label for="">策</label>划
					</aside> 
					<aside>
						<span>陈知春</span>
					</aside>
				</div>

				<div>
					<aside>
						监<label for="">人</label>制
					</aside> 
					<aside>
						<span>牟　帆</span>
					</aside>
				</div>

				<div>
					<aside>
						记<label for="">人</label>者
					</aside> 
					<aside>
						<span>毛振华</span>
					</aside>
				</div>
				<div>
					<aside>
						文<label for="">人</label>案
					</aside> 
					<aside>
						<span>李京泽</span>
					</aside>
				</div>
				<div>
					<aside>
						制<label for="">人</label>作
					</aside> 
					<aside>
						<span>麟腾传媒</span>
					</aside>
				</div>
				<div>
					新华社新媒体中心、新华社天津分社联合出品
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				showTeam:false,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},
			hideTeam(){
				this.showTeam = false;
			}

			
		},
		mounted(){

			this.obserable.on('showTeam',()=>{
			 
				this.showTeam = true;
				
			})
		


		}
	}
</script>