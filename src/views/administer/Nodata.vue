<template>
	<div class="nodata">
		<div class="nodataCon">
			<img src="@/assets/images/403.svg" alt="">
			<h4>抱歉，你无权访问该页面</h4>
			<button @click="goback">Go back home</button>
		</div>
		
	</div>
</template>

<script>
	export default{
		methods:{
			goback(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.nodata{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.nodataCon{
		width: 8.88rem;
		display:flex;
		justify-content: center;
		flex-direction: column;
		padding-top: 0.8rem;
		text-align: center;
		align-items: center;
	}
	.nodata img{
		width: 100%;
		margin-bottom: 0.533333rem;
	}
	.nodataCon h4{
		font-weight: normal;
		margin-bottom: 0.4rem;
	}
	.nodataCon button{
		width: 3rem;
		border: 2px solid black;
		padding: 0.166667rem;
		background: orange;
	}
</style>