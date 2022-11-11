<template>
	<div class="member">
		<Administrtab>
			<span>成员管理</span>
		</Administrtab>

		<Serch></Serch>
		<!-- 人员分类列表 -->
		<div class="classification">
			<div class="classificationCon">
				<p @click="datalist=1,apptips='成员列表'">
					<span>组织成员</span>
					<span>{{ahgg.length}}</span>
				</p>
				<p @click="datalist=2,apptips='未激活成员列表'">
					<span>未激活人数</span>
					<span>{{applylist.length}}</span>
				</p>
			</div>
		</div>

		<div class="membertitle">
			<h3>{{apptips}}</h3>
		</div>
		<section>
			<!-- 成员列表 -->
			<div class="memberList">
				<div class="memberListcon">
					<ul v-if="datalist==1">
						<li v-for="(item,index) in ahgg" :key="index">
							<div class="liTop">
								<div class="liTop-left">
									<img :src="item.Avatar" alt="">
									<p class="thensanwith">
										<span>{{item.Username}}</span>
										<span>{{item.role | RoleName}}</span>
									</p>
								</div>
								<img class="nomal" src="@/assets/images/nomal.png" alt="">
							</div>
							<p class="deletBtn">
								<mt-button 
								v-if="item.role !='admin' && role !='normal' && item.role != role" 
								size="small" 
								@click='delpoeple(item)' 
								type="danger"
								>
								删除
								</mt-button>
							</p>
						</li>
					</ul>


					<ul v-if="datalist==2">
						<li v-for="(item,index) in applylist" :key="index">
							<div class="liTop">
								<div class="liTop-left">
									<img :src="item.Avatar" alt="">
									<p class="thensanwith">
										<span>{{item.Username}}</span>
										<!-- <span>+8615268452003</span> -->
										<!-- <span>{{item.RoleId}}</span> -->
									</p>
								</div>
								<span class="applylive">申请激活</span>
							</div>
							<p class="deletBtn" v-if="role =='admin' || role =='manage'" >
								<mt-button size="small" @click="pass(item)" type="primary">通过</mt-button>
								<mt-button size="small" @click="fail(item)" type="danger">不通过</mt-button>
							</p>
						</li>
					</ul>

				</div>
				<mt-button size="large" type="primary" @click="addmember">邀请成员</mt-button>
			</div>
		</section>
		<Foot></Foot>


		<!-- 蒙尘 -->
		<Popupp v-if="popupVisible">
			<div slot="popupForm">
				<h3>邀请成员</h3>
				<form class="appl" action="" onsubmit="return false">
					<p>
						<img style="width: 0.426667rem;height: 0.426667rem;" src="@/assets/images/Vector.png" alt="">
						<input type="search" placeholder="输入姓名、邮箱或手机号">
					</p>

					<div class="formope">
						<button class="onsub" @click="changVisible">取消</button>
						<button class="sub">确定</button>
					</div>
				</form>
			</div>
		</Popupp>

		<!-- 身份选取 -->
		<Popupp v-if="ible">
			<div class="idenPop" slot="popupForm">
				<h3>分配成员身份</h3>
				<select class="idenlisy" v-model="sheetVisible">
					<option v-for="(item,index) in actions" :key="index" :value="item.role_id">
						{{item.role_name}}
					</option>
				</select>
				<button @click="passs" style="margin-top: 0.8rem;" class="sub">确定</button>
			</div>
		</Popupp>
	</div>
</template>

<script>
	import Administrtab from '@/components/Administrtab.vue'
	import Foot from '@/components/Foot.vue'
	import Serch from '@/components/management/Serch.vue'
	import Popupp from '@/components/Popupp.vue'
	import { listEd,adminList,ActivationState,identity } from '@/common/api/adminCenter'
	import { Toast } from 'mint-ui'

	export default {
		inject: ["reload"],
		filters:{
			RoleName(e){
				if(e=='admin'){
					return '超级管理员'
				}else if(e=='manage'){
					return '管理员'
				}else{
					return '成员'
				}
			}
		},
		data() {
			return {
				popupVisible: false,
				ahgg: [], //已激活列表
				applylist: [], //申请激活列表
				datalist: 1,
				apptips: '成员列表',
				ible: false,
				sheetVisible: 'normal', //身份的蒙尘
				actions: [],
				sendadform:{},
				role:''
			}
		},
		components: {
			Administrtab,
			Foot,
			Serch,
			Popupp
		},
		created() {
			this.role=this.$route.query.role
			const that = this
			//已激活用户列表 
			listEd(JSON.parse(localStorage.getItem('urlUserinfor'))).then(res => {
				// this.ahgg = res.data.data
				this.ahgg = []
				res.data.data.forEach(item=>{
					that.ahgg.push({
						ActivationState: item.ActivationState,
						Avatar: item.Avatar,
						CreateAt:item.CreateAt,
						ID: item.ID,
						Nickname: item.Nickname,
						OrgId: item.OrgId,
						role: item.RoleId,
						Status: item.Status,
						UpdateAt: item.UpdateAt,
						Username: item.Username
					})
				})
				// console.warn(that.ahgg)
				
			})
			// 申请激活列表
			adminList(JSON.parse(localStorage.getItem('urlUserinfor'))).then(res => {
				this.applylist = res.data.data
				// console.log(this.applylist)
		
			})
			//获取身份标识
			identity().then(res => {
				this.actions = res.data.data
			})
		
		},
		methods: {
			addmember() {
				this.popupVisible = true;
			},
			// 关闭邀请表单
			changVisible() {
				this.popupVisible = false;
			},
			//不通过申请
			fail(n) {
				let data = {
					"username": n.Username,
					"org_id": n.OrgId,
					"nickname": n.Nickname,
					"role_id": n.RoleIid,
					"avatar": n.Avatar,
					"status": n.Status,
					"activation_state": 0
				}
				ActivationState(data).then(res => {
					Toast('操作成功')
					this.reload()
				})
			},
			// 通过申请
			pass(n) {
				this.sendadform = {
					"username": n.Username,
					"org_id": n.OrgId,
					"nickname": n.Nickname,
					
					"avatar": n.Avatar,
					"status": n.Status,
					"activation_state": 1
				}
				this.ible = true
			},
			passs(){
			this.sendadform.role_id=this.sheetVisible
				ActivationState(this.sendadform).then(res=>{
					this.ible=false
					Toast('操作成功')
					this.reload()
				})
			},
			
			// 删除成员
			delpoeple(n){
				this.sendadform = {
					"username": n.Username,
					"org_id": n.OrgId,
					"nickname": n.Nickname,
					'role_id':n.RoleId,
					"avatar": n.Avatar,
					"status": n.Status,
					"activation_state": 0
				}
				// console.log(this.sendadform)
				ActivationState(this.sendadform).then(res=>{
					Toast('操作成功')
					this.reload()
				})
			},
		}
		
		// mounted(){
		// 	this.$nextTick(()=>{
		// 		console.log(this.applylist.length)
		// 	})

		// }
	}
</script>

<style scoped>
	.member {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;

	}

	section {
		flex: 1;
		overflow: scroll;

	}

	section::-webkit-scrollbar {

		display: none;

	}

	.memberList {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.memberList .memberListcon {
		width: 8.88rem;
		display: flex;
		flex-direction: column;
	}

	.membertitle {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.membertitle h3 {
		font-size: 0.373333rem;
		color: #1E1E1E;
		width: 8.88rem;
		margin-bottom: 0.4rem;
		margin-top: 0.666667rem;
	}

	.memberList .memberListcon li {
		width: 100%;
		height: 3.2rem;
		border-radius: 0.133333rem;
		background-color: white;
		margin-bottom: 0.4rem;
		display: flex;
		flex-direction: column;
		font-size: 0.373333rem;
		padding: 0.4rem;
		box-sizing: border-box;
	}

	.liTop {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.liTop-left {
		display: flex;
		width: 58%;
		justify-content: space-between;
		align-items: center;
	}

	.liTop-left p {
		display: flex;
		flex-direction: column;
	}

	.nomal {
		width: 1.333333rem;
		height: 0.533333rem;
	}

	.deletBtn {
		width: 100%;
		text-align: right;
		margin-top: 0.48rem;
	}

	.deletBtn .mint-button--primary {
		width: 1.76rem;
		margin-right: 0.266667rem;
	}

	.mint-button--primary {
		width: 8.88rem;
		margin-bottom: 0.266667rem;
	}


	.mint-popup h3 {
		font-size: 0.426667rem;
		color: #515151;
		border-bottom: 1px solid #BFBFBF;
		height: 1.413333rem;
		text-align: center;
		line-height: 1.413333rem;
		font-weight: normal;

	}

	form p {
		display: flex;
		height: 32px;
		justify-content: space-between;
		margin-bottom: 0.666667rem;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
		position: relative;

	}

	form p input {
		width: 85%;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
	}

	form p img {
		position: absolute;
		top: 0.213333rem;
		left: 0.266667rem;
	}

	.formope {
		display: flex;
		justify-content: space-around;
		margin-top: 1.333333rem;
		width: 70%;
	}

	.formope button {
		width: 2.4rem;
		height: 30px;
		border-radius: 0.133333rem;
		color: #3A3A3A;
		outline: none;
		border: 1px solid #51515180;
		background-color: white;
	}

	.formope .sub {
		background-color: #278DE5;
		color: #fff;
		border: none;
	}

	.classificationCon {
		width: 8.88rem;
		display: flex;
		background-color: white;
		border-radius: 0.266667rem;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0.266667rem;
		box-sizing: border-box;
	}

	.classification {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 0.533333rem;
	}

	.classificationCon p {
		font-size: 0.373333rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: calc(8.88rem / 4);
		margin: 0.213333rem 0;
	}

	.applylive {
		width: 1.8rem;
		height: 0.533333rem;
		background-color: darkorange;
		text-align: center;
		color: white;
		border-radius: 0.08rem;
	}

	.liTop-left img {
		width: 1.066667rem;
		height: 1.066667rem;
		border-radius: 50%;
	}

	.idenlisy {
		width: 6rem;
		height: 1rem;
		border: 1px solid rgba(0, 0, 0, .85);
		margin-top: 0.533333rem;
		border-radius: 0.106667rem;
		outline: none;
		text-indent: 0.213333rem;
	}

	.idenPop {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.idenPop h3 {
		width: 100%;
	}
	.sub{
		width: 4rem;
		border: none;
		background-color: #278DE5;
		color: white;
		border-radius: 0.133333rem;
		height: 0.8rem;
	}
	.thensanwith{
		width: 1.866667rem;
	}
	.appl{
		margin-top: 2rem;
		display: flex;
		justify-content:center;
		flex-wrap: wrap;
	}
	.appl p{
		width: 70%;
	}
</style>
