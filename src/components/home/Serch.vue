<template>
	<div class="serch" :style="{'padding-top':phoneheight}">
		<div class="serchTab">
			<img @click="goback" class="gobcak" src="@/assets/images/fanhui.png">
			<div class="serch-box">
				<input class="input-tab" @keyup.enter='goSerch(serchInput)' v-model="serchInput" placeholder="请输入设备名称" type="search">
				<span class="sp"><img @click="goSerch(serchInput)" src="@/assets/images/Vector.png" alt=""></span>
				<!-- <img class="more" src="@/assets/images/Frameadd.png" @click="showTab" alt=""  > -->
			</div>
			
			<!-- add列表 -->
			<ul class="addList" :class="addShow ? 'isVisable':''">
				<li  @click="addEquipment">新增直播设备</li>
				<li  @click="addEquipment2">新增工控作业</li>
				<li  @click="addEquipment3">新增工控服务</li>
				<li  @click="addEquipment4">采集服务管理</li>
			</ul>
			
			<!-- 新增直播设备表单 -->
			<Popupp v-if="popupVisible1">
				<div slot="popupForm">
					<h3>新增直播设备</h3>
					<form action="" onsubmit="return false">
					  <div>
						<span>设备主体</span>
						  <select name="eqBody">
							<option value="">采集机器采集机器</option>
							<option value="">采集机器采集机器</option>
						  </select>
					  </div>
					  <div>
						  <span>机器类型</span>
						  <select name="eqType" v-model="eqType" @change="chooseEq">
							<option value="收银机" selected>收银机</option>
							<option value="监控摄像头">监控摄像头</option>
						  </select>
					  </div>
					  <div>
						  <span>
							 设备编号
						  </span>
						  <input type="text" placeholder="输入设备编号">
					  </div>
					  <div v-if="eqType2">
						  <span>
								POS机号
						  </span>
						  <input type="text" placeholder="输入机号">
					  </div>
					  
					  
					  <!-- 监控摄像头下才有 -->
					  <div v-if="eqType1">
						  <span>
								IP地址
						  </span>
						  <input type="text" placeholder="输入IP地址">
					  </div>
					  <div v-if="eqType1">
						  <span>
								端口
						  </span>
						  <input type="text" placeholder="输入端口">
					  </div>
					  <div>
						<span>工控作业</span>
						  <select name="ss">
							<option value="">3</option>
							<option value="">4</option>
						  </select>
					  </div>
					  <div class="yemiao">
						<span>页面描述</span>
						  <textarea name="yemiao" placeholder="输入页面描述"  cols="30" rows="10"></textarea>
					  </div>
					  
					  <div class="formope">
						  <button class="onsub" @click="closepop">取消</button>
						   <button class="sub">保存</button>
					  </div>
					</form>
				</div>
			</Popupp>
			
			<!-- 新增工控作业 -->
			<Popupp v-if="popupVisible2">
				<div slot="popupForm">
					<h3>新增工控作业</h3>
					<form action="" onsubmit="return false">
					  <div>
						  <span>
							 工控作业名称
						  </span>
						  <input type="text" placeholder="输入工控作业名称">
					  </div>
					  <div v-if="eqType2">
						  <span>
								POS机号
						  </span>
						  <input type="text" placeholder="输入机号">
					  </div>
					  <div>
						<span>工控作业</span>
						  <select name="ss">
							<option value="">3</option>
							<option value="">4</option>
						  </select>
					  </div>
					  <div class="yemiao">
						<span>工控作业描述</span>
						  <textarea name="yemiao" placeholder="输入描述"  cols="30" rows="10"></textarea>
					  </div>
					  
					  <div class="formope">
						  <button class="onsub" @click="closepop">取消</button>
						   <button class="sub">保存</button>
					  </div>
					</form>
				</div>
			</Popupp>
			
			<!-- 新增工控服务 -->
			<Popupp v-if="popupVisible3">
				<div slot="popupForm">
					<h3>新增工控服务</h3>
					<form action="" onsubmit="return false">
					  <div>
						  <span>
							 工控程序名称
						  </span>
						  <input type="text" placeholder="输入工控作业名称">
					  </div>
					  <div v-if="eqType2">
						  <span>
								POS机号
						  </span>
						  <input type="text" placeholder="输入机号">
					  </div>
					  <div>
						<span>工控作业</span>
						  <select name="ss">
							<option value="">3</option>
							<option value="">4</option>
						  </select>
					  </div>
					  <div class="yemiao">
						<span>工控服务描述</span>
						  <textarea name="yemiao" placeholder="输入描述"  cols="30" rows="10"></textarea>
					  </div>
					  
					  <div class="formope">
						  <button class="onsub" @click="closepop">取消</button>
						   <button class="sub">保存</button>
					  </div>
					</form>
				</div>
			</Popupp>
			
			<!-- 采集服务管理 -->
			<Popupp v-if="popupVisible4">
				<div slot="popupForm">
					<h3>新增直播设备</h3>
					<form action="" onsubmit="return false">
					  <div>
						<span>设备主体</span>
						  <select name="eqBody">
							<option value="">采集机器采集机器</option>
							<option value="">采集机器采集机器</option>
						  </select>
					  </div>
					  <div>
						  <span>机器类型</span>
						  <select name="eqType" v-model="eqType">
							<option value="收银机">收银机</option>
							<option value="监控摄像头">监控摄像头</option>
						  </select>
					  </div>
					  <div>
						  <span>
							空间大小
						  </span>
						  <input type="text" placeholder="输入空间大小">
					  </div>
					  <div v-if="eqType2">
						  <span>
								采集机数
						  </span>
						  <input type="text" placeholder="输入机数">
					  </div>
					  <div class="yemiao">
						<span>页面描述</span>
						  <textarea name="yemiao" placeholder="输入页面描述"  cols="30" rows="10"></textarea>
					  </div>
					  
					  <div class="formope">
						  <button class="onsub" @click="closepop">取消</button>
						   <button class="sub">保存</button>
					  </div>
					</form>
				</div>
			</Popupp>
		</div>
	</div>
</template>

<script>
	import Popupp from'../Popupp.vue'
	import http from '@/common/api/request.js'
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{
				addShow:false,
				eqType:'',//新增直播设备-设备类型
				eqType1:false,
				eqType2:true,
				popupVisible1:false,
				popupVisible2:false,
				popupVisible3:false,
				popupVisible4:false,
				serchInput:'',
				phoneheight:localStorage.getItem('phonetopheight')
				
			}
			
		},
		props:['send'],
		components: {
			Popupp
		},
		
		methods:{
			// addList
			showTab(ss){
				
				if(this.addShow){
					
					this.addShow=false;
					
				}else{
					
					this.addShow=true;
				}
				
			},
			// 新增直播设备
			addEquipment(){
				this.popupVisible1=true
			},
			chooseEq(){
				if(this.eqType=='收银机'){
					this.eqType1=false
					this.eqType2=true
				}else{
					this.eqType1=true
					this.eqType2=false
				}
			},
			
			// 新增工控作业
			addEquipment2(){
				this.popupVisible2=true;
			},
			
			// 新增工控服务
			addEquipment3(){
				this.popupVisible3=true;
			},
			// 采集服务管理
			addEquipment4(){
				this.popupVisible4=true;
			},
			
			closepop(){
				this.popupVisible1=false;
				this.popupVisible2=false;
				this.popupVisible3=false;
				this.popupVisible4=false;
				this.addShow=false;
			},
			// 搜索
			goSerch(t){
				http.$axios({
					url:'device/getDevices',
					method:'get',
						params:{
								"org_id": Number(this.$store.state.userorgid),
							   "device_name":t
							}
						
					}).then(res=>{
						// console.log(res)
						
						this.$router.push({
							name:'video',
							query:{'url':res.data.data[0]}
							});
					}).catch(()=>{
						Toast("未搜索到该名称的设备")
					})
			},
			goback(){
				this.$router.back()
			}
			
		},
		watch:{
			eqType(newval,oldval){
				if(newval == 2){
					this.eqType=true
					this.eqType2=false
				}else if(newval == 1){
					this.eqType=false
					this.eqType2=true
				}
			},
			
			addShow(val,oldval){
				this.$emit('addnew',val)
			},
			popupVisible1(val){
				this.$emit('pop1',val)
			},
			popupVisible2(val){
				this.$emit('pop2',val)
			},
			popupVisible3(val){
				this.$emit('pop3',val)
			},
			popupVisible4(val){
				this.$emit('pop4',val)
			}
			
			
			
		}
		
		
	}
</script>

<style scoped>
	.serch{
		width: 100%;
		display: flex;
		justify-content: center;
		padding-top: 0.533333rem;
	}
	.serchTab{
		display: flex;
		justify-content: space-between;
		width: 8.88rem;
		align-items: center;
		
	}
	.serch-box{
		width: 8.88rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 0.8rem;
		border-radius: 0.4rem;
		background: #fff;
	}
	.serch-box img{
		width: 0.533333rem;
		height: 0.533333rem;
	}
	.serch .input-tab{
		width: 100%;
		height:100%;
		padding:0 0.8rem 0 0.266667rem;
	}
	.serch .sp img{
		position: absolute;
		right: 0.266667rem;
		top: 0.213333rem;
	}
	.more{
		position: absolute;
		right: 0;
	}
	.addList{
		width: 3.2rem;
		background-color: white;
		border-radius: 0.266667rem;
		text-align: center;
		position: absolute;
		right: 0;
		top:0.933333rem;
		display: none;
	}
	.addList li{
		font-size: 0.32rem;
		color: #515151;
		padding: 0.266667rem 0;
		border-bottom:1px solid #C4C4C480 ;
	}
	.addList li:last-child{
		border-bottom: none;
	}
	
	.isVisable{
		display: block;
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
	
	h3{
		font-size: 0.426667rem;
		color: #515151;
		border-bottom:1px solid #BFBFBF;
		height: 1.413333rem;
		text-align: center;
		line-height: 1.413333rem;
		font-weight: normal;
		
	}
	form div{
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.666667rem;
		align-items: center;
	}
	form div span{
		font-size: 14px;
		color: #515151;
	}
	form  input ,form  select{
		width: 4rem;
		height: 32px;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
		text-indent:8px;
	}
	
	
	
	.formope{
		display: flex;
		justify-content: space-between;
		margin: 0.5rem 0;
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
	.yemiao{
		display: flex;
		align-items: flex-start;
		margin:0;
	}
	.yemiao textarea{
		width: 4rem;
		height: 2.666667rem;
		overflow-y: scroll;
		text-indent: 8px;
		outline: none;
		padding-top: 8px;
		resize: none;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
	}
	.gobcak{
		margin-right:5px;
	}
	
	
</style>