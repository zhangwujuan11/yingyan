<template>
	<div class="abSerch">
		<div class="serchCon">
			<!-- <select name="aabb">
				<option value="夸克科技">夸克科技</option>
				<option value="夸克科技">夸克科技</option>
				<option value="夸克科技">夸克科技</option>
			</select> -->
			<span>夸克科技</span>
			<p>
				<input type="search" placeholder="搜索成员">
				<img src="@/assets/images/Vector.png" alt="">
			</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.abSerch{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 0.666667rem;
	}
	.serchCon{
		width: 8.88rem;
		display: flex;
		justify-content: space-between;
	}
	.serchCon p{
		width: 6.133333rem;
		height: 0.8rem;
		background-color: white;
		border-radius: 0.4rem;
		position: relative;
	}
	.serchCon p input{
		width: 80%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		text-indent :0.266667rem;
	}
	.serchCon p img{
		position: absolute;
		right: 0.32rem;
		top: 0.213333rem;
		width: 0.426667rem;
		height: 0.426667rem;
	}
	.serchCon span{
		font-size: 14px;
		font-weight: bold;
	}
	/deep/input[type="search"]{
	
	  -webkit-appearance:none !important;
	
	  }
</style>