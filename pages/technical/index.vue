<template>
	<view class="library">
		<view class="page-main">
			<view class="lib-row" v-for="(r,k) in 10" :key="k" @click="goDetail(r)">
				<view class="lib-block">
					<view class="lib-more">
						<view class="lib-m-left">
							<view class="lib-title">IOS 9001 认证</view>
							<view class="lib-ov">抱歉 这是专业HR都不会告诉你的两条简历制作方法 先和大家说一句...</view>
						</view>
						<view class="lib-m-right">
							<image class="image-full" :src="sourceUrl+'/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg'" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-button">
			<view class="fbtn-main">
				<view class="fbtns btn-goback" @click="$store.dispatch('goback')">返回</view>
				<view class="fbtns fbtns-clr-full btn-totest" @click="$store.dispatch('makePhoneCall')"><uni-icon type="dianhua1" size="25" color="#fff"></uni-icon>咨询我们</view>
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
					url: "/pages/technical/detail?id=" + id
				})
			},
		}
	}
</script>

<style>
	.lib-row {
		background: #FFFFFF;
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
		flex-direction: row-reverse;
		justify-content: space-between;
		color: #929292;
		font-size: 26upx;
		line-height: 1.4;
	}

	.lib-title {
		color: #222222;
		font-size: 34upx;
		line-height: 1.6;
		padding-bottom: 10upx;
	}


	.lib-ov {
		line-height: 1.4;
		padding-bottom: 20upx;
	}

	.lib-m-left {
		display: flex;
		align-content: space-between;
		flex-direction: column;
		flex: 1;
		padding-left: 40upx;
	}

	.lib-m-right {
		width: 175upx;
		height: 175upx;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
