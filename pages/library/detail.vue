<template>
	<view class="article-detail">
		<view class="banner">
			<image class="banner-img" :src="sourceUrl+banner.original_src"></image>
			<view class="banner-title">{{banner.title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-time">{{banner.published_at}}</text>
			<text class="article-author">{{banner.author_name}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="htmlString"></rich-text>
		</view>
		<fix-button btnType="fbtn-big">
			<view class="fbtns collect" :class="isCollect?'collected':''" @click="collect(1)">
				<view>
					<uni-icon :type="isCollect?'shoucang1':'shoucang'" size="25" :color="isCollect?'#008CEE':'#929292'"></uni-icon>
					<view>收藏</view>
				</view>
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
				title: '如何写出一份优秀的个人简历',
				banner: {
					"title": "如何写出一份优秀的个人简历",
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
				title: "如何写出一份优秀的个人简历"
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
			},
			collect(id) {
				this.isCollect = !this.isCollect
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
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
