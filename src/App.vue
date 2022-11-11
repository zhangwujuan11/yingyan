<template>
	<div id="app">
		<meta name="viewport"
			content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<div class="addtop" :style="{height: mainheiget[0].hh}"></div>
		<router-view v-if="isRouterAlive" />
	</div>
</template>
<script>
	export default {
		provide() { //刷新
		 return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
				mainheiget: [{
					'hh': '0px'
				}]
			}
		},
		created() {
			window.flutter_inappwebview.callHandler('getSafeAreaHeight').then((res) => {
				if (res != undefined) {
					this.$set(this.mainheiget[0], 'hh', res.statusBarHeight + 'px')
					localStorage.setItem('phonetopheight',res.statusBarHeight + 'px')
				}
			});
			// let vm = this
			// if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			// 	window.getSafeAreaHeight.onmessage = function(res) {
			// 		if (res != undefined) {
			// 			vm.$set(vm.mainheiget[0], 'hh', JSON.parse(res.data).statusBarHeight + 'px')
			// 			localStorage.setItem('phonetopheight',JSON.parse(res.data).statusBarHeight + 'px')
			// 		}
			// 	};
			// 	// @ts-ignore
			// 	window.getSafeAreaHeight.postMessage();
			// 	// @ts-ignore
			// 	window.getSafeAreaHeight.onmessage?.();
			// }else if(/(Android)/i.test(navigator.userAgent)) {
			// 	// @ts-ignore：
			// 	window.flutter_inappwebview.callHandler('getSafeAreaHeight').then((res) => {
			// 		if (res != undefined) {
			// 			vm.$set(vm.mainheiget[0], 'hh', res.statusBarHeight + 'px')
			// 			localStorage.setItem('phonetopheight',res.statusBarHeight + 'px')
			// 		}
			//  });
			// } 
			// this.$set(this.mainheiget[0], 'hh', 48 + 'px')
			
			
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		}
	}
</script>

<style scoped>
	.addtop {
		width: 100%;
		background-color: #3778DA;
		position: fixed;
		top: 0;
		left: 0;
		
	}
</style>
