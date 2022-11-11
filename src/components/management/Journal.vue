<template>
	<div class="journal">
		<h3 @click="gojouranlList" class="tips">日志管理  <span>全部<img src="@/assets/images/Go.png" ></span></h3>
		<ul>
			<li 
			v-for="(item,index) in indexname"
			:key="index"
			:class="item.open ? 'open' : 'hee' "
			@click="changeit(index)"
			>
				
				<span>
					<img src="@/assets/images/rizhiguan.png">
					{{item.methodName}}
				</span>
				<!-- <span class="journalpeop">操作人员：{{item.username}}</span> -->
				<span class="journaltime">{{item.createAt}}</span>
				<p v-if='!item.open'>
					<span class="journalpeop">操作人员：{{item.username}}</span>
					<span class="journalpeop">内容：{{item.methodRemark}}</span>
				</p>
			</li>
			
		</ul>
	</div>
</template>

<script>
	// import { getjournal } from '@/common/api/adminCenter'
	export default{
		data(){
			return{
				jouranlList:[]
			}
		},
		props:['indexname'],
		methods:{
			gojouranlList(){
				this.$router.push({
					name:'journal'
				})
			},
			changeit(e){
				let change = this.indexname[e]
				change.open=!change.open
				this.$set(this.indexname,e,change)
			}
		}
	}
	
	
</script>

<style scoped>
	.journal{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.journal ul{
		width: 8.88rem;
		
	}
	.open{
		width: 100%;
		background-color: white;
		border-radius: 0.266667rem;
		display: flex;
		padding: 0 0.32rem;
		box-sizing: border-box;
		font-size:16px;
		margin-bottom: 0.32rem;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 1.6rem;
		overflow: hidden;
	}
	
	.hee{
		width: 100%;
		background-color: white;
		border-radius: 0.266667rem;
		display: flex;
		padding: 0 0.32rem;
		box-sizing: border-box;
		font-size:16px;
		margin-bottom: 0.32rem;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 3.5rem;
	}
	.hee p span{
		width: 100%;
		margin-top: 0.4rem;
	}
	.journal ul li img{
		width: 1.066667rem;
		height: 1.066667rem;
		margin-right: 0.4rem;
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
	h3 span img{
		margin-left: 0.133333rem;
	}
	.journal ul li span{
		display: flex;
		align-items: center;
	}
	.journaltime{
		font-size: 0.32rem;
		float: right;
	}
</style>