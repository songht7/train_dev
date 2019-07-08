<template>
	<view class="page-main unit-list">
		<view class="swiper-main">
			<!-- <view class="photo-album" @click="previewImage">
				<uni-icon type="xiangce1" size="30" color="#F77C5F"></uni-icon>
			</view> -->

			<!-- 	<uni-swiper-dot :info="showList" :current="swiperCurrent" mode="nav" showPos="top" :dots-styles="dotsStyles" field="name">
				<swiper class="swiper-box swiper-slide-unit" @change="swiperChange">
					<swiper-item v-for="(slide,index) in showList" :key="index">
						<view class="swiper-item">
							<image class="slideImg" v-if="!slide.media_type" @click="previewImage" lazy-load="true" :src="slide.original_src"
							 mode="aspectFill"></image>
							<video class="train-video" v-if="slide.media_type=='video'" :src="slide.media_src" @error="videoErrorCallback"
							 controls></video>
							<audio v-if="slide.media_type=='music'" style="text-align: left" :src="slide.media_src" :name="slide.name"
							 author="职照培训" action="{method: 'pause'}" controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg"></audio>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot> -->
			<swiper class="swiper-box swiper-slide-unit" :indicator-dots="swiperleng?'true':'false'" circular="circular"
			 interval="interval" duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE" :current="swiperCurrent"
			 @change="swiperChange">
				<swiper-item v-for="(slide,index) in showList" :key="index">
					<view class="swiper-item train-swiper-main">
						<image class="slideImg" v-if="!slide.media_type" @click="previewImage" lazy-load="true" :src="slide.original_src"
						 mode="aspectFill"></image>
						<view class="video-block" v-if="slide.media_type=='video'">
							<image class="slideImg virtual" lazy-load="true" src="/static/default.png" mode="aspectFill"></image>
							<view class="video-btn">
								<uni-icon type="bofang1" size="80" color="#666" @click="videoPlay"></uni-icon>
							</view>
							<video v-if="slide.media_type=='video'" v-show="videoShow" id="TrainVideo" class="train-video" :src="slide.media_src"
							 @error="videoErrorCallback" controls :enable-progress-gesture="gesture" @pause="videoPause" @fullscreenchange="videoOperation"></video>
						</view>
						<!-- <audio v-if="slide.media_type=='music'" style="text-align: left" :src="slide.media_src" :name="slide.name" author="职照培训"
						 action="{method: 'pause'}" controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg"></audio> -->
						<view class="media-music" v-if="slide.media_type=='music'">
							<view class="music-icon">
								<uni-icon type="bofang" size="32" color="#666" v-if="music.playState=='play'" @click="musicSet('play')"></uni-icon>
								<uni-icon type="suspend_icon" size="32" color="#666" v-if="music.playState=='pause'" @click="musicSet('pause')"></uni-icon>
							</view>
							<view class="music-play">
								<view class="music-info">
									<view class="music-title">{{slide.name}}</view>
									<view class="music-duration">时长{{music.duration?music.duration+'秒':''}}</view>
								</view>
								<view class="music-progress">
									<slider :value="music.sliderVal" @changing="sliderChanging" @change="sliderChange" show-value min="0" :max="music.duration" />
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="music-loading" v-if="hasMusic" :class="music.playState==='pause'?'rotating':''" @click="musicSet(music.playState)">
			<uni-icon type="music" size="40" color="#006FFF"></uni-icon>
		</view>
		<view class="uni-padding-wrap uni-common-mt segmented-box">
			<uni-segmented-control :current="current" :values="segmented" v-on:clickItem="onClicksegmented" styleType="text"
			 activeColor="#008CEE"></uni-segmented-control>
		</view>
		<view class="unit-content">
			<view v-show="current === 0">
				<view class="course-lessions">
					<view class="course-inner">
						<!-- <view class="less-row" :class='[lessActive==-1?"less-active":""]' @click="getLessDtl('content',-1)">章节介绍</view> -->
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
								<!-- <view>123人在学</view> -->
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

		<fix-button gobackShow="hide">
			<view class="fbtns btn-goback" @click="goback">返回</view>
			<view class="fbtns fbtns-clr-full btn-totest" :class="isJoined?'is-joined':'' " v-if="!canTest||!test_list" @click="joinlearning(courseId)">{{isJoinTxt}}</view>
			<view class="fbtns fbtns-clr-full btn-totest" :class="canTest&&test_list?'':'fbtn-disable'" v-if="canTest&&test_list"
			 @click="to_test(courseId)">开始测试</view>
		</fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		data() {
			return {
				__token: "",
				courseId: "",
				data: [],
				title: "",
				lessions: [],
				lessTotal: "",
				lessDtl: [],
				cover: [],
				detailType: "",
				media: [],
				showList: [{
					"name": "",
					"original_src": `${this.$store.state.interface.apiurl}/img/logo.png`
				}],
				swiperList: [],
				swiperCurrent: 0,
				lessActive: -1,
				lessDefaultActive: 0,
				isJoined: false,
				isJoinTxt: "加入学习", //"学习完成后开启测试" : "加入学习":"已加入学习"
				current: 0,
				segmented: [
					'课程目录'
				],
				currentPage: 1,
				pageSize: 100,
				canTest: false,
				test_list: false,
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				videoContext: "",
				videoShow: false,
				gesture: false, //是否开启控制进度的手势
				hasMusic: false,
				audioContext: "",
				music: {
					playState: 'play',
					startTime: 0,
					loop: false,
					autoplay: false,
					buffered: 0,
					duration: 0,
					currentTime: 0,
					sliderVal: 0
				}
			}
		},
		onLoad(e) {
			var that = this;
			that.courseId = e.id;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token;
		},
		onShow() {
			var that = this;
			var _audioContext = that.audioContext;
			if (_audioContext) {
				_audioContext.destroy();
			}
			that.cheackTestLng();
			that.pageInit();
		},
		onReady: function(res) {},
		onPullDownRefresh() {
			var that = this;
			that.pageInit();
		},
		onHide() {
			console.log("onHide")
			var that = this;
			that.musicDestroy();
		},
		onUnload() {
			console.log("onUnload")
			var that = this;
			that.musicDestroy();
		},
		components: {
			fixButton,
			uniSegmentedControl,
			uniSwiperDot
		},
		computed: {
			swiperleng() {
				return this.swiperList.length
			}
		},
		methods: {
			pageInit() {
				var that = this;
				/* course-detail */
				let data_dtl = {
					"inter": "course",
					"parm": `?course_id=${that.courseId}&currentPage=${that.currentPage}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.__token
					}
				}
				data_dtl["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						let _data = res.data;
						that.title = _data.name;
						uni.setNavigationBarTitle({
							title: _data.name
						});
						_data["detail"] = _data["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						that.data = _data;
						/*ucStatus:0 未确认 1学习中 2考试通过
						 * */
						that.isJoined = _data.ucStatus == "1" || _data.ucStatus == "2" ? true : false;
						if (!that.test_list) {
							that.isJoinTxt = _data.ucStatus == "1" ? "已加入学习" : "加入学习"
						} else {
							that.isJoinTxt = _data.ucStatus == "1" ? "学习完成后开启测试" : "加入学习";
						}
						if (_data.lessonCount == _data.lessonStartCount && _data.lessonCount != "0" && _data.lessonStartCount != "0") {
							that.canTest = true;
						}
						let _cover = [{
							"name": _data.name,
							"original_src": res.data.original_src || `${that.$store.state.interface.apiurl}/img/logo.png`
						}]

						that.showList = _cover;
						that.swiperList = _cover;
						// console.log(that.swiperCurrent)
						// console.log(that.showList[that.swiperCurrent]["name"])
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
					uni.stopPullDownRefresh()
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
			getLessDtl(lessid, index) {
				var that = this;
				console.log(lessid, index)
				that.segmented = [
					'课程目录',
					'内容'
				]
				that.detailType = lessid;
				that.current = 1;
				if (index == that.lessActive) {
					return
				}
				that.musicDestroy();

				if (lessid == 'content' && index == -1) {
					that.lessActive = index;
					that.swiperList = [{
						"original_src": that.data.original_src || `${this.$store.state.interface.apiurl}/img/logo.png`
					}];
					that.showList = [{
						"original_src": that.data.original_src || `${this.$store.state.interface.apiurl}/img/logo.png`
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
						var res_data = res.data;
						res_data["detail"] = res_data["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						that.lessDtl = res_data;
						var _img = res_data.images ? res_data.images : [];
						if (res_data.src && res_data.type) {
							let media = {
								"name": res_data.name,
								"media_type": res_data.type,
								"media_src": res_data.src
							}
							_img.push(media)
						}
						if (_img) {
							_img.map((obj) => obj["name"] = res_data.name);
							// let filter_img = _img.filter((obj, index) => !obj.media_type && index < 3);
							let filter_img = _img.filter((obj, index) => !obj.media_type);
							let filter_media = _img.filter((obj, index) => obj.media_type);
							if (filter_img && filter_media) {
								that.showList = [...filter_img, ...filter_media];
							} else if (filter_img && !filter_media) {
								that.showList = [...filter_img];
							} else if (!filter_img && filter_media) {
								that.showList = [...filter_media];
							}
							if (filter_media) {
								that.media = filter_media;
								that.setVideo();
							}
							//console.log(that.showList)
							that.swiperList = _img;
						}
					}
				}
				that.$store.dispatch("getData", data_ldtl)
			},
			videoPlay(type) {
				var that = this;
				let vc = that.videoContext;
				console.log(vc)
				that.videoShow = true;
				vc.play();
				vc.requestFullScreen();
			},
			videoPause(e) {
				console.log('---------videoPause--------')
				console.log(e)
			},
			videoOperation(e) {
				var that = this;
				console.log(e)
				if (!e.detail.fullScreen) {
					console.log("fullscreenchange:", e.target.fullScreen)
					var vd = that.videoContext;
					console.log(vd)
					//vd.pause();
					//vd.exitFullScreen();
					that.videoShow = false;
				}
			},
			setVideo() {
				var that = this;
				var _media = that.media;
				console.log("setVideo:", _media)
				_media.forEach((obj, i) => {
					console.log(obj.media_type)
					if (obj.media_type == "video") {
						that.videoContext = uni.createVideoContext('TrainVideo')
					} else if (obj.media_type == "music") {
						that.hasMusic = true;
						var _audioContext = uni.createInnerAudioContext();
						that.audioContext = _audioContext;
						_audioContext.autoplay = that.music.autoplay;
						_audioContext.src = obj.media_src;
					}
				})

			},
			musicSet(type) {
				var that = this;
				var _type = type;
				switch (_type) {
					case 'play':
						that.musicOnPlay();
						break;
					case 'pause':
						that.musicOnPause();
						break;
					default:
						break;
				}
			},
			musicOnPlay() {
				var that = this;
				var _audioContext = that.audioContext;
				var _music = that.music;
				_audioContext.play();
				_audioContext.onError((res) => {
					uni.showToast({
						title: res.errMsg,
						icon: "none"
					})
				})
				_audioContext.onPlay(() => {
					_music.duration = Math.ceil(_audioContext.duration);
					_music.playState = 'pause';
					console.log("startTime:", _audioContext.startTime)
				});
				_audioContext.onTimeUpdate(() => {
					let _currentTime = _audioContext.currentTime;
					var _duration = _music.duration;
					if (_duration <= 0) {
						let _d = Math.ceil(_audioContext.duration)
						that.music.duration = _d;
						_duration = _d;
					}
					var _sliderVal = 0;
					_sliderVal = parseInt(_currentTime);
					if (_sliderVal >= _duration) {
						_sliderVal = _duration
					}
					//console.log(_currentTime, _sliderVal)
					that.music.sliderVal = _sliderVal;
				});
				_audioContext.onEnded(() => {
					_music.playState = 'play';
					that.music.sliderVal = 0;
				});
			},
			musicOnPause() {
				var that = this;
				var _audioContext = that.audioContext;
				var _music = that.music;
				_audioContext.pause();
				_audioContext.onPause(() => {
					_music.playState = 'play';
				});
				_audioContext.offTimeUpdate();
			},
			musicOnStop() {
				var that = this;
				var _audioContext = that.audioContext;
				var _music = that.music;
				_audioContext.stop();
				_audioContext.onStop(() => {
					_music.playState = 'play';
				});
				_audioContext.offTimeUpdate();
			},
			musicDestroy() {
				var that = this;
				/*音频销毁*/
				var _music = that.music;
				_music.playState = 'play';
				_music.sliderVal = 0;
				_music.duration = 0;
				that.hasMusic = false;
				var _audioContext = that.audioContext;
				if (_audioContext) {
					_audioContext.destroy();
				}
				/*、音频销毁*/
			},
			sliderChanging(e) {
				var that = this;
				that.musicOnPause();
			},
			sliderChange(e) {
				var that = this;
				var changeVal = e.detail.value;
				var _audioContext = that.audioContext;
				that.music.sliderVal = changeVal;
				_audioContext.seek(changeVal);
				that.musicOnPlay();
				//console.log('value 发生变化：' + changeVal)
			},
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			goback() {
				var that = this;
				if (that.current === 1) {
					that.current = 0;
				} else {
					that.$store.dispatch('goback')
				}
			},
			previewImage() {
				var that = this;
				let _current = that.swiperCurrent,
					_preImgs = that.swiperList,
					_filter = _preImgs.filter(obj => !obj.media_type),
					_urls = _filter.map(item => item.original_src);
				let uniPreviewImg = {
					urls: _urls,
					indicator: "number",
					current: _current //.toString()
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
					if (that.test_list) {
						uni.navigateTo({
							url: `/pages/train/test?course_id=${id}`
						})
					} else {
						uni.showModal({
							content: "该课程暂无试题库！",
							showCancel: false
						})
					}
				} else {
					uni.showModal({
						content: "学习完成当前课程方可测试！",
						showCancel: false
					})
				}
			},
			cheackTestLng() {
				var that = this;
				/* tests */
				let data_tests = {
					"inter": "tests",
					"parm": `?course_id=${that.courseId}`,
					"header": {
						"token": that.__token
					}
				}
				data_tests["fun"] = function(res) {
					if (res.success) {
						that.test_list = res.data.list;
					}
				}
				that.$store.dispatch("getData", data_tests)
			}
		}
	}
</script>

<style>
	.swiper-main {
		position: relative;
	}

	.photo-album {
		position: absolute;
		right: 20upx;
		top: 80upx;
		z-index: 3;
		padding: 20upx;
	}

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

	.course-detail-box:last-child {
		border-bottom: none;
	}

	.less-active {
		color: #008CEE;
	}

	.train-swiper-main {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.video-block {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.video-btn {
		position: absolute;
	}

	.virtual {
		opacity: 0.3;
	}

	.media-music {
		background: #FCFCFC;
		border: 1px solid #E0E0E0;
		color: #333;
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: flex-start;
		width: 80%;
		border-radius: 10upx;
	}

	.music-icon {
		border-right: 1px solid #E0E0E0;
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
		justify-content: center;
		padding: 10upx;
		height: 100%;
		width: 100upx;
	}

	.music-play {
		padding: 10upx 20upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
	}

	.music-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	.music-loading {
		position: fixed;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: center;
		width: 90upx;
		height: 90upx;
		top: 8%;
		right: 5%;
		opacity: 0.9;
		z-index: 5;
		border-radius: 50%;
	}

	.rotating {
		animation: rotate 5s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
