<template>
		<div class="ability">
			<Administrtab>
				<span>应用能力</span>
			</Administrtab>
			<section class="wrapper">
				<ul>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
					<li>
						授权使用人数购买
						<span @click="purchase">购买</span>
					</li>
				</ul>
			</section>
			<Foot></Foot>
			<!-- 蒙尘 -->
			 <Popupp v-if="popupVisible">
				 <div slot="popupForm">
					 <h3>
						 授权使用人数
						 <img @click="changVisible" src="@/assets/images/close.png" alt="">
					 </h3>
					 <div class="popupForm">
					 	<div class="perpnum">
							<ul>
								<li>
									<p>
										扩展包一 <br>
										<span>￥<strong>50</strong></span>
									</p>
								</li>
								<li>
									<p>
										扩展包一 <br>
										<span>￥<strong>50</strong></span>
									</p>
								</li>
								<li>
									<p>
										扩展包一 <br>
										<span>￥<strong>50</strong></span>
									</p>
								</li>
								<li>
									<p>
										扩展包一 <br>
										<span>￥<strong>50</strong></span>
									</p>
								</li>
								<li>
									<p>
										扩展包一 <br>
										<span>￥<strong>50</strong></span>
									</p>
								</li>
							</ul>
					 		<mt-button size="large" type="primary">确认购买</mt-button>
							 <span class="purchaseTip">
								 点击购买即同意《“授权使用人数扩展包”服务协议》，
								 如有任何疑问，可咨询在线客服。
							 </span>
					 	</div>
					 </div>
				 </div>
			 </Popupp>
		</div>
</template>

<script>
	import Administrtab  from '@/components/Administrtab.vue'
	import Foot from '@/components/Foot.vue'
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
			Popupp
		},
		methods:{
			purchase(){
				this.popupVisible=true
			},
			// 关闭
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
	.ability{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	section{
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	section ul{
		width: 8.88rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 0.666667rem;
	}
	section ul li{
		width: 49%;
		height: 2.4rem;
		background:linear-gradient(180deg, #232526 0%, #414345 100%);
		border-radius: 0.266667rem;
		margin-bottom: 0.266667rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		font-size: 0.373333rem;
		font-weight: normal;
	}
	section ul li:nth-child(even){
		background:linear-gradient(180deg, #085078 0%,#85D8CE 100%) ;
	}
	section ul li span{
		margin-top: 0.133333rem;
		color: #1d76de;
	}
	.mint-popup h3{
		font-size: 0.426667rem;
		color: #515151;
		border-bottom:1px solid #BFBFBF;
		height: 1.413333rem;
		text-align: center;
		line-height: 1.413333rem;
		font-weight: normal;
		position: relative;
	}
	.mint-popup h3 img{
		position: absolute;
		right: 0.666667rem;
		top: 0.56rem;
	}
	.popupForm{
		display: flex;
		justify-content: center;
		align-items: center;flex-direction: column;
		width:100%;
	}
	.perpnum{
		width: 80%;
	}
	.purchaseTip{
		font-size: 0.32rem;
		color: rgba(81, 81, 81, 0.5);
		display: block;
		margin-top: 0.266667rem;
	}
	.perpnum ul{
		width: 100%;
		height: 3.8rem;
		overflow: scroll;
		white-space: nowrap;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		margin-top: 0.48rem;
		margin-bottom: 1.973333rem;
		overflow-y:hidden;
	}
	.perpnum ul li{
		width: 2.666667rem;
		height: 3.466667rem;
		border: 1px solid #1D76DE;
		border-radius: 0.266667rem;
		font-size: 0.373333rem;
		text-align: center;
		display: inline-block;
		margin-right: 0.32rem;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow: hidden;
		
	}
	.perpnum ul li p{
		align-items: center;
		height: 100%;
		justify-content: center;
		display: flex;
		flex-direction: column;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow: hidden;
	}
	.perpnum ul li span{
		color: #1D76DE;
		touch-action: pan-x;
		-ms-touch-action: pan-x;
		overflow: hidden;
	}
	.perpnum ul li span strong{
		font-size: 0.533333rem;
	}

</style>