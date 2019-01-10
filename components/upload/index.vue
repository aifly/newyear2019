<template>
	<transition name='upload'>
		<div class="lt-full zmiti-upload-main-ui "  v-show='show' ref='page' :style="{background:'url('+imgs.loadingBg+') no-repeat center center',backgroundSize:'cover'}">
			 
			<transition name='upload'>
				<div class='zmiti-upload-C '  v-if='!mergeImg &&!createImg'>
					<div>
						<h2>
							<img :src="imgs.uploadText" alt="">
						</h2>
						<div class='zmiti-upload' :class="{'uploading':uploading}">
							<img @touchstart='uploadErr' :src="imgs.upload" alt="">
							<div @touchstart='uploadErr'>上传中...</div>
							<input v-if='sex>-1' @change='upload'  accept="image/*" type="file" class='zmiti-file' ref='file'>
						</div>
						<div class='zmiti-rechoose' v-tap='[rephoto]'>回去换个模板~</div>
					</div>
					<div>
						<h3>
							<img :src="imgs.sex" alt="">
						</h3>
						<div class='zmiti-upload-sex'>
							<div v-tap='[chooseSex,0]'>
								<img :src="imgs.boy" alt="" @touchstart='imgStart' >
								<div class='zmiti-sex-checked' v-if='sex === 0'>
									<img  :src="imgs.checked" alt="">
								</div>
							</div>
							<div v-tap='[chooseSex,1]'>
								<img :src="imgs.girl" alt=""  @touchstart='imgStart' >
								<div class='zmiti-sex-checked'  >
									<img  :src="imgs.checked" alt="" v-if='sex === 1'>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>

			<div v-if='createImg||mergeImg' class='zmiti-share-ui lt-full'>
				<div><img :src="imgs.subtitle" alt=""></div>
				<div class='zmiti-merge-img' ref='img'>
					<canvas width='1500' height='1060' ref='canvas'></canvas>
					<img   ref='mergeimg' :src="createImg||mergeImg" alt="">
					<div class='zmiti-nickname'>
						
					</div>
					<div class='zmiti-card-info'>
						<div>“我们都是弄潮儿”限量明信片</div>
						<div>
							<div>编号：</div>
							<div>
								<span>{{pv}}</span><label for="" v-if='pv<400000'>/400000</label>
							</div>
						</div>
					</div>
					<div class='zmiti-img-tip'>邮票是谁？长按保存高清图</div>
				</div>
				<div class='zmiti-share-btns'>
					<div v-tap='[rephoto]'><img :src="imgs.rephoto" alt=""></div>
					<div v-tap='[showShareMask]'><img :src="imgs.share" alt=""></div>
				</div>
			</div>
			
			<div class='zmiti-share-mask lt-full' v-if='showMask' @touchend='showMask = false' :style="{background:'url('+imgs.shareBg+') no-repeat center bottom',backgroundSize:'cover'}">
				<img :src="imgs.arrow" alt="">
				<div>
					<div>立刻分享</div>
					<div>你还可以前往国家博物馆</div>
					<div>在“伟大的变革——庆祝改革开放40周年大型展览”<br />新华社展区中打印实体明信片！</div>
				</div>
			</div>
			<img :src="cacheImg" ref='cacheimg' class='zmiti-cache-img' alt="" />
			<Toast :errorMsg='errMsg'></Toast>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import {imgs,mainImgList} from '../lib/assets.js';
	import Toast from '../toast/toast.vue';
	import '../lib/html2canvas'
	export default {
		props:['obserable','pv','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:false,
				errMsg:'',
				showCode:true,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				sex:-1,
				createImg:"",
				modelArr,
				nickname:decodeURI(window.nickname) === 'undefined'?'':decodeURI(window.nickname),
				mergeImg:'',
				showMask:false,
				uploading:false,
				cacheImg:''
				
			}
		},
		components:{
			Toast
		},
		
		methods:{

			imgStart(e){
				e.preventDefault();
			},

			chooseSex(sex){
				this.sex = sex;
			},

			showShareMask(){
				this.showMask = true;
			},
			rephoto(){
				this.show = false;
				this.mergeImg = '';
				this.createImg = '';
				var {obserable} = this;
				obserable.trigger({
					type:'toggleMain',
					data:{
						show:true
					}
				})
			},
			uploadErr(e){
				e.preventDefault();
				this.errMsg = '请先选择性别';
				setTimeout(() => {
					this.errMsg = '';
				}, 2000);
			},

			upload(){
				var s = this;

				var d = new Date().getTime();
				
				var file = this.$refs['file'].files[0];
				if(file.name.split('.')[1] === 'jpg'||file.name.split('.')[1] === 'jpeg'){

					var reader = new FileReader();
					reader.onload = function(){
						//console.log(this.result);
						var self = this;
						s.uploading = true;
						$.ajax({
							type:'post',
							url:window.config.baseUrl+'/xhs-security-activity/postcard/uploadImage',
							dataType: 'JSON',
							charset:"utf-8",
							contentType:"application/json",
							data:JSON.stringify({
								secretKey:window.config.secretKey,
								modelId:s.modelArr[s.modelIndex][s.sex],
								imgData:self.result.replace('data:image/jpeg;base64,','')
							}),
							success(data){
								s.uploading = false;
								if(typeof data === 'string'){
									var data = JSON.parse(data);
								}
								console.log('上传总消耗时间 => '+(new Date().getTime()-d)/1000+' 秒');
								if(data.rc === 0){
									s.mergeImg = 'data:image/jpeg;base64,'+ data.data.imgBase64;
									//s.mergeImg =  data.data.imgUrl;
									
									setTimeout(() => {
										var canvas = s.$refs['canvas'];
										var context = canvas.getContext('2d');
										var img = new Image();
										img.onload = function(){
											context.drawImage(this,0,0,canvas.width,canvas.height);
											setTimeout(() => {
												s.html2img();

												setTimeout(() => {
													context.drawImage(s.$refs['cacheimg'],0,0,canvas.width,canvas.height);
													setTimeout(() => {
														s.createImg = canvas.toDataURL();
														s.showCode = false;
													}, 100);
												}, 1000);
											}, 100);
											/* setTimeout(() => {
												canvas.toBlob((blob)=>{
													//s.mergeImg = URL.createObjectURL(blob);

													
												});
												
											}, 1000); */
										}
										img.src = s.mergeImg;
									}, 1000);

								}
								else{
									s.errMsg = data.msg;
									setTimeout(() => {
										s.errMsg = '';
									}, 2000);
								}



							}
		
						})


						return;

						var img = new Image();
						img.onload = function(){
							var canvas = document.createElement('canvas');
							if(this.width > 750){
								canvas.width = 750>>1;
								canvas.height = (this.height / this.width * 750)>>1;
							}
							else{
								canvas.width = this.width>>1;
								canvas.height = this.height>>1;
							}
							var context  = canvas.getContext('2d');
							context.drawImage(img,0,0,canvas.width,canvas.height);
						}
						img.src = self.result;
					}
					reader.readAsDataURL(file);
					return;
					
				}else{
					this.errMsg = '只允许上传jpg的图片';
					setTimeout(() => {
						this.errMsg = '';
					}, 2000);
				}
				
			},
			html2img(){
				var s = this;

				var {obserable} = this;

				//document.title = '开始截图....'

				setTimeout(()=>{
					//this.showLoading = true;
					var ref = 'img';
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

			
		},
		mounted(){

			window.s = this;
			var {obserable} = this;

			obserable.on('setNickname',(data)=>{
				if(this.nickname){
					return;
				}
				this.nickname =decodeURI( data);
			})

		 

			obserable.on('toggleUpload',(data)=>{
				this.show = data.show;
				this.modelIndex = data.modelIndex;
				console.log(this.modelIndex)
			})
		}
	}
</script>