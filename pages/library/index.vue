<template>
	<view class="library">
		<view class="page-main">
			<view class="lib-row" v-for="(r,k) in 10" :key="k" @click="goDetail(r)">
				<view class="lib-block">
					<view class="lib-title">如何写出一份优秀的个人简历</view>
					<view class="lib-more">
						<view class="lib-m-left">
							<view class="lib-ov">抱歉 这是专业HR都不会告诉你的两条简历制作方法 先和大家说一句...</view>
							<view class="lib-browse">1896 浏览</view>
						</view>
						<view class="lib-m-right">
							<image class="image-full" :src="sourceUrl+'/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg'" mode="aspectFill"></image>
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
	.lib-row {
		background: #FFFFFF;
		margin-bottom: 30upx;
	}

	.lib-block {
		padding: 30upx 20upx;
	}

	.lib-block,
	.lib-more {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		flex-direction: column;
	}

	.lib-more {
		flex-direction: row;
		justify-content: space-between;
	}

	.lib-title {
		color: #222222;
		font-size: 34upx;
		line-height: 1.6;
		padding-bottom: 10upx;
	}

	.lib-more {
		color: #929292;
		font-size: 26upx;
		line-height: 1.4;
	}

	.lib-ov {
		line-height: 1.4;
		padding-bottom: 20upx;
	}

	.lib-m-left {
		display: flex;
		align-content: space-between;
		flex: 1;
		flex-direction: column;
	}

	.lib-m-right {
		width: 30%;
		height: 134upx;
		border-radius: 8upx;
		overflow: hidden;
	}
</style>
