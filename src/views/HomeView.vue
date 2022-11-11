<template>

	<div class="home" @click="closeTab">
		<header>
			<div class="home-top">
				<Serch @addnew='addnewshow' @pop1='serpop1' @pop2='serpop2' @pop3='serpop3' @pop4='serpop4' ref="child">
				</Serch>
				<Camera @tofa="change" @camlist="updata" :camera="cameraList" :cam="camlist"
					:device_types="device_type_name">
				</Camera>
				<h4>
					<p>
						<img src="@/assets/images/horn.png" alt="">
						公告：
						<span v-for="(item,index) in newsList" :key="index">
							{{item.con}}
						</span>
					</p>
				</h4>
			</div>
		</header>
		<div class="suffix">
			<div class="suffix-title">
				<img src="@/assets/images/suffix.png" alt="">
				<span>工控任务</span>
			</div>
		</div>
		
		<section class="home-con">
			<div class="clearfix" :class="cameraPopup || pop1 || pop2 || pop3 || pop4? 'zindex':''">
				<Abnormal></Abnormal>
			</div>
		</section>
		<Foot></Foot>

	</div>
</template>

<script>
	import Serch from '@/components/home/Serch.vue'
	import Camera from '@/components/home/Camera.vue'
	import Abnormal from '@/components/home/Abnormal.vue'
	import Foot from '@/components/Foot.vue'
	import '@/assets/prop.css'
	import http from '@/common/api/request.js'
	// import {ChatClient} from "@qians/quake_ws_client-wasm";


	//插件
	// import BScroll from '@better-scroll/core'
	export default {
		name: 'HomeView',

		data() {
			return {
				newsList: [ //公告数据
					{
						id: 1,
						con: "微数场新功能即将上线，敬请期待~",
					}
				],
				cameraPopup: false, //监视器蒙尘状态
				addshow: false,
				pop1: false, //serch的pop们
				pop2: false,
				pop3: false,
				pop4: false,
				cameraList: [],
				device_type_name: [], //设备类型名称
				camlist: false, //设备列表是否更新

			}
		},
		components: {
			Serch,
			Camera,
			Foot,
			Abnormal
		},
		methods: {
			// //摄像头蒙尘状态
			change(res) {
				this.cameraPopup = res
			},

			// 头部加号状态
			addnewshow(rq) {
				this.addshow = rq
			},
			// addList
			closeTab() {
				if (this.addshow) {
					this.addshow = false;
					this.$refs.child.showTab(this.addshow);
				}
			},
			//serch的pop们
			serpop1(res) {
				this.pop1 = res
			},
			serpop2(res) {
				this.pop2 = res
			},
			serpop3(res) {
				this.pop3 = res
			},
			serpop4(res) {
				this.pop4 = res
			},
			// 设备列表是否更新
			updata(res) {
				this.camlist = res
			},

			// 连接wasm
			// chat() {
			// 	// console.log("[Views: HomeView.vue]wait for init client")
			// 	//FIXME: change k32212 to username(token)
			// 	const that = this
			// 	ChatClient.init("k32212", 'levitas.quakeai.tech:31033', 'eye_h5',true)
			// 	this.ChatClient = ChatClient
			// 	setTimeout(function(){
			// 		console.log("[Views: HomeView.vue]chat client has been inited: ", that.ChatClient.get_group_chridren())
			// 	},5000)
				
			// },
			// 获取设备列表
			getCamerList(){
				// yconsole.log("123456")
				http.$axios({
						url: 'device/getDevices',
						method: "GET",
						params: {
							"org_id": this.$store.state.userorgid
						}
				
					}).then(res => {
						// console.log(res.data)
						this.cameraList = res.data.data
				
					})
			}
			
		},
		created() {
			// this.chat()
			
			this.getCamerList()
			this.$nextTick(() => {
				
					// 获取设备类型名称
					http.$axios({
						url: 'https://1to2to3.cn/rds2/service/query',
						data: {
							"auth": 2,
							"project": "eagle_eye",
							"table": "sys_device_type",
							"conditions": {
								"fields": [
									"device_type_name"
								],
								"query": {}
							}
						}

					}).then(res => {
						// console.log(res.data)
						this.device_type_name = res.data.data
					})
					
			})


		},

		// mounted() {
		//  this.$nextTick(()=>{
		//   console.log(this.$store.state.userorgid)
		//  })
		// },
		watch: {
			camlist(val) {
				if (val == true) {
					// 获取设备列表
					http.$axios({
						url: 'device/getDevices',
						method: "GET",
						params: {
							"org_id": this.$store.state.userorgid, //机构ID
							//"page":1,
							//"pageSize":10,
							//     "device_type":1 设备类型
						}

					}).then(res => {
						// console.log(res.data.data)
						this.cameraList = res.data.data
						this.camlist = false
					})
				}
			}

			// ExceptionList() {
			// 	this.$nextTick(() => {
			// 		let bs = new BScroll('.wrapper', {
			// 			movable: true,
			// 			zoom: true,
			// 			probeType: 2,
			// 			click: true
			// 		})
			// 	})
			// }

		}
	}
</script>

<style scoped>
	.clearfix {
		display: block;
		content: "";
		clear: both;

	}

	.zindex {
		transform: scale(0) !important;
	}

	.home {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}
	section {
		flex: 1;
		/* overflow: hidden; */
	}

	header {
		height: 6rem;
		width: 100%;
		display: block;
		position: relative;
	}

	.home-top {
		height: 6rem;
		width: 100%;
		background: #3778DA;
		border-bottom-left-radius: 0.625rem;
		border-bottom-right-radius: 0.625rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	h4 {
		width: 100%;
		display: flex;
		justify-content: center;

	}

	h4 p {
		width: 8.88rem;
		font-size: 12px;
		color: #FFE0A3;
		font-weight: normal;
		margin-top: 0.4rem;
		display: flex;
	}

	h4 img {
		margin-right: 0.186667rem;
		width: 0.426667rem;
		height: 0.426667rem;
	}
	.suffix {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size:14px;
		color: #515151;
		margin-top:0.4rem;
		margin-bottom: 0.2rem;
	}
	
	.suffix-title {
		display: flex;
		width: 8.88rem;
		align-items: center;
	}
	
	.suffix-title img {
		width: 0.426667rem;
		height: 0.453333rem;
		margin-right: 0.106667rem;
	}
	.test {
		transform: none;
	}

	/deep/input[type="search"] {
		-webkit-appearance: none !important;
	}
	
</style>
