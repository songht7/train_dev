<template>
	<view class="message-center">
		<view class="message-block">
			message
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserId: ""
			}
		},
		onLoad() {
			var that = this;
			that.$store.state.haveMsg = false;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page", 1)
			that.UserId = that.$store.state.user.userInfo.id || ''
		},
		methods: {

		}
	}
</script>

<style>
</style>
