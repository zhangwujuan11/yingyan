<template>
	<div class="administr">
		<div class="Administrtab" :style="{'padding-top':phoneheight}">
			<div @click="gohomePage">
				<img src="@/assets/images/back.png" alt="">
				<slot>
					<span>
						<slot>鹰眼</slot>
					</span>
				</slot>
			</div>
		</div>
		
		<section>
			<div>
			<div class="admintop">
				<div class="adtopcon">
					<div class="logotip">
						<img src="@/assets/images/Group97.png" alt="">
						<div>
							<span>鹰眼</span>
							<br>
							为各商户提供全方位的异常视频监管
							、设备配置等服务。
						</div>
					</div>
					<div class="injion">
						<p>
							<img src="@/assets/images/smile.png" alt="">
							<span>使用小助手</span>
						</p>
						<button v-if="isadmin==1"  @click='gohome'>进入应用</button>
						<button v-if="isadmin==0" @click="goapplyBtn">申请进入</button>
						<button v-if="isadmin==2" @click="nothing" class="bgapply">等待激活</button>
					</div>
				</div>
			</div>
			<div class="roles">
				<div>
					<h3>组织架构</h3>
					<ul>
						<li @click="goMember">成员管理<span>Member management</span></li>
						<!-- <li @click="goRole">角色管理 <span>Role management</span></li> -->
						<!-- <li @click="goPrivileges">管理员权限<span>Administrator privileges</span></li> -->
					</ul>
				</div>
			</div>
			<!-- 日志管理 -->
			<Journal :indexname="jouranlList"></Journal>
			
			<div class="configure" v-if="baseform.role_id =='admin' || baseform.role_id =='manage'">
				<div class="configCon">
					<h3>设备管理</h3>
					<div  @click="goDevice">开始管理</div>
				</div>
			</div>
			
			
			<div class="configure">
				<div class="configCon">
					<h3>需求管理</h3>
					<div>开始管理</div>
				</div>
			</div>
			<div class="configure">
				<div class="configCon">
					<h3>评论管理</h3>
					<div>开始管理</div>
				</div>
			</div>
			
			<!-- <Ability></Ability> -->
			<Control></Control>
			</div>
		</section>
		<Foot></Foot>
	</div>
</template>

<script>
	import Ability from '@/components/management/Ability.vue'
	import Journal from '@/components/management/Journal.vue'
	import Control from '@/components/management/Control.vue'
	import Foot from '@/components/Foot.vue'
	import { addadmin,userinfor,ActivationState,authorities,getjournal } from '@/common/api/adminCenter'
	// import {ChatClient} from "@qians/quake_ws_client-wasm";
	//插件
	// import BScroll from '@better-scroll/core'
	import { Toast } from 'mint-ui'
	export default{
		inject:["reload"],
		components:{
			Ability,
			Journal,
			Control,
			Foot
		},
		data(){
			return{
				phoneheight:localStorage.getItem('phonetopheight'),
				isadmin:null,
				baseform:{
						"username":localStorage.getItem('username'),
						"org_id": Number(this.$route.query.orgId) ,
						"nickname": "",
						"role_id":'',
						"avatar": "./images/Rectangl24.png",
						"status": 1,
					},
				jouranlList:[]
			}
		},
		
		created() {
			// this.chat()
			// 暂时数据
			// this.$router.push({
			// 	path:'',
			// 	query:{
			// 			"adminUsername": "admin123",
			// 			"orgId": 68479875,//机构id
			// 			"token":"fca7d3e9-ba9d-4d02-bb2e-5e2869e6e836",
			// 			}
			// 	})
			
			
			
			
			// 储存路径携带用户信息
			 localStorage.setItem('urlUserinfor',JSON.stringify(this.$route.query) )
			this.$store.commit('USER_IMG', this.$route.query)
			// 解析token
			authorities(this.$route.query.token).then(res=>{
					localStorage.setItem('username',JSON.stringify(res.data.name))
					this.usermassage()
					this.$nextTick(()=>{
				//获取用户信息
					userinfor({orgId:JSON.parse(localStorage.getItem("urlUserinfor")).orgId,username:JSON.parse(localStorage.getItem("username")) } ).then(res=>{
						this.isadmin=res.data.data.ActivationState
						this.baseform.role_id=res.data.data.RoleId
						// console.log(res.data.data)
					})
					// 日志
					getjournal({
							"appName": "eagle",
							"page": 1,
							"pageSize": 10,
							// "username": res.data.name,
							"orgId":Number(this.$route.query.orgId)
						}).then(res=>{
							this.jouranlList=res.data.data.content.reverse()
							if(this.jouranlList.length > 4){
								this.jouranlList.length=4
								for(var i=0;i<this.jouranlList.length;i++){
									this.jouranlList[i].open=true
								}
							}else{
								for(var i=0;i<this.jouranlList.length;i++){
									this.jouranlList[i].open=true
								}
							}
							
						})									  
					})
					
				})
		},
		methods:{
			goMember(){
				let iscontrol=JSON.parse(localStorage.getItem('urlUserinfor')) 
				if(this.isadmin==1){
					this.$router.push({
						name:'member',
						query:{role:this.baseform.role_id}
					})
				}else{
					this.$router.push({
						name:'nodata'
					})
				}
			},
			goRole(){
				if(this.isadmin==1){
					this.$router.push({
					name:'role'
				})
				}else{
					this.$router.push({
						name:'nodata'
					})
				}
				
			},
			goPrivileges(){
				if(this.isadmin==1){
					this.$router.push({
						name:'privileges'
					})
				}else{
					this.$router.push({
						name:'nodata'
					})
				}
				
			},
			gohome(){
				this.$router.push({
					name:'home'
				})
			},
			goDevice(){
				this.$router.push({
					name:'device'
				})
			},
		
			// 申请激活状态
			goapplyBtn(){
				this.baseform.activation_state=2
				this.baseform.username=JSON.parse(localStorage.getItem("username")) 
				this.baseform.role_id='normal'
				ActivationState(this.baseform).then(res=>{
					// console.log(res.data)
					this.isadmin=2
					Toast("申请成功")
					
				})
			},
			// 等待激活
			nothing(){
				Toast("请耐心等待")
			},
			// 向原生端发送信息
		   gohomePage(){
			   localStorage.removeItem('urlUserinfor')
			   localStorage.removeItem('username')
			   window.flutter_inappwebview.callHandler('jsBack') 
			   // let ua = navigator.userAgent.toLowerCase();
			   // //android终端
			   // let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; 
			   // //ios终端
			   // let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				 // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				 //   window.jsBack.postMessage();
				 // } else if(/(Android)/i.test(navigator.userAgent)) {
				 //    window.flutter_inappwebview.callHandler('jsBack')       
				 // }    
					
		   },
		   usermassage(){
			   let adminusername=this.$route.query.adminUsername
			   let username=JSON.parse(localStorage.getItem("username"))
			   // console.log(username)
			   if(adminusername == username){
			   	// 添加用户，admin创建组织
			   	addadmin({
			   	"username":username,
			   	"org_id": Number(this.$route.query.orgId) ,
			   	"nickname": "",
			   	"avatar": "./images/Rectangl24.png",
				"role_id":'admin',
			   	"status": 1
			   }).catch(err=>{
			   			console.log(err)
			   		})
			   }else{
			   	// 添加用户，admin创建组织
			   	addadmin({
			   	"username":username,
			   	"org_id": Number(this.$route.query.orgId) ,
			   	"nickname": "",
			   	"role_id":'normal',
			   	"avatar": "./images/Rectangl24.png",
			   	"status": 1
			   }).catch(err=>{
			   			console.log(err)
			   		})
			   		// console.log(username)
			   }
		   }
			// 连接wasm
			// chat(){
			// 	// console.log("[Views: HomeView.vue]wait for init client")
			// 	//FIXME: change k32212 to username(token)
			// 	const that = this
			// 	ChatClient.init("k32212", 'levitas.quakeai.tech:31033', 'eye_h5',true)
			// 	this.ChatClient = ChatClient
			// 	setTimeout(function(){
			// 		console.log("[Views: HomeView.vue]chat client has been inited: ", that.ChatClient.get_group_chridren())
			// 	},5000)
			// },
			
		}
	}
</script>

<style scoped>
	.administr{
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
			overflow: scroll;
		}
	section{
		flex: 1;
		overflow: scroll;
		
	}
	section::-webkit-scrollbar {
	
	  display: none;
	
	}
	.admintop{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.admintop .adtopcon{
		width: 8.88rem;
		display: flex;
		justify-content: space-between;
	}
	.admintop .logotip{
		width: 72%;
		height: 1.6rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.32rem;
		color: #1E1E1E;
		margin-top: 0.533333rem;
		align-items: center;
		line-height: 0.5rem;
	}
	.admintop .logotip span{
		font-size: 14px;
		font-weight: bold;
	}
	.admintop .logotip img{
		margin-right: 0.266667rem;
		width: 60px;
		height: 60px;
	}
	.injion{
		width:28%;
		height: 1.6rem;
		font-size: 0.32rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0.533333rem;
	}
	.injion p{
		display: flex;
		align-items: center;
		margin-bottom: 0.48rem;
		color: #1D76DE;
	}
	.injion img{
		width:0.38rem;
		height: 0.38rem;
	}
	.injion button{
		color: white;
		background-color: #1D76DE;
		width: 1.76rem;
		height: 0.64rem;
		border: none;
		outline: none;
		border-radius: 0.133333rem;
	}
	.roles{
		width: 100%;
		font-size: 0.373333rem;
		color: white;
		display: flex;
		justify-content: center;
	}
	.roles div{
		width: 8.88rem;
		margin-top: 0.933333rem;
	}
	
	.roles h3{
		font-size: 0.373333rem;
		color: #1E1E1E;
		width: 8.88rem;
	}
	.roles ul li{
		width: 100%;
		height: 2rem;
		border-radius: 0.266667rem;
		background: linear-gradient(180deg, #24C6DC 0%, #514A9D 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 0.266667rem;
	}
	.roles ul li:nth-child(2){
		background: linear-gradient(180deg, #EC6F66 0%, #F3A183 100%);
	}
	.roles ul li:last-child{
		background: linear-gradient(180deg, #283048 0%, #8CA6DB 100%);
	}
	.configure{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.configure .configCon{
		width: 8.88rem;
	}
	.configure .configCon h3{
		font-size: 0.373333rem;
		color: #1E1E1E;
		margin:8px 0;
	}
	.configure .configCon div{
		width: 100%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		border-radius: 0.266667rem;
		background: white;
		font-size: 0.373333rem;
		color: #1D76DE;
		text-align: center;
	}
	.injion .bgapply{
		background-color:darkorange
	}
	.Administrtab {
		width: 100%;
		padding-top: 0.533333rem;
		height: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Administrtab div{
		width: 8.88rem;
		font-size: 0.426667rem;
		display: flex;
		align-items: center;
	}
	.Administrtab div span{
		margin-left: 0.213333rem;
		font-weight: bold;
	}
	
</style>