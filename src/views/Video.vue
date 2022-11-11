<template>
   <!-- 测试-->

<div class="vido">
	<Administrtab>
		<span>{{videoName}}</span>
	</Administrtab>
	<div class="vidoCon">
		<div class="vido-box"  id="id_test_video"></div>
	</div>
	
	
	
	<!-- <div id="vs"></div> -->
	
</div>
 
</template>

<script>
// import '@/assets/js/tcplayer.css'
// import '@/assets/js/TXliveplayer.js'

	
	
	
import { TcPlayer } from '@/assets/js/test.js'

import Administrtab  from '@/components/Administrtab.vue'
// import xgplayer from 'xgplayer'
// import  HlsJsPlayer from 'xgplayer-hls'
  export default {
	  
	  data() {
	      return { 
			  playe:null,
	    //       player:null,
			  // videoUrl:'',
			  videoName:''
	      }
	  },
	  components:{
		  Administrtab
	  },
	created() {
		// this.videoUrl='http://grablive.1to2to3.cn/68479875/130.m3u8'
		// this.videoUrl='https://grablive.1to2to3.cn/'+this.$store.state.userorgid+'/'+ this.$route.query.url.DeviceId+'.m3u8'   
		this.videoName=this.$route.query.url.DeviceName
	// 	this.srcUrl.default='http://grablive.1to2to3.cn/68479875/130.m3u8'
	// 	// console.log(this.videoUrl,this.videoName)
	},
     
   mounted () {
				this.player = new TcPlayer('id_test_video', {
					"m3u8": 'https://grablive.1to2to3.cn/'+this.$store.state.userorgid+'/'+ this.$route.query.url.DeviceId+'.m3u8', //请替换成实际可用的播放地址
					// "x5_type":'h5',
					// "x5_player":true,
					"autoplay" : true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
					"controls":"default",
					"live": true,
					"flash":false,
					"x5_orientation": 0
				
				
			
				})
				
				// this.videoName=this.$route.query.url.DeviceName
				// let player = new HlsJsPlayer({
				//     id: 'vs',
				//     url: 'https://grablive.1to2to3.cn/'+this.$store.state.userorgid+'/'+ this.$route.query.url.DeviceId+'.m3u8',
				// 	isLive: true,
				//     autoplay: true,
				//     playsinline: true
				// })
				
				
				// new window.HlsJsPlayer({
				//           id: 'vs',
				//           url: 'https://grablive.1to2to3.cn/68479875/133.m3u8',
				//           autoplay: true,
				//           playsinline: true,
				//           height: window.innerHeight,
				//           width: window.innerWidth
				//       });
				
			}
	
}
</script>
<style scoped>
	.vido{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.vidoCon{
		display: flex;
		justify-content: center;
		width: 100%;
		border-radius: 0.4rem;
	}
	.vido-box{
		margin-top: 0.133333rem;
		width:80%;
		height: 4.746667rem;
		font-size: 0.3rem !important;
		float: left;
	}
	.vido-box:nth-child(even){
		float: right;
	}
	/deep/.vcp-controls-panel{
		font-size: 0.266667rem;
	}
	
	
	
	#vs{
		width: 100% !important;
	}
	
	
</style>

