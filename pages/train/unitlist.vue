<template>
	<view class="unit-list">
		<swiper class="swiper-box swiper-slide-unit" :indicator-dots="swiperleng>1?true:false" autoplay="autoplay" circular="circular"
		 interval="interval" duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE">
			<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
				<view class="vli">
					<view class="vli2">
						<image class="slideImg" @click="linkTo(slide.link)" lazy-load="true" :src="sourceUrl+slide.original_src" mode="aspectFill"></image>
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
					"link": "",
					"original_src": "/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg"
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
			}
		}
	}
</script>

<style>
	.swiper-slide-unit {
		height: 422upx;
	}
	.segmented-box{border-bottom:2upx solid #D1D1D1}
	.unit-content{padding: 30upx;height: 1000px;}
</style>
