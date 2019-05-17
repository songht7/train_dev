<template>
	<view class="unit-list">
		<swiper class="swiper-box swiper-slide-unit" :indicator-dots="swiperleng?'true':'false'" circular="circular" interval="interval"
		 duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE" :current="swiperCurrent" @change="swiperChange">
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
				<view class="course-lessions">
					<view class="course-inner">
						<view class="less-row" :class='[lessActive==-1?"less-active":""]' @click="getLessDtl('content',-1)">章节介绍</view>
						<block v-for="(less,i) in lessions" :key="i">
							<view class="less-row" :class='[i==lessActive?"less-active":""]' @click="getLessDtl(less.id,i)">{{i+1}}.{{less.name}}</view>
						</block>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="course-detail-box">
					<view class="course-inner">
						<block v-if="detailType==='content'">
							<view class="course-title">{{data.name}}</view>
							<view class="course-more list-more">
								<view>123人在学</view>
								<view>共{{lessTotal}}门课程</view>
							</view>
							<rich-text class="course-detail" :nodes="data.detail"></rich-text>
						</block>
						<block v-else="">
							<rich-text class="course-detail" :nodes="lessDtl.detail"></rich-text>
						</block>
					</view>
				</view>
			</view>
		</view>

		<fix-button>
			<view class="fbtns fbtns-clr-full btn-totest" :class="isJoined?'is-joined':'' " v-if="!canTest" @click="joinlearning(courseId)">{{isJoinTxt}}</view>
			<view class="fbtns fbtns-clr-full btn-totest" :class="canTest?'':'fbtn-disable'" v-if="canTest" @click="to_test(courseId)">开始测试</view>
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
				cover: [],
				detailType: "content",
				swiperList: [],
				swiperCurrent: 0,
				lessActive: -1,
				lessDefaultActive: 0,
				isJoined: false,
				isJoinTxt: "加入学习", //"学习完成后开启测试" : "加入学习"
				current: 0,
				segmented: [
					'课程目录',
					'介绍'
				],
				canTest: false
			}
		},
		onLoad(e) {
			var that = this;
			that.courseId = e.id;
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
					let _data = res.data;
					that.data = _data;
					/*ucStatus:0 未确认 1学习中 2考试通过
					 * */
					that.isJoined = _data.ucStatus == "1" || _data.ucStatus == "2" ? true : false;
					that.isJoinTxt = _data.ucStatus == "1" ? "学习完成后开启测试" : "加入学习";
					if (_data.lessonCount == _data.lessonStartCount && _data.lessonCount != "0" && _data.lessonStartCount != "0") {
						that.canTest = true;
					}
					let _cover = [{
						"original_src": res.data.original_src || '/img/logo.png'
					}]
					that.swiperList = _cover;
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
					let _defaultIndex = that.lessDefaultActive;
					// if (res.data.list[_defaultIndex] && res.data.list[_defaultIndex].id) {
					// 	that.getLessDtl(res.data.list[_defaultIndex].id, _defaultIndex);
					// }
				}
			}
			that.$store.dispatch("getData", data_les)
		},
		onShow() {
			var that = this;
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
			getLessDtl(lessid, index) {
				var that = this;
				console.log(lessid, index)
				that.detailType = lessid;
				that.current = 1;
				if (index == that.lessActive) {
					return
				}
				if (lessid == 'content' && index == -1) {
					that.lessActive = index;
					that.swiperList = [{
						"original_src": that.data.original_src || '/img/logo.png'
					}]
					return
				}
				/* lessons */
				let data_ldtl = {
					"inter": "lesson",
					"parm": `?lesson_id=${lessid}`,
					"header": {
						"token": that.__token
					}
				}
				data_ldtl["fun"] = function(res) {
					that.swiperCurrent = 0;
					that.lessActive = index;
					that.current = 1;
					/* 记录已读 */
					let data_lean = {
						"inter": "accountLesson",
						"data": {
							"lesson_id": lessid
						},
						"method": "POST",
						"header": {
							"Content-Type": "application/json",
							"token": that.__token
						}
					}
					data_lean["fun"] = function(res) {
						if (res.success) {}
					}
					that.$store.dispatch("getData", data_lean)

					if (res.success) {
						that.lessDtl = res.data;
						if (res.data.images) {
							that.swiperList = res.data.images
						}
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
				var that = this;
				let _current = that.swiperCurrent,
					_preImgs = that.swiperList,
					_urls = _preImgs.map(item => that.$store.state.interface.apiurl + item.original_src);
				let uniPreviewImg = {
					urls: _urls,
					indicator: "number",
					current: _current.toString()
				}
				console.log(uniPreviewImg)
				uni.previewImage(uniPreviewImg);
			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			swiperChange(e) {
				var that = this;
				that.swiperCurrent = e.detail.current;
			},
			joinlearning(id) {
				var that = this;
				if (that.isJoined) {
					return
				}
				/* 加入学习 */
				let data_ldtl = {
					"inter": "accountCourse",
					"data": {
						"course_id": id
					},
					"method": "POST",
					"header": {
						"Content-Type": "application/json",
						"token": that.__token
					}
				}
				data_ldtl["fun"] = function(res) {
					if (res.success) {
						that.isJoined = true;
						that.isJoinTxt = "学习完成后开启测试";
					}
				}
				that.$store.dispatch("getData", data_ldtl)
			},
			to_test(id) {
				var that = this;
				if (that.canTest) {
					uni.navigateTo({
						url: `/pages/train/test?course_id=${id}`
					})
				} else {
					uni.showModal({
						content: "学习完成当前课程方可测试！",
						showCancel: false
					})
				}
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

	.less-active {
		color: #008CEE;
	}
</style>
