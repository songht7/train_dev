<template>
	<view class="library">
		<view class="page-main">
			<view class="list-row" v-for="(r,k) in 10" :key="k" @click="goDetail(r)">
				<view class="list-block">
					<view class="list-title">如何写出一份优秀的个人简历</view>
					<view class="list-more">
						<view class="list-left">
							<view class="list-ov">抱歉 这是专业HR都不会告诉你的两条简历制作方法 先和大家说一句...</view>
							<view class="list-browse">1896 浏览</view>
						</view>
						<view class="list-right">
							<image class="image-full" :src="sourceUrl+'/data/image_doc/9c84faccb7f85cddfebd2ca072f879ba.jpg'" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
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
		onReady: function(res) {},
		components: {},
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
</style>
