<template>
	<div class="unnormal">
		<header>
			<div class="nomalTitle">
				<img src="@/assets/images/back.png" alt="" class="goback" @click="goback">
				<span>鹰眼</span>
			</div>
		</header>
		<section class="wrapper">
			<div>
				<!-- <div class="page-wrap"> -->
				<!-- tabcontainer -->
				<!-- <mt-tab-container class="page-tabbar-container" v-model="selected"> -->
				<!-- <mt-tab-container-item -->
				<!-- id="工控一"
					> -->
				<!-- <div class="cashier">
							<div class="vido-box"  id="video"></div>
						 </div>
						 <div class="monitor">
							<div class="vido-box"  id="video2"></div>
						 </div> -->
				<!-- </mt-tab-container-item>
					
			      </mt-tab-container> -->
				<!-- </div> -->

				<!-- <mt-tabbar v-model="selected"> -->
				<!-- <div class="itemBox">
						<mt-tab-item
						 id="工控一"
						 @click="liclick"
						 >
						工控一
						 </mt-tab-item>
				   </div>
			  </mt-tabbar> -->

				<div class="homepage-hero-module" @click="tostope">
					<div class="video-wrap">
						<!-- <div v-if="stope" class="filter">
							<img src="@/assets/images/stop.png" alt="">
						</div> -->
						<canvas id="videoWrapper" class="fillWidth"></canvas>
						<div class="poster">
							<span class="h1s">Welcome</span>
						</div>
					</div>
				</div>

				<div class="homepage-hero-module" style="margin-top: 0.533333rem;">
					<div class="video-wrap">
						<div class="filter">
						</div>
						<canvas id="video-canvas" class="fillWidth"></canvas>
						<div class="poster">
							<span class="h1s">Welcome</span>
						</div>
					</div>
				</div>



				<!-- 信息 -->
				<div class="info">
					<h4>工控一详情</h4>
					<ul>
						<li>工控名称：<span>{{remark}}</span></li>
						<li>工控场景：<span>{{jobName}}</span></li>
						<li>工控时间：<span>{{createAt}}</span></li>
						<li>工控员工：<span>{{createBy}}</span></li>
					</ul>
				</div>
			</div>
		</section>
		<Foot></Foot>
	</div>
</template>

<script>
	// import {
	// 	TcPlayer
	// } from '@/assets/js/TcPlayer-2.4.2_CK8JF548L0G0.js'
	import JSMpeg from '@cycjimmy/jsmpeg-player'
	import Foot from '@/components/Foot.vue'



	//插件
	import BetterScroll from '@better-scroll/core'

	export default {
		data() {
			return {
				// selected: '工控一',
				BetterScroll: '',
				TbetterScroll: '',
				player: null,
				player2: null,
				videoUrl: '',
				videoUrl2: '',
				remark: '',
				jobName: '',
				createAt: '',
				createBy: '',
				stope: true,
				fffsd: true
			}
		},
		components: {
			Foot
		},

		created() {
			this.videoUrl = this.$route.query.url1
			this.videoUrl2 = this.$route.query.url2
			this.remark = this.$route.query.remark
			this.jobName = this.$route.query.jobName
			this.createAt = this.$route.query.createAt
			this.createBy = this.$route.query.createBy
		},
		mounted() {
			let tsSrc = this.videoUrl
			let canvas = document.getElementById('videoWrapper')

		new JSMpeg.VideoElement(canvas,tsSrc, {
			    canvas,// 容器id
				control: true,
				autoplay: true,
			    // throttled: false, // 这里设置为false，不然不触发onSourceCompleted事件
			    // chunkSize: 4 * 1024 * 1024, // 使用分块加载数据时，一次加载的块大小。默认1024*1024(1mb)
			    // progressive: false, // 是否分块加载数据
			    loop: true, // 是否循环播放视频。默认true
			    // onSourceCompleted: () => {
			    //     console.log('completed')
			    // },
			    onPlay: () => {
			        console.log('play')
			    },
			    onPause: () => {
			        console.log('pause')
			    },
			    onEnded: () => {
			        console.log('end')
			    },
			    onStalled: () => {
			        console.log('没有足够的数据用于播放')
			    },
			    onSourceEstablished: () => {
			        console.log('第一次收到数据')
			    }
			})
			
			

			let tsSrcc = this.videoUrl2
			var canvass = document.getElementById("video-canvas")
			new JSMpeg.VideoElement(canvass, tsSrcc, {
				canvas: canvass,
				loop: true,
				progressive: false, //是否为chunk
				control: true,
				autoplay: true,
				onPlay: () => {
				    console.log('play')
				},
				onPause: () => {
				    console.log('pause')
				},
				onEnded: () => {
				    console.log('end')
				},
				onStalled: () => {
				    console.log('没有足够的数据用于播放')
				},
				onSourceEstablished: () => {
				    console.log('第一次收到数据')
				}
				
			}
			// , {
			// 	audio: false, //静音
			// 	onPlay: () => {
			// 		console.log("789")
			// 	}
			// },
			)
		    this.TbetterScroll = this.$nextTick(()=>{
				new BetterScroll('.wrapper', {
				   movable: true,
				   zoom: true,
					probeType:2,
					click:true
				 })
			})
			// this.player = new TcPlayer('video', {
			// 	"m3u8": this.videoUrl, //请替换成实际可用的播放地址
			// 	"flv": this.videoUrl,
			// 	"autoplay" : true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
			// 	"continuePlay":true,  //是否连续播放
			// }),
			// this.player2 = new TcPlayer('video', {
			// 	"m3u8": this.videoUrl2, //请替换成实际可用的播放地址
			// 	"flv": this.videoUrl2,
			// 	"autoplay" : true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
			// 	"controls":"default",
			// })
			// document.getElementsByTagName('video')[0].setAttribute("x5-playsinline","true")
			// console.log(document.getElementsByTagName('video'))
		},
		methods: {

			goback() {
				this.$router.back()
			},
			tostope() {
				if (this.stope) {
					this.stope = false
				} else {
					this.stope = true
				}
			}
		},
	}
</script>




<style scoped>
	.login {
		padding: 0px;
		text-align: right;
		min-width: 100%;
		position: relative;
	}

	.login button {
		padding: 20px 20px;
		margin-top: 20px;
		line-height: 2px;
	}

	.el-aside {
		line-height: 100%;
	}

	.login .line {
		padding: 10px;
	}

	.login .line input {
		padding: 0px 10px;
		line-height: 28px;
		min-width: 20px;
	}

	.video {
		width: 100%;
		height: 6.6667rem;
		object-fit: cover;
	}

	.homepage-hero-module,
	.video-container {
		position: relative;
		height: 6.6667rem;
		overflow: hidden;
		z-index: 0;
	}

	.video-wrap {
		width: 100%;
		height: 6.6667rem;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		opacity: 1;
		overflow: hidden;
	}

	.video-container .poster img,
	.video-container video {
		z-index: 0;
		position: absolute;
	}

	.filter {
		z-index: 1;
		position: absolute;

	}

	.video-container .filter {
		z-index: 1;
		position: absolute;
		background: rgba(0, 0, 0, 0.4);
	}

	.h1s {
		font-size: 32px;
		margin-top: 50%;
		margin-bottom: 48px;
		font-weight: 300;
		color: #FFF;
		position: absolute;
		height: 100%;
		justify-content: center;
		z-index: 50;
		align-items: center;
		font-family: "Arial";
		margin-block-start: 25%;
		margin-block-end: 45%;
		margin-inline-start: 35%;
		margin-inline-end: 50%;
		font-size: 80px;


	}

	.video-js .vjs-icon-placeholder {
		width: 100%;
		height: 100%;
		display: block;
	}

	#videoWrapper,
	#video-canvas {
		width: 100%;
		height: 6.6667rem;
	}








	.unnormal {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;

	}

	header {
		height: 1.333333rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nomalTitle {
		width: 8.88rem;
		height: 100%;
		/* padding-top: 0.533333rem; */
		font-size: 0.426667rem;
		color: #515151;
		text-align: center;
		display: flex;
		align-items: center;
	}

	.goback {
		height: 0.48rem;
		float: left;
		margin-right: 0.266667rem;
	}

	section {
		flex: 1;
		overflow: hidden;
	}

	.cashier,
	.monitor {
		width: 100%;
		height: 6.666667rem;
	}

	.cashier {
		margin-bottom: 0.533333rem;
	}

	.vido-box {
		width: 100%;
		height: 100%;
	}



	/deep/.mint-tabbar {
		display: flex;
		width: 100%;
		justify-content: center;
		padding: 0.32rem 0;
		background-color: white;
		margin: 0 0 0.213333rem 0;
		position: static;

	}

	.mint-tabbar div {
		display: flex;
		width: 8.88rem;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: left;
		align-items: center;
	}


	/deep/ .mint-tab-item {
		display: flex;
		width: 2.72rem;
		border: 1px solid #3778DA;
		border-radius: 0.133333rem;
		flex: none;
		margin: 0.08rem;
		justify-content: center;
	}

	.mint-tabbar>div .mint-tab-item.is-selected {
		background-color: #3778DA;
		color: white;
	}

	.info {
		background-color: white;
		margin: 0.233333rem 0;

		font-size: 0.373333rem;
		color: #515151;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 0.293333rem 0;
	}

	.info ul {
		width: 8.88rem;
	}

	.info ul li {
		margin-bottom: 0.213333rem;
	}

	.info h4 {
		width: 8.88rem;
		font-size: 16px;
		margin-bottom: 0.266667rem;
	}

	/deep/.vcp-controls-panel {
		font-size: 0.266667rem;
	}

	/deep/.vcp-error-tips {
		font-size: 0.266667rem;
	}

	/deep/.vcp-player {
		margin-bottom: 0.4rem;
	}
</style>
