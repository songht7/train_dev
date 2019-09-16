<template>
	<view class="loginTipBox">
		<image class="ad-img" src="/static/img-2.jpg" mode="widthFix"></image>
		<view class="loginTip">登录账号查看详细内容</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {};
		},
		onShow() {},
		methods: {},
		computed: {}
	}
</script>


<style>
	.loginTipBox{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}
	.loginTip {
		font-size: 32upx;
		line-height: 2;
		color: #282828;
		display: flex;
		justify-content: center;
	}
</style>
