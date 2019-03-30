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
				UserId:this.$store.state.user.UserId || ''
			}
		},
		onLoad() {

		},
		onShow() {
			var that=this;
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page",1)
		},
		methods: {

		}
	}
</script>

<style>
</style>
