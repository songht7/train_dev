<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif

			// #ifdef MP-WEIXIN
			this.$store.dispatch('wxXCXLogin');
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			// 			var pages = getCurrentPages();
			// 			var page = pages[pages.length - 1];
			// 			console.log(page.route)
			// 			if(page.route){
			// 				uni.navigateTo({
			// 					url:`/${page.route}`
			// 				})
			// 			}
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";

	/*https://www.iconfont.cn
	*login weibo
	*/
	/* @import "//at.alicdn.com/t/font_1094459_61yev6hioiu.css"; */
	@import "./common/fonts/iconfont.css";
</style>
