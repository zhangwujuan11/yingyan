<template>
	<div class="popups">
		<!-- 蒙尘 -->
		<mt-popup
		  v-model="popupVisible"
		  position="popup-fade"
		  :closeOnClickModal="false"
		>
			<slot name='popupForm'></slot>
		</mt-popup>
	</div>
</template>

<script scoped>
	export default{
		data(){
			return{
				popupVisible:true,
			}
		}
	}
</script>

<style>
	
	.mint-popup{
		border-radius: 0.266667rem;
		width: 8.88rem;
		height: 14rem;
	}
	
	
	
</style>