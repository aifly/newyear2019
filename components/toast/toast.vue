<template>
	<div class="zmiti-toast-main-ui" :class='{"hide":!msg && !errorMsg}'>
		<span :class="{'success':msg,'error':errorMsg}"></span>{{msg||errorMsg}}
	</div>
</template>
<script>
	export default {
		props:['msg','errorMsg'],
		data(){
			return {
				
			}
		},
		mounted(){
			
			
		}
	}
</script>
<style>
	.zmiti-toast-main-ui{
		position: fixed;
		background: rgba(0,0,0,.5);
		color:#fff;
		border-radius: .3rem;
		padding:.3rem .4rem .3rem .7rem;
		left: 50%;
		z-index: 111111;
		top: 50%;
		-webkit-transform:translate3d(-50%,-50%,0);
		-webkit-transition:1s;
	}
	.zmiti-toast-main-ui.hide{
		display: none;
	}
	.zmiti-toast-main-ui .success{
		display: inline-block;
		width: 34px;
		height: 34px;
		vertical-align: middle;
		margin-right: 10px;
		border-radius: 50%;
		background:#00ff12;
		position: absolute;
		left: 12px;
		top: .4rem;
		
	}
	.zmiti-toast-main-ui .success:before{
		content:"";
		position: absolute;
		width:10px;
		height: 18px;
		border:4px solid #fff;
		-webkit-transform:rotate(45deg);
		border-top: none;
		border-left: none;
		left: 10px;
		top: 4px;
	}


	.zmiti-toast-main-ui .error{
		display: inline-block;
		width: 34px;
		height: 34px;
		vertical-align: middle;
		margin-right: 10px;
		border-radius: 50%;
		background:#f00;
		position: absolute;
		left: 12px;
		top: .4rem;
		
	}
	.zmiti-toast-main-ui .error:before{
		content:"";
		position: absolute;
		width:1px;
		height: 18px;
		border:4px solid #fff;
		-webkit-transform: translateX(4px) rotate(45deg);
		border-top: none;
		border-left: none;
		left: 10px;
		top: 4px;
	}.zmiti-toast-main-ui .error:after{
		content:"";
		position: absolute;
		width:1px;
		height: 18px;
		border:4px solid #fff;
		-webkit-transform:translateX(4px) rotate(-45deg);
		border-top: none;
		border-left: none;
		left: 10px;
		top: 4px;
	}
</style>