<template>
	<header :style="{'padding-top':phoneheight}">
		<div @click="goback">
			<img src="@/assets/images/back.png" alt="">
			<slot>
				<span>
					<slot>鹰眼</slot>
				</span>
			</slot>
		</div>
	</header>
</template>

<script>
	export default{
		data(){
			return {
				phoneheight:localStorage.getItem('phonetopheight')
			}
		},
		methods:{
			goback(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	header {
		width: 100%;
		padding-top: 0.533333rem;
		height: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	header div{
		width: 8.88rem;
		font-size: 0.426667rem;
		display: flex;
		align-items: center;
	}
	header div span{
		margin-left: 0.213333rem;
		font-weight: bold;
	}
	
</style>