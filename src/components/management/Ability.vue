<template>
	<div class="ability">
		<div class="ability-con">
			<h3>
				应用能力
				<span  @click="goAbility">
					全部
					<img src="@/assets/images/Go.png" >
				</span>
			</h3>
			<ul>
				<li>
					授权使用人数
					<a :href="'/administr'">购买</a>
				</li>
				<li>
					使用周期
					<a href="/">购买</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			goAbility(){
				this.$router.push({
					name:'ability'
				})
			}
		}
	}
</script>

<style scoped>
	.ability{
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.ability .ability-con{
		width: 8.88rem;
	}
	.ability .ability-con h3{
		width: 100%;
		font-size: 0.373333rem;
		display: flex;
		justify-content: space-between;
		color: #1E1E1E;
		align-items: center;
		margin:0.213333rem 0;
	}
	.ability .ability-con h3 span{
		font-size: 0.32rem;
		display: flex;
		align-items: center;
		letter-spacing: 0.1rem;
	}
	.ability ul{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.ability ul li{
		font-size: 0.373333rem;
		display: flex;
		width: 4rem;
		height: 2.266667rem;
		background: linear-gradient(180deg, #232526 0%, #414345 100%);
		border-radius: 0.266667rem;
		color: white;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		line-height: 0.533333rem;
	}
	.ability ul li a{
		text-decoration: none;
		color: #1D76DE;
	}
	.ability ul li:last-child{
		background: linear-gradient(180deg, #085078 0%, #85D8CE 100%);
	}
</style>