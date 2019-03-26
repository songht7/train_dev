<template>
	<view class="unit-list">
		<swiper class="swiper-box swiper-slide-unit" :indicator-dots="swiperleng>1?true:false" circular="circular" interval="interval"
		 duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE">
			<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
				<view class="vli">
					<view class="vli2">
						<image class="slideImg" v-if="slide.media_type=='image'" @click="previewImage" lazy-load="true" :src="sourceUrl+slide.original_src"
						 mode="aspectFill"></image>
						<video class="train-video" v-if="slide.media_type=='video'" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
						 @error="videoErrorCallback" controls></video>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="uni-padding-wrap uni-common-mt segmented-box">
			<uni-segmented-control :current="current" :values="segmented" v-on:clickItem="onClicksegmented" styleType="text"
			 activeColor="#008CEE"></uni-segmented-control>
		</view>
		<view class="unit-content">
			<view v-show="current === 0">
				选项卡1的内容
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		data() {
			return {
				swiperList: [{
					"media_type": "image",
					"original_src": "/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg"
				}, {
					"media_type": "video",
					"url": "https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4g"
				}],
				current: 0,
				segmented: [
					'介绍',
					'目录'
				],
			}
		},
		onLoad() {

		},
		onShow() {
			this.$store.dispatch('cheack_user')
		},
		onReady: function(res) {},
		components: {
			uniSegmentedControl
		},
		computed: {
			swiperleng() {
				return this.swiperList.length
			}
		},
		methods: {
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			previewImage() {
				uni.previewImage({
					urls: [this.$store.state.sourceUrl+"/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg",this.$store.state.sourceUrl+"/data/image_doc/77b0cb2473b3d3f4b73c3090183b3c2b.jpg"]
				});
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
		}
	}
</script>

<style>
	.swiper-slide-unit {
		height: 422upx;
	}

	.segmented-box {
		border-bottom: 2upx solid #D1D1D1
	}

	.unit-content {
		padding: 30upx;
		height: 1000px;
	}
</style>
