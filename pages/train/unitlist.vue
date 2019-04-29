<template>
	<view class="unit-list">
		<swiper class="swiper-box swiper-slide-unit" :indicator-dots="swiperleng?'true':'false'" circular="circular" interval="interval"
		 duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE">
			<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
				<view class="vli">
					<view class="vli2">
						<image class="slideImg" v-if="" @click="previewImage" lazy-load="true" :src="sourceUrl+slide.original_src" mode="aspectFill"></image>
						<!-- <video class="train-video" v-if="slide.media_type=='video'" src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
						 @error="videoErrorCallback" controls></video> -->
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
				<view class="course-detail-box">
					<view class="course-inner">
						<view class="course-title">{{data.name}}</view>
						<view class="course-more list-more">
							<view>123人在学</view>
							<view>共10门课程</view>
						</view>
						<rich-text class="course-detail" :nodes="data.detail"></rich-text>
					</view>
				</view>
				<view class="course-lessions">
					<view class="course-inner">
						<block v-for="(less,i) in lessions" :key="i">
							<view class="less-row" @click="getLessDtl(less.id)">{{i+1}}.{{less.name}}</view>
						</block>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="course-lessions">
					<view class="course-inner">
						<block v-for="(less,i) in lessions" :key="i">
							<view class="less-row" @click="getLessDtl(less.id)">{{i+1}}.{{less.name}}</view>
						</block>
					</view>
				</view>
			</view>
		</view>

		<fix-button>
			<view class="fbtns fbtns-clr-full btn-totest" :class="isJoined?'is-joined':''" v-show="current === 0" @click="joinlearning(1)">{{isJoinTxt}}</view>
			<view class="fbtns fbtns-clr-full btn-totest" v-show="current === 1" @click="to_test(1)">开始测试</view>
		</fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		data() {
			return {
				__token: "",
				courseId: "",
				data: [],
				lessions: [],
				lessTotal: "",
				lessDtl: [],
				swiperList: [],
				isJoined: false,
				isJoinTxt: "加入学习",
				current: 0,
				segmented: [
					'介绍',
					'课程目录'
				]
			}
		},
		onLoad(e) {
			var that = this;
			that.courseId = e.id;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token;
			/* course-detail */
			let data_dtl = {
				"inter": "course",
				"parm": `?course_id=${that.courseId}`,
				"header": {
					"token": that.__token
				}
			}
			data_dtl["fun"] = function(res) {
				if (res.success) {
					that.data = res.data;
					let cover = {
						"original_src": res.data.original_src
					}
					that.swiperList.push(cover)
				}
			}
			that.$store.dispatch("getData", data_dtl)
			/* lessons */
			let data_les = {
				"inter": "lessons",
				"parm": `?course_id=${that.courseId}`,
				"header": {
					"token": that.__token
				}
			}
			data_les["fun"] = function(res) {
				if (res.success) {
					that.lessions = res.data.list;
					that.lessTotal = res.data.total;
				}
			}
			that.$store.dispatch("getData", data_les)
		},
		onReady: function(res) {},
		components: {
			fixButton,
			uniSegmentedControl
		},
		computed: {
			swiperleng() {
				return this.swiperList.length
			}
		},
		methods: {
			getLessDtl(lessid) {
				var that = this;
				/* lessons */
				let data_ldtl = {
					"inter": "lesson",
					"parm": `?lesson_id=${lessid}`,
					"header": {
						"token": that.__token
					}
				}
				data_ldtl["fun"] = function(res) {
					if (res.success) {
						that.lessDtl = res.data;
					}
				}
				that.$store.dispatch("getData", data_ldtl)
			},
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			previewImage() {
				uni.previewImage({
					urls: [this.$store.state.sourceUrl + "/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg", this.$store.state.sourceUrl +
						"/data/image_doc/77b0cb2473b3d3f4b73c3090183b3c2b.jpg"
					]
				});
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			joinlearning(id) {
				var that = this;
				that.isJoined = !that.isJoined;
				that.isJoinTxt = that.isJoined ? "学习完成后开启测试" : "加入学习";
			},
			to_test(id) {
				uni.navigateTo({
					url: "/pages/train/test"
				})
			}
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
		padding-bottom: 30upx;
	}

	.course-inner {
		padding: 30upx;
	}

	.is-joined {
		background: #929292;
		color: #FFFFFF;
		border-color: #929292;
	}

	.course-detail-box {
		border-bottom: 20upx solid #F4F4F4;
	}
</style>
