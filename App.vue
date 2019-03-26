<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
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
	@import "//at.alicdn.com/t/font_1094459_u7w54i0zpu.css";
	/* @import "./common/fonts/iconfont.css"; */
</style>
