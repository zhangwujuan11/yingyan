<template>
	<div class="control">
		<h3>
			操作教程
			<span>全部<img src="@/assets/images/Go.png" ></span>
		</h3>
		
		<div class="controlCon">
			<p>
				<span>xxx视屏教程</span>
				<img class="golpaytv" src="@/assets/images/download.png">
				<img src="@/assets/images/videoLogo.58ccc0ed.png">
			</p>
			<p> 
				<span>xxx视屏教程</span>
				<img class="golpaytv" src="@/assets/images/download.png">
				<img src="@/assets/images/videoLogo.58ccc0ed.png">
			</p>
		</div>
	</div>
</template>

<style scoped>
	.control{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.controlCon{
		width: 8.88rem;
		height: 3.2rem;
		overflow: scroll;
		white-space:nowrap;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow-y:hidden;
		scrollbar-width: none; /* firefox */
	   -ms-overflow-style: none; /* IE 10+ */
	}
	.controlCon::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
	.control h3{
		width: 8.88rem;
		font-size: 0.373333rem;
		margin: 15px 0;
	}
	.control h3 span{
		display: flex;
		float: right;
		font-size: 12px;
		align-items: center;
	}
	.control h3 span img{
		margin-left: 0.133333rem;
	}
	.controlCon p{
		width: 5.973333rem;
		display: inline-block;
		margin-right: 0.533333rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		position: relative;
	}
	.controlCon p img{
		width: 100%;
		height: 100%;
		border-radius: 0.266667rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
	}
	.controlCon p .golpaytv{
		width: 0.64rem;
		height: 0.64rem;
		position: absolute;
		top: calc(50% - 0.32rem);
		left: calc(50% - 0.32rem) ;
	}
	.controlCon p span{
		position: absolute;
		color: white;
		font-size: 0.426667rem;
		left: 0.266667rem;
		top: 0.266667rem;
	}
</style>