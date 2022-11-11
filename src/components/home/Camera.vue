<template>
	<div class="camera" style="">
		<ul>
			<li
				v-for="(item,index) in camera"
				:key="index"
				 @touchstart="gtouchstart()"
			     @touchmove="gtouchmove()"
			     @touchend="showDeleteButton(item)"
			>
				<p :class="item.Status==0? 'outline':'online'">
					<img v-if="item.DeviceTypeName=='屏幕'" src="@/assets/images/pingmu.png">
					<img v-if="item.DeviceTypeName!='屏幕'" src="@/assets/images/Frame.png" >
				</p>
				<span>{{item.DeviceName}}</span>
				<!-- <div style="width: 70px;height: 70px;background-color: red;">
					<video src="item.PushUrl"></video>
				</div> -->
				
			</li>
			
			<!-- <li 
			@click="formRec"
			>
				<p style="background: #66d3b8;">
					<img src="@/assets/images/addroboot.png" alt="">
				</p>
				<span>添加设备</span>
			</li> -->
		</ul>
		
		<!-- 蒙尘 -->
		<!-- <Popupp v-if="popupVisible">
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
					  </p> -->
					  <!-- <p>
						  <span>
							  机器ID
						  </span>
						  <input type="number" v-model="rootForm.device_id" placeholder="输入机器ID">
					  </p> -->
					 <!-- <p>
						  <span>
							  设备账号
						  </span>
						  <input type="text" v-model="rootForm.device_account" placeholder="输入设备账号">
					  </p> -->
					  
					 <!-- <p>
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
							 v-for="(item,index) in device_types"
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
		 </Popupp> -->
	</div>
</template>

<script>
	import Popupp from'../Popupp.vue'
	import http from '@/common/api/request.js'
	import { Toast } from 'mint-ui';

	export default{
		inject:["reload"],
		data(){
			return{
				popupVisible:false,//添加设备表单是否显示
				updata:false,//设备是否添加成功
				// rootForm:{
				//   'device_ip':'',  //设备ip
				//   // 'device_id':'',//设备
				//   'device_account':'',//设备账号
				//   'device_password':'',//设备密码
				//   'org_id':Number(this.$store.state.userorgid) ,//机构id
				//   'push_url':'',//推流直播地址
				//   'device_type':1,//设备类型
				//   'state':1,//状态
				//   'device_name':'',//设备名称
				//   "scope": '', 
				// },
				
				// rules:{
				// 	device_name:{
				// 		rule:/^.+$/,
				// 		msg:"设备名称不能为空"
				// 	},
				// 	device_ip:{
				// 		rule:/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
				// 		msg:"ip地址输入错误"
				// 	},
				// 	// device_id:{
				// 	// 	rule:/^.+$/,
				// 	// 	msg:"设备id不能为空"
				// 	// },
				// 	// device_account:{
				// 	// 	rule:/^.+$/,
				// 	// 	msg:"设备账号不能为空"
				// 	// },
				// 	device_password:{
				// 		rule:/^.+$/,
				// 		msg:"设备密码不能为空"
				// 	},
				// 	device_type:{
				// 		rule:/^.+$/,
				// 		msg:"设备类型不能为空"
				// 	},
				// 	device_id:{
				// 		rule:/^.+$/,
				// 		msg:"设备id不能为空"
				// 	}
					
					
				// },
				
					
			}
		},
		props:["camera","cam"],
		
		created(){
			
		},
		
		components:{
			Popupp
		},
		
		methods:{
			//长按
			 gtouchstart(item) {
			      var self = this;
			      this.timeOutEvent = setTimeout(function () {
			        self.longPress(item);
			      }, 500);
			      return false;
			    },
			    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
			    showDeleteButton (n) {
					// console.log(n)
			      clearTimeout(this.timeOutEvent); //清除定时器
			      if (this.timeOutEvent != 0) {
					  		this.$parent.getCamerList()
							
								if(n.Status==0){
									 Toast("设备已离线")
									 return false
								}else{
								 this.$router.push({
									name:'video',
									query:{'url':n}
									});
							}
			      }
			      return false;
			    },
			    //手指移动
			    gtouchmove() {
			      clearTimeout(this.timeOutEvent); //清除定时器
			      this.timeOutEvent = 0;
			    },
			    longPress(val) {
			      this.timeOutEvent = 0;
			      console.log("长按");
			    },
			
			
			
			
			// 添加设备表单
			// formRec(){
			// 	this.popupVisible=true;
			// },
			
			// 保存添加设备信息
			
			// infPost(){
				
			// 	// 前端验证
			// 	if( !this.validate('device_name') ) return;
			// 	if( !this.validate('device_ip') ) return;
			// 	if( !this.validate('device_id') ) return;
			// 	// if( !this.validate('device_account') ) return;
			// 	if( !this.validate('device_password') ) return;
			// 	if( !this.validate('device_type') ) return;
			// 	this.rootForm.device_id=Number(this.rootForm.device_id)
			// 	console.log(this.rootForm)
				
			// http.$axios({
			// 	url:'/device',
			// 	data:this.rootForm
			// }).then(res=>{
			// 	// console.log(res)
			// 	Toast(res.data.result);
			// 	this.popupVisible=false;
			// 	this.updata=true
			// 	this.reload()
			// })
				
			// },
			//验证信息提示
			// validate( key ){
			// 	let bool = true;
			// 	if( !this.rules[key].rule.test( this.rootForm[key])  ){
			// 		//提示信息
			// 		Toast(this.rules[key].msg);
			// 		bool = false;
			// 		return false;
			// 	}
			// 	return bool;
			// },
			// 关闭蒙尘
			// changVisible(){
			// 	this.popupVisible=false;
			// },
				
		},
		
		// watch:{
			// popupVisible(val){
			// 	this.$emit('tofa',val)
			// },
			// updata(val){
			// 	this.$emit('camlist',val)
			// },
			// cam(val){
			// 	this.camlist=val
			// }
			
		// }
		
	}
</script>

<style scoped>
	.camera{
		width: 100%;
		margin-top:0.5rem;
		display: flex;
		justify-content: center;
	}
	.camera ul{
		width: 8.88rem;
		height: 2.4rem;
		overflow: scroll;
		white-space:nowrap;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow-y:hidden;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */
		
 	}
	.camera ul::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
	.camera ul li{
		font-size: 0.373333rem;
		color: #fff;
		text-align: center;
		display: inline-block;
		margin-right: 0.746667rem; 
		width: 1.6rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		
	}
	/* .camera ul li span{
		width: 1.6rem;
		overflow: hidden;
		white-space: nowrap;
		
	} */
	.camera ul li p{
		width: 1.6rem;
		height: 1.6rem;
		
		border-radius: 0.266667rem;
		display: flex;
		flex-direction:column;
		align-items:center;
		justify-content: center;
		margin-bottom: 0.213333rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
	}
	.camera ul li p img{
		width: 1.066667rem;
		height: 1.066667rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
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
	
</style>