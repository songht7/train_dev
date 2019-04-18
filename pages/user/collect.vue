<template>
	<view class="my-collect">
		<view class="page-main">
			<view class="list-row" v-for="(r,k) in 10" :key="k" @click="goDetail(r)">
				<view class="list-block">
					<view class="list-more">
						<view class="list-left">
							<view class="list-title collect-title">如何写出一份优秀的个人简历</view>
						</view>
						<view class="list-right">
							<image class="image-full" :src="sourceUrl+'/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg'" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		onShow() {
			this.$store.dispatch('cheack_user')
		},
		onReady: function(res) {},
		components: {
			fixButton
		},
		computed: {},
		methods: {
			goDetail: function(id) {
				uni.navigateTo({
					url: "/pages/library/detail?id=" + id
				})
			},
		}
	}
</script>

<style>
	.collect-title {
		font-weight: 600;
	}
</style>
