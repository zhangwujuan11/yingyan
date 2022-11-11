<template>
	<div class="abnormal clearfix" ref="abnormal">
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">今天</mt-tab-item>
			<mt-tab-item id="2">昨天</mt-tab-item>
			<mt-tab-item id="3">更早</mt-tab-item>
		</mt-navbar>

		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="wrapper">
					<div>
						<ul v-if="ExceptionList.length!=0" class="clearfix">
							<li v-for="(item,index) in ExceptionList" :key="index">
								<p class="createAt">{{item.CreateAt}}</p>

								<div class="showimg">
									<div class="cashier">
										<img class="showt" src="@/assets/images/Cashier2.png" alt="">
										<img class="showi" :src="item.Videos[0].VideoCoverUrl" alt="">
									</div>
									<p class="borde"></p>
									<div class="monitor">
										<img class="showt" src="@/assets/images/monitor2.png" alt="">
										<img class="showi" :src="item.Videos[1].VideoCoverUrl" alt="">
									</div>
								</div>
								<div class="showinfo">
									<p>{{item.DeviceNameMonitor}},{{item.DeviceNamePos}}设备出现异常操作，请尽快查阅处理。</p>
									<button @click="gounnormal(item)">查看</button>
								</div>
							</li>
						</ul>
						<div class="nodata" v-if="ExceptionList.length==0">
							<img src="@/assets/images/nodata.png" alt="">
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div class="wrapper2">
					<div>
						<ul v-if="aftertodyList.length!=0" class="clearfix">
							<li v-for="(item,index) in aftertodyList" :key="index">
								<p class="createAt">{{item.CreateAt}}</p>

								<div class="showimg">
									<div class="cashier">
										<img class="showt" src="@/assets/images/Cashier2.png" alt="">
										<img class="showi" :src="item.Videos[0].VideoCoverUrl" alt="">
									</div>
									<p class="borde"></p>
									<div class="monitor">
										<img class="showt" src="@/assets/images/monitor2.png" alt="">
										<img class="showi" :src="item.Videos[1].VideoCoverUrl" alt="">
									</div>
								</div>
								<div class="showinfo">
									<p>{{item.DeviceNameMonitor}},{{item.DeviceNamePos}}设备出现异常操作，请尽快查阅处理。</p>
									<button @click="gounnormal(item)">查看</button>
								</div>
							</li>
						</ul>
						<div class="nodata" v-if="aftertodyList.length==0">
							<img src="@/assets/images/nodata.png" alt="">
						</div>
					</div>
				</div>
				
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<div class="wrapper3">
					<div>
						<ul v-if="yesterdayList.length!=0" class="clearfix">
							<li v-for="(item,index) in yesterdayList" :key="index">
								<p class="createAt">{{item.CreateAt}}</p>
				
								<div class="showimg">
									<div class="cashier">
										<img class="showt" src="@/assets/images/Cashier2.png" alt="">
										<img class="showi" :src="item.Videos[0].VideoCoverUrl" alt="">
									</div>
									<p class="borde"></p>
									<div class="monitor">
										<img class="showt" src="@/assets/images/monitor2.png" alt="">
										<img class="showi" :src="item.Videos[1].VideoCoverUrl" alt="">
									</div>
								</div>
								<div class="showinfo">
									<p>{{item.DeviceNameMonitor}},{{item.DeviceNamePos}}设备出现异常操作，请尽快查阅处理。</p>
									<button @click="gounnormal(item)">查看</button>
								</div>
							</li>
						</ul>
						<div class="nodata" v-if="yesterdayList.length==0">
							<img src="@/assets/images/nodata.png" alt="">
						</div>
					</div>
				</div>
				
			</mt-tab-container-item>
		</mt-tab-container>



		<!-- 没有数据时 -->
		<!-- <div class="nodata" v-if="ExceptionList.length==0">
			<img src="@/assets/images/nodata.png" alt="">
		</div> -->
	</div>

</template>

<script>
	import http from '@/common/api/request.js'
	//插件
	import BetterScroll from '@better-scroll/core'
	export default {
		props: ['Exception'],
		data() {
			return {
				selected: '1',
				ExceptionList: [],
				aftertodyList: [],
				yesterdayList:[]
			}
		},
		methods: {
			gounnormal(item) {
				let url1 = item.Videos[0].VideoUrl
				let url2 = item.Videos[1].VideoUrl
				let remark = item.Remark
				let jobName = item.JobName
				let createAt = item.CreateAt
				let createBy = item.CreateBy

				this.$router.push({
					path: "/unnormal",
					query: {
						'url1': url1,
						'url2': url2,
						'remark': remark,
						'jobName': jobName,
						'createAt': createAt,
						'createBy': createBy
					}
				})
			},
			aaa(){
				console.log(this.$refs.wapp.style)
			}
		},
		created() {
			// 今天获取工控服务列表
			http.$axios({
					url: 'job/getJobs',
					method: 'GET',
					params: {
						"org_id": this.$store.state.userorgid,
						"type": 1
					}
				}).then(res => {
					this.ExceptionList = res.data.data
				}).catch(() => {
					this.ExceptionList = []
				})
				// 昨天获取工控服务列表
				http.$axios({
					url: 'job/getJobs',
					method: 'GET',
					params: {
						"org_id": this.$store.state.userorgid,
						"type": 2
					}
				}).then(res => {
					this.aftertodyList = res.data.data
					
				}).catch(() => {
					this.aftertodyList = []
				})
				
				// 昨天之前获取工控服务列表
				http.$axios({
					url: 'job/getJobs',
					method: 'GET',
					params: {
						"org_id": this.$store.state.userorgid,
						"type": 3
					}
				}).then(res => {
					this.yesterdayList = res.data.data
					
				}).catch(() => {
					this.yesterdayList = []
				})
				
		},
		watch: {
			ExceptionList() {
				this.$nextTick(() => {
					new BetterScroll('.wrapper', {
					 movable: true,
						zoom: true,
						probeType: 2,
						click: true
					})
				})
			},
			selected(n){
				if(n=='2'){
					this.$nextTick(() => {
						new BetterScroll('.wrapper2', {
							movable: true,
							zoom: true,
							probeType: 2,
							click: true
						})
					})
				}else if(n=='3'){
					this.$nextTick(() => {
						new BetterScroll('.wrapper3', {
							movable: true,
							zoom: true,
							probeType: 2,
							click: true
						})
					})
				}
			}
			
		}
	}
</script>

<style scoped>
	.abnormal {
		width: 100%;
		position: relative;

	}

	.abnormal ul {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 0.4rem;
	}

	.abnormal ul li {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 8.88rem;
		background-color: #fff;
		border-radius: 0.266667rem;
		padding: 0.24rem;
		margin-bottom: 0.32rem;
	}

	.abnormal ul li .showimg {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;

	}

	.abnormal .showimg .showi {
		width: 4rem;
		height: 2.666667rem;
		border: 1px solid #C4C4C44D;
	}

	.cashier,
	.monitor {
		position: relative;
	}

	.showt {
		position: absolute;
		right: 0;
		top: 0.053333rem;
		width: 1.226667rem;
		height: 0.373333rem;
	}

	.borde {
		width: 0;
		border: 1px solid #C4C4C44D;
		margin: 0 0.266667rem;
		height: 2.133333rem;
	}

	.showinfo {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: top 12px;
		;
	}

	.showinfo p {
		color: #515151;
		font-size: 14px;
		width: 5.6rem;
	}

	.showinfo button {
		width: 1.866667rem;
		height: 0.8rem;
		color: #fff;
		background-color: #3778DA;
		border-radius: 0.133333rem;
		outline: none;
		border: none;
	}

	.godown {
		z-index: -1;
	}

	.nodata {
		text-align: center;
		margin-top: 0.8rem;
	}

	.createAt {
		width: 100%;
		font-size: 14px;
		color: #515151;
		text-align: left;
		margin-bottom: 0.266667rem;
	}

	.mint-tab-container-item {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: calc(100vh - 10rem);
		margin-top: 0.4rem;
	}

	.wrapper,.wrapper2,.wrapper3{
		flex: 1;
		overflow: hidden;
	}
</style>
