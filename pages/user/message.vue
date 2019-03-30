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
			return {}
		},
		onLoad() {

		},
		onShow() {
			this.$store.dispatch('cheack_user')
		},
		methods: {

		}
	}
</script>

<style>
</style>
