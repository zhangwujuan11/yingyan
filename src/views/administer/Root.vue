<template>
	<div class="root">
		<Administrtab>
			<span>设备管理</span>
		</Administrtab>
		<div class="journal">
			<ul>
				<li 
				v-for="(item,index) in cameraList"
				:key="index"
				 class="li_vessel"
				 data-type="0"
				>
				 <div style="width: 100%;"  @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="oneself">
					<div class="contant">
					 <p>
						<img v-if="item.DeviceTypeName=='屏幕'" src="@/assets/images/pingmu.png">
						<img v-if="item.DeviceTypeName!='屏幕'" src="@/assets/images/Frame.png" >
					 </p>
					 <span>{{item.DeviceName}}</span>
					  
					</div>
				 </div>
				 
				 <div class="removeBtn" @click="remove(item)" :data-index="index">删除</div>
				</li>
			</ul>
			<mt-button size="large" type="primary" @click="formRec">添加设备</mt-button>
		</div>
		
		
		<!-- 蒙尘 -->
		 <Popupp v-if="popupVisible">
			 <div slot="popupForm">
				 <h3>添加设备</h3>
				 <form action="" onsubmit="return false">
					 <p>
						<span>设备名称</span>
						<input type="text" v-model='rootForm.device_name'>
					 </p>
					  <p>
						<span>机器IP</span>
						<input type="num" v-model='rootForm.device_ip'>
					  </p>
					  <p>
						  <span>
							  密码
						  </span>
						  <input type="password" v-model="rootForm.device_password" placeholder="输入密码">
					  </p>
					  <p>
						  <span>
							  设备类型
						  </span>
						  <select name="type" v-model="rootForm.device_type">
							<option
							 v-for="(item,index) in device_type_name"
							 :key="index"
							 :value='index+ 1'
							>
							 {{item.device_type_name}}
							</option>
							
						  </select>
					  </p>
					  
					  <div class="formope">
						  <button class="onsub" @click="changVisible">取消</button>
						  <button class="sub" @click='infPost' >保存</button>
					  </div>
				 </form>
			 </div>
		 </Popupp>
		 <Foot></Foot>
	</div>
</template>

<script>
	import Popupp from'@/components/Popupp.vue'
	import Administrtab from '@/components/Administrtab.vue'
	import http from '@/common/api/request.js'
	import { delroot,journal } from '@/common/api/adminCenter'
	import Foot from '@/components/Foot.vue'
	import { Toast,MessageBox } from 'mint-ui'
	// import BetterScroll from '@better-scroll/core'
	export default{
		inject:["reload"],
		data(){
			return{
				startX: 0, //滑动开始
				endX: 0, //滑动结束
				popupVisible:false,//添加设备表单是否显示
				updata:false,//设备是否添加成功
				rootForm:{
				  'device_ip':'',  //设备ip
				  // 'device_id':'',//设备
				  'device_account':'',//设备账号
				  'device_password':'',//设备密码
				  'org_id':Number(JSON.parse(localStorage.getItem('urlUserinfor')).orgId)   ,//机构id
				  'push_url':'',//推流直播地址
				  'device_type':1,//设备类型
				  'state':1,//状态
				  'device_name':'',//设备名称
				  "scope": '', 
				},
				device_type_name: [], //设备类型名称
				cameraList:[],
				rules:{
					device_name:{
						rule:/^.+$/,
						msg:"设备名称不能为空"
					},
					device_ip:{
						rule:/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
						msg:"ip地址输入错误"
					},
					// device_id:{
					// 	rule:/^.+$/,
					// 	msg:"设备id不能为空"
					// },
					// device_account:{
					// 	rule:/^.+$/,
					// 	msg:"设备账号不能为空"
					// },
					device_password:{
						rule:/^.+$/,
						msg:"设备密码不能为空"
					},
					device_type:{
						rule:/^.+$/,
						msg:"设备类型不能为空"
					},
					device_id:{
						rule:/^.+$/,
						msg:"设备id不能为空"
					}
				},
			}
		},
		components:{
			Popupp,Administrtab,Foot
		},
		created(){
			// 获取设备列表
			http.$axios({
					url: 'device/getDevices',
					method: "GET",
					params: {
						"org_id": this.$store.state.userorgid
					}
			
				}).then(res => {
					this.cameraList = res.data.data
			
				})
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
						this.device_type_name = res.data.data
						// new BetterScroll('.wrapper', {
						//    movable: true,
						//    zoom: true,
						// 	probeType:2,
						// 	click:true
						//  })
					})
					
			})
		},
		methods:{
			// 添加设备表单
			formRec(){
				this.popupVisible=true;
			},
			// 保存添加设备信息
			infPost(){
				if( !this.validate('device_name') ) return;
				if( !this.validate('device_ip') ) return;
				if( !this.validate('device_id') ) return;
				// if( !this.validate('device_account') ) return;
				if( !this.validate('device_password') ) return;
				if( !this.validate('device_type') ) return;
				this.rootForm.device_id=Number(this.rootForm.device_id)
			http.$axios({
				url:'/device',
				data:this.rootForm
			}).then(res=>{
				Toast(res.data.result);
				this.popupVisible=false;
				this.updata=true
				journal({
					"appName": "eagle",
					"methodName": "添加设备",
					"methodRemark": "添加了"+this.rootForm.device_name+"设备" ,
					"optReqParam": "",
					"optResInfo": res.data.result,
					"reqUrl": "",
					"orgId":Number(JSON.parse(localStorage.getItem('urlUserinfor')).orgId)
				})
				this.reload()
			}).catch(()=>{
				Toast('添加失败，请重试');
			})
				
			},
			//验证信息提示
			validate( key ){
				let bool = true;
				if( !this.rules[key].rule.test( this.rootForm[key])  ){
					//提示信息
					Toast(this.rules[key].msg);
					bool = false;
					return false;
				}
				return bool;
			},
			// 关闭蒙尘
			changVisible(){
				this.popupVisible=false;
			},
		   // 向左滑动出现删除按钮时，点击商品信息区域取消删除
			oneself() {
			  if (this.checkSlide()) {
				this.restSlide();
			  } 
			},
			//滑动开始
			touchStart(e) {
			  // 记录初始位置
			  this.startX = e.touches[0].clientX;
			},
			//滑动结束
			touchEnd(e) {
			  // 当前滑动的父级元素
			  let parentElement = e.currentTarget.parentElement;
			  // 记录结束位置
			  this.endX = e.changedTouches[0].clientX;
			  // 左滑大于30距离删除出现
			  if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
				this.restSlide();
				parentElement.dataset.type = 1;
			  }
			  // 右滑
			  if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
				this.restSlide();
				parentElement.dataset.type = 0;
			  }
			  this.startX = 0;
			  this.endX = 0;
			},
			//判断当前是否有滑块处于滑动状态
			checkSlide() {
			  let listItems = document.querySelectorAll(".li_vessel");
			  for (let i = 0; i < listItems.length; i++) {
				if (listItems[i].dataset.type == 1) {
				  return true;
				}
			  }
			  return false;
			},
			//复位滑动状态
			restSlide() {
			  let listItems = document.querySelectorAll(".li_vessel");
			  // 复位
			  for (let i = 0; i < listItems.length; i++) {
				listItems[i].dataset.type = 0;
			  }
			},
			//删除数据信息
			remove(e) {
				MessageBox.confirm('确定删除'+e.DeviceName+'设备?').then(action => {
				  delroot(e).then(res=>{
					  console.log(res)
						journal({
							"appName": "eagle",
							"methodName": "删除设备",
							"methodRemark": "删除了"+e.DeviceName+"设备" ,
							"optReqParam": "",
							"optResInfo": res.data.result,
							"reqUrl": "",
							"orgId":Number(JSON.parse(localStorage.getItem('urlUserinfor')).orgId)
						})
				  		Toast("设备删除成功")
						this.reload()
				  }).catch(()=>{
					  Toast("设备删除失败，请稍后重试")
				  })
				});
			  
			  
			}
			
			
			
			
			
			
				
		}
	}
</script>

<style scoped>
	
	
	 
	.li_vessel {
	  transition: all 0.2s;
	}
	.li_vessel[data-type="0"] {
	  transform: translate3d(0, 0, 0);
	}
	.li_vessel[data-type="1"] {
	  transform: translate3d(calc(50% - 4.44rem - 128px), 0, 0);
	}
	.li_vessel .removeBtn {
	  width: 64px;
	  height: 2.133333rem;
	  background: #FF2638;
	  font-size: 16px;
	  color: #fff;
	  text-align: center;
	  line-height: 2.133333rem;
	  position: absolute;
	  top: 0px;
	  right:calc(50% - 4.44rem - 128px);
	  border-radius: 0.266667rem;
	}
	/* 左边的图片样式 */
	.contant {
	  width: 100%;
	  height:2.133333rem;
	  background-color: white;
	  display: flex;
	  align-items: center;
	  justify-content: left;
	  padding: 0 0.32rem;
	  box-sizing: border-box;
	  font-size: 0.426667rem;
	  margin-bottom: 0.32rem;
	  border-radius: 0.266667rem;
	}
	 
	
	
	
	
	
	
	
	.root{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.mint-popup{
		border-radius: 0.266667rem;
		width: 8rem;
		height: 9.066667rem;
	}
	
	form{
		width: 100%;
		height: 100%;
		margin-top: 0.64rem;
		border-radius: 0.266667rem;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 1.2rem 1.04rem 1.2rem;
		box-sizing: border-box;
	}
	
	.mint-popup h3{
		font-size: 0.426667rem;
		color: #515151;
		border-bottom:1px solid #BFBFBF;
		height: 1.413333rem;
		text-align: center;
		line-height: 1.413333rem;
		font-weight: normal;
		
	}
	form p{
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.666667rem;
		align-items: center;
	}
	form p span{
		font-size: 14px;
		color: #515151;
	}
	form  input,form  select{
		width: 4rem;
		height: 32px;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
		text-indent:8px;
	}
	form .roobtip{
		height: 0.906667rem;
	}
	form .roobtip p{
		display: flex;
		justify-content:center;
		width: 4rem;
		height: 32px;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
	}
	form .roobtip input{
		width: 0.853333rem;
		border: none;
		/* background-color: red; */
		text-indent: 0.2rem;
	}
	form .roobtip b{
		display: flex;
		font-weight: normal;
		width: 0.5px;
		height: 0.853333rem;
		line-height: 0.853333rem;
	}
	.formope{
		display: flex;
		justify-content: space-around;
		margin-top: 1.333333rem;
	}
	.formope button{
		width: 2.4rem;
		height: 30px;
		border-radius: 0.133333rem;
		color: #3A3A3A;
		outline: none;
		border: 1px solid #51515180;
		background-color: white;
	}
	.formope .sub{
		background-color: #278DE5;
		color: #fff;
		border: none;
	}
	
	.online{
		background: #66d3b8;
	}
	.outline{
		background: #C4C4C4;
	}
	/deep/.mint-popup {
		z-index: 999 !important;
	}
	/deep/.v-modal{
		z-index: 998 !important;
	}
	.journal{
		flex: 1;
		width: 100%;
		display: flex;
		margin-top: 0.666667rem;
		flex-direction: column;
		overflow-y: scroll;
		overflow-x: hidden;
		align-items: center;
	}
	.journal ul{
		width: 8.88rem;
		
	}
	.journal ul li{
		
	}
	.journal ul li p{
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 0.266667rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(50deg, rgba(213, 255, 180, 0.53) 0%, #37D7B0 100%);
		margin-right: 0.24rem;
	}
	.journal ul li img{
		width: 1.066667rem;
		height: 1.066667rem;
	}
	.tips{
		width: 8.88rem;
		font-size: 0.373333rem;
		color: #1E1E1E;
		margin: 0.5rem 0 0.213333rem 0;
	}
	.tips span{
		display: flex;
		float: right;
		font-size: 12px;
		align-items: center;
	}
	.mint-button{
		width: 8.88rem;
	}
	
</style>