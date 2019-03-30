<template>
	<view class="user-center">
		<view class="user-block">
			user
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
