<template>
	<view class="train-test">
		12312313
		<view class="fix-button">
			<view class="fbtn-main">
				<view class="fbtns btn-goback" @click="$store.dispatch('goback')">退出测试</view>
				<!-- <view class="fbtns fbtns-clr-full btn-totest" @click="test_prev">上一题</view> -->
				<view class="fbtns fbtns-clr-full btn-totest" @click="test_next">下一题</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "理论测试"
			})
		},
		onShow() {
			this.$store.dispatch('cheack_user')
		},
		onReady: function(res) {},
		components: {},
		computed: {},
		methods: {}
	}
</script>

<style>
</style>
