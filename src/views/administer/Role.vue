<template>
	<div class="role">
		<Administrtab>
			<span>角色管理</span>
		</Administrtab>
		<div class="membertitle">
			<Serch></Serch>
			<h3>
				<select name="department">
					<option value="人事">人事</option>
					<option value="技术">技术</option>
				</select>
			</h3>
		</div>
		
		<section class="wrapper wrapper">
			<!-- 成员列表 -->
			<div class="memberList">
				<div class="memberListcon">
					<ul>
						<li>
							<div class="liTop">
								<div class="liTop-left">
									<img src="@/assets/images/Ellipse.png" alt="">
									<p>
										<span>李某某(开发部)</span>
										<span>+8615268452003</span>
									</p>
								</div>
							</div>
						</li>
						<li>
							<div class="liTop">
								<div class="liTop-left">
									<img src="@/assets/images/Ellipse.png" alt="">
									<p>
										<span>李某某(开发部)</span>
										<span>+8615268452003</span>
									</p>
								</div>
							</div>
						</li>
						<li>
							<div class="liTop">
								<div class="liTop-left">
									<img src="@/assets/images/Ellipse.png" alt="">
									<p>
										<span>李某某(开发部)</span>
										<span>+8615268452003</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<mt-button size="large" type="primary" @click="addrole">新增角色</mt-button>
			</div>
		</section>
		<Foot></Foot>
		
		
		<!-- 蒙尘 -->
		 <Popupp v-if="popupVisible">
			 <div slot="popupForm">
				 <h3>新增角色</h3>
				<form action="" onsubmit="return false">
				 <p>
					<span>角色名称</span>
					<input type="text" placeholder="请输入角色名称">
				 </p>
				 
				  <p>
					  <span>
						  角色分组
					  </span>
					  <select name="roles">
						<option value="">管理员</option>
						<option value="">员工乙</option>
						<option value="">路人甲</option>
					  </select>
				  </p>
				  <div class="powerBox">
					  <span>
						  权限选择
					  </span>
					 <div>
						<p>
							<input type="checkbox" name="power">权限1
						</p>
						<p>
							<input type="checkbox" name="power">权限2
						</p>
						 <p>
						 	<input type="checkbox" name="power">权限3333
						 </p>
						 <p>
						 	<input type="checkbox" name="power">权限4
						 </p>
						 <p>
						 	<input type="checkbox" name="power">权限5
						 </p>
						 <p>
						 	<input type="checkbox" name="power">权限6
						 </p>
					 </div>
					  
				  </div>
				  
				  <div class="formope">
					  <button class="onsub" @click="changVisible">取消</button>
					   <button class="sub">确定</button>
				  </div>
				</form>
			 </div>
		 </Popupp>
	</div>
</template>

<script>
	import Administrtab  from '@/components/Administrtab.vue'
	import Foot from '@/components/Foot.vue'
	import Serch from '@/components/management/Serch.vue'
	import Popupp from'@/components/Popupp.vue'
	//插件
	import BScroll from '@better-scroll/core'
	export default{
		data(){
			return{
				popupVisible:false
			}
		},
		components:{
			Administrtab,
			Foot,
			Serch,
			Popupp
		},
		methods:{
			addrole(){
				this.popupVisible=true;
			},
			// 关闭新增表单
			changVisible(){
				this.popupVisible=false;
			},
		},
		mounted() {
			  this.$nextTick(()=>{
				  let bs = new BScroll('.wrapper', {
					  movable: true,
					  zoom: true,
					  probeType:2,
					  click:true
				  })
			  })
		},
	}
</script>

<style scoped>
	.membertitle{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.membertitle h3{
		    font-size: 0.373333rem;
		    color: #1E1E1E;
		    width: 8.88rem;
			margin-bottom: 0.3rem;
			margin-top: 0.4rem;
			text-align: right;
	}
	
	.role{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		
	}
	section{
		flex: 1;
		overflow: hidden;
	}
	
	
	.memberList{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.memberList .memberListcon{
		width: 8.88rem;
		display: flex;
		flex-direction: column;
	}
	.membertitle{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	
	.memberList .memberListcon li{
		width: 100%;
		height: 2.4rem;
		border-radius: 0.133333rem;
		background-color: white;
		margin-bottom: 0.4rem;
		display: flex;
		flex-direction: column;
		font-size: 0.373333rem;
		padding: 0.4rem;
		box-sizing: border-box;
	}
	.liTop{
		display: flex;
		justify-content: space-between;
	}
	.liTop-left{
		display: flex;
		width: 58%;
		justify-content: space-between;
		align-items: center;
	}
	.liTop-left p{
		display: flex;
		flex-direction: column;
	}
	
	.mint-button--primary{
		width: 8.88rem;
		margin-bottom: 0.266667rem;
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
	.powerBox{
		font-size: 0.373333rem;
		flex-direction: column;
		color: #515151;
	}
	.powerBox span{
		font-size: 14px;
		color: #515151;
	}
	.powerBox input{
		width: 0.373333rem;
		height: 0.373333rem;
		float: left;
		margin-right: 0.266667rem;
	}
	.powerBox div{
		display: flex;
		flex-wrap: wrap;
	}
	.powerBox div p{
		margin-right: 0.3rem;
		margin-top: 0.533333rem;
		margin-bottom: 0;
	}
</style>