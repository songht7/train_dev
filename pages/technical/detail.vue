<template>
	<view class="article-detail">
		<view class="banner">
			<image class="banner-img" :src="sourceUrl+banner.original_src"></image>
		</view>
		<view class="banner-title">{{banner.title}}</view>
		<view class="article-meta">
			<text class="article-author">21人已办理</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="htmlString"></rich-text>
		</view>

		<fix-button>
			<view class="fbtns fbtns-clr-full btn-totest" @click="$store.dispatch('makePhoneCall')">
				<uni-icon type="dianhua1" size="25" color="#fff"></uni-icon>咨询我们
			</view>
		</fix-button>
	</view>
</template>
<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {
				isCollect: false,
				title: 'IOS 9001 认证',
				banner: {
					"title": "IOS 9001 认证",
					"author_name": "职照小编",
					"published_at": "2019-3-20",
					"original_src": "/data/image_doc/9c84faccb7f85cddfebd2ca072f879ba.jpg"
				},
				htmlString: "<p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p><p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p><p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p>"
			}
		},
		onLoad(event) {
			this.getDetail();
			uni.setNavigationBarTitle({
				title: "IOS 9001 认证"
			});
		},
		components: {
			fixButton
		},
		methods: {
			getDetail() {
				// 				uni.request({
				// 					url: 'https://unidemo.dcloud.net.cn/api/news/36kr/5188456',
				// 					success: (data) => {
				// 						if (data.statusCode == 200) {
				// 							this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
				// 						}
				// 					},
				// 					fail: () => {
				// 						console.log('fail');
				// 					}
				// 				})
			}
		}
	}
</script>

<style>
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		padding: 30upx 3% 10upx;
		font-size: 44upx;
		font-weight: 500;
		color: #222222;
	}

	.article-meta {
		padding: 0 3% 20upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 3%;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
