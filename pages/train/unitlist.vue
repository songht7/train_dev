<template>
	<view class="page-main unit-list">
		<view :class="['swiper-main','animate__animated',showListLen]">
			<!-- <view class="photo-album" @click="previewImage">
				<uni-icons type="xiangce1" size="30" color="#F77C5F"></uni-icons>
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
			<swiper :class="['swiper-box','swiper-slide-unit']" :indicator-dots="swiperleng" circular="circular" interval="interval"
			 duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE" :current="swiperCurrent" @change="swiperChange">
				<swiper-item v-for="(slide,index) in showList" :key="index">
					<view class="swiper-item train-swiper-main">
						<image class="slideImg" v-if="!slide.media_type" @click="previewImage" lazy-load="true" :src="slide.original_src"
						 mode="aspectFill"></image>
						<view class="video-block" v-if="slide.media_type=='video'&&slide.media_src">
							<image class="slideImg virtual" v-show="!videoShow" lazy-load="true" src="/static/bg-v.png" mode="aspectFill"></image>
							<view class="video-btn" v-show="!videoShow">
								<uni-icons type="bofang1" size="80" color="#fff" @click="videoPlay"></uni-icons>
							</view>
							<video v-if="slide.media_type=='video'" v-show="videoShow" id="TrainVideo" class="train-video" :src="slide.media_src"
							 @error="videoErrorCallback" controls :enable-progress-gesture="gesture" @pause="videoPause" @fullscreenchange="videoOperation"></video>
						</view>
						<!-- <audio v-if="slide.media_type=='music'" style="text-align: left" :src="slide.media_src" :name="slide.name" author="职照培训"
						 action="{method: 'pause'}" controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg"></audio> -->
						<div class="video-block media-music-box" v-if="hasMusic">
							<image class="slideImg virtual media-music-bg" lazy-load="true" src="/static/bg-m.png" mode="aspectFill"></image>
							<view class="media-music">
								<view class="music-icon">
									<uni-icons type="bofang" size="32" color="#666" v-if="music.playState=='play'" @click="musicSet('play')"></uni-icons>
									<uni-icons type="suspend_icon" size="32" color="#666" v-if="music.playState=='pause'" @click="musicSet('pause')"></uni-icons>
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
						</div>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-padding-wrap uni-common-mt segmented-box">
			<uni-segmented-control :current="current" :values="segmented" v-on:clickItem="onClicksegmented" styleType="text"
			 activeColor="#008CEE"></uni-segmented-control>
		</view>
		<scroll-view scroll-y class="train-detail-main" :scroll-top="scrollTop" @scroll="scroll">
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
							<block v-else>
								<block v-if="__token">
									<rich-text class="course-detail" :nodes="lessDtl.detail"></rich-text>
									<view :class="['less-more',!lessDtl.less_prev?'less-fist':'']">
										<view :class="['less-m-btn','less-prev']" v-if="lessDtl.less_prev" @click="getLessDtl(lessDtl.less_prev.id,lessDtl.less_prev.index,'lessMore')">上一章
											<!-- [{{lessDtl.less_prev.name}}] -->
										</view>
										<view :class="['less-m-btn','less-next']" v-if="lessDtl.less_next" @click="getLessDtl(lessDtl.less_next.id,lessDtl.less_next.index,'lessMore')">下一章
											<!-- [{{lessDtl.less_next.name}}] -->
										</view>
									</view>
								</block>
								<block v-else>
									<login-tip></login-tip>
								</block>
							</block>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<block v-if="hasMusic">
			<view class="music-loading" :class="music.playState==='pause'?'rotating':''" @click="musicSet(music.playState)">
				<uni-icons type="music" size="40" color="#006FFF"></uni-icons>
			</view>
		</block>
		<block v-if="__token">
			<fix-button gobackShow="hide">
				<view class="fbtns btn-goback" @click="goback">{{current == 1?'返回':'返回'}}</view>
				<view class="fbtns fbtns-clr-full btn-totest" :class="isJoined?'is-joined':'' " v-if="!canTest||!test_list" @click="joinlearning(courseId)">{{isJoinTxt}}</view>
				<view class="fbtns fbtns-clr-full btn-totest" :class="canTest&&test_list?'':'fbtn-disable'" v-if="canTest&&test_list"
				 @click="to_test(courseId)">开始测试</view>
			</fix-button>
		</block>
		<block v-else>
			<tab-bar></tab-bar>
		</block>
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
				cLessId: 0,
				cLessIndex: 0,
				storage_LessId: "",
				cover: [],
				detailType: "",
				media: [],
				showList: [{
					"name": "",
					"original_src": '/static/default.png'
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
					src: '',
					playState: 'play',
					startTime: 0,
					loop: false,
					autoplay: false,
					buffered: 0,
					duration: 0,
					currentTime: 0,
					sliderVal: 0,
					init: false, //是否可进入初始化（背景音频）
					coverImgUrl: '/static/logo.png',
					singer: '职照学习平台'
				},
				learn_begin: 0,
				learn_end: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad(e) {
			console.log("onLoad")
			var that = this;
			that.courseId = e.id;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token ? that.$store.state.user.token : "";
			that.pageInit();
		},
		onShow() {
			console.log("onShow");
			var that = this;
		},
		onReady: function(res) {
			console.log("onReady")
			var that = this;
			// var _audioContext = this.$audio;
			// if (_audioContext) {
			// 	_audioContext.destroy();
			// }
			that.cheackTestLng();
		},
		onPullDownRefresh() {
			var that = this;
			switch (that.current) {
				case 0:
					that.pageInit();
					break;
				case 1:
					let _cLessId = that.cLessId;
					let _cLessIndex = that.cLessIndex;
					that.getLessDtl(_cLessId, _cLessIndex);
					break;
				default:
					break;
			}
		},
		onHide() {
			console.log("onHide")
			var that = this;
			console.log(that.music.playState)
			//that.musicDestroy();//音频销毁
			//that.musicOnPause(); //音频暂停musicOnPause
			//that.musicOnPlay(); //音频musicOnPlay
			that.learnTime(); //统计时长
		},
		onUnload() {
			console.log("onUnload")
			var that = this;
			that.learnTime(); //统计时长
			that.musicDestroy();
			that.audioContext = "";
		},
		components: {
			fixButton,
			uniSegmentedControl,
			uniSwiperDot
		},
		computed: {
			swiperleng() {
				let l = this.swiperList.length > 1 ? true : false;
				return l
			},
			showListLen() {
				return this.showList.length <= 0 ? 'animate__hide' : 'animate__show';
			}
		},
		methods: {
			pageInit() {
				var that = this;
				if (!that.__token) {
					//return
				}
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
						if (_data["detail"]) {
							_data["detail"] = _data["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						}
						that.data = _data;
						if (_data.percentage) {
							that.$store.state.percentage = _data.percentage;
						}
						/*ucStatus:0 未确认 1学习中 2考试通过
						 * */
						that.isJoined = _data.ucStatus == "1" || _data.ucStatus == "2" ? true : false;
						if (!that.test_list) {
							that.isJoinTxt = _data.ucStatus == "1" ? "已加入学习" : "加入学习"
						} else {
							that.isJoinTxt = _data.ucStatus == "1" ? "学习完成后开启测试" : "加入学习";
						}
						if (_data.lessonStartCount >= _data.lessonCount && _data.lessonCount != "0" && _data.lessonStartCount != "0") {
							that.canTest = true;
						}
						let _original_src = res.data.original_src;
						let _cover = [{
							"name": _data.name,
							"original_src": _original_src && _original_src != "./img/no_img.jpg" ? _original_src : '/static/default.png'
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
			getLessDtl(lessid, index, type) {
				var that = this;
				that.segmented = [
					'课程目录',
					'内容'
				]
				that.detailType = lessid;
				that.current = 1;
				if (index == that.lessActive) {
					//return
				}
				if (type == 'lessMore') {
					that.learnTime(); //统计时长
				}
				that.musicDestroy();
				that.musicOnPause();
				that.audioContext = "";
				if (lessid == 'content' && index == -1) {
					that.lessActive = index;
					let _original_src = that.data.original_src;
					that.swiperList = [{
						"original_src": _original_src && _original_src != "./img/no_img.jpg" ? _original_src : '/static/default.png'
					}];
					that.showList = [{
						"original_src": _original_src && _original_src != "./img/no_img.jpg" ? _original_src : '/static/default.png'
					}]
					return
				}
				that.cLessId = lessid;
				that.cLessIndex = index;
				/* lessons */
				let data_ldtl = {
					"inter": "lesson",
					"parm": `?lesson_id=${lessid}`,
					"header": {
						"token": that.__token
					}
				}
				data_ldtl["fun"] = function(res) {
					uni.stopPullDownRefresh()
					that.learn_begin = Math.round(new Date().getTime() / 1000); //记录进入时间
					that.swiperCurrent = 0;
					that.lessActive = index;
					that.current = 1;
					/* 记录已读 */
					if (that.isJoined) {
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
					}
					if (res.success) {
						var res_data = res.data;
						if (res_data["detail"]) {
							res_data["detail"] = res_data["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						}
						that.lessDtl = res_data;
						var _img = res_data.images ? res_data.images : [];
						that.lessions.filter((obj, k) => {
							if (index - 1 == k) {
								obj['index'] = k;
								res_data['less_prev'] = obj;
							}
							if (index + 1 == k) {
								obj['index'] = k;
								res_data['less_next'] = obj;
							}
						});
						console.log('res_data:', res_data)
						// prevId
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
							if (that.showList.length <= 0) {
								// that.showList = [{
								// 	"name": "",
								// 	"original_src": '/static/default.png'
								// }]
							}
							console.log("showList:", that.showList)
							that.swiperList = _img;
						}
						that.scrollTop = that.old.scrollTop
						that.$nextTick(function() {
							that.scrollTop = 0
						});
					}
				}
				that.$store.dispatch("getData", data_ldtl)
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			videoPlay(type) {
				var that = this;
				let vc = that.videoContext;
				// console.log(vc)
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
					// console.log("fullscreenchange:", e.target.fullScreen)
					var vd = that.videoContext;
					// console.log(vd)
					vd.pause();
					vd.exitFullScreen();
					//that.videoShow = false;
				}
			},
			setVideo() {
				var that = this;
				var _media = that.media;
				// console.log("setVideo:", _media)
				if (_media && _media.length > 0) {
					_media.forEach((obj, i) => {
						if (obj.media_type == 'video') {
							that.videoContext = uni.createVideoContext('TrainVideo')
						} else if (obj.media_type == "music" && obj.media_src != "0") {
							that.hasMusic = true;
							that.music.src = obj.media_src; //缓存背景音频SRC
							// #ifndef H5
							that.music.init = true; //可进入初始化
							// #endif
							// #ifdef H5
							that.$audio.src = obj.media_src;
							// #endif
							that.music.title = obj.name;
						}
					})
				}
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
				var _audioContext = this.$audio;
				var _music = that.music;
				// #ifndef H5
				if (that.music.init) {
					this.$audio.src = _music.src;
					this.$audio.title = _music.title;
					this.$audio.singer = _music.singer;
					this.$audio.coverImgUrl = _music.coverImgUrl;
					that.music.init = false;
				}
				// #endif
				_audioContext.play();
				_audioContext.onError((res) => {
					uni.showToast({
						title: res.errMsg,
						icon: "none"
					})
				})
				_audioContext.onPlay(() => {
					_music.playState = 'pause';
					_music.duration = Math.ceil(_audioContext.duration);
					// console.log("startTime:", _audioContext.startTime)
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
				var _audioContext = this.$audio;
				var _music = that.music;

				// #ifndef H5
				if (_audioContext) {
					_audioContext.pause();
				}
				_music.playState = 'play';
				// #endif
				// #ifdef H5
				if (_audioContext) {
					_audioContext.pause();
					_audioContext.onPause(() => {
						_music.playState = 'play';
					});
					_audioContext.offTimeUpdate();
				}
				// #endif
			},
			musicOnStop() {
				var that = this;
				var _audioContext = this.$audio;
				var _music = that.music;

				// #ifndef H5
				_audioContext.stop();
				_music.playState = 'play';
				// #endif
				// #ifdef H5
				_audioContext.stop();
				_audioContext.onStop(() => {
					_music.playState = 'play';
				});
				_audioContext.offTimeUpdate();
				// #endif
			},
			musicDestroy() {
				var that = this;
				var _audioContext = this.$audio;
				var _music = that.music;
				_music.playState = 'play';
				_music.sliderVal = 0;
				_music.duration = 0;
				that.hasMusic = false;
				// #ifndef H5
				if (this.$audio) {
					this.$audio.stop();
					// that.music.src = '';
					// that.music.init = false;
					// _audioContext.src = '';
				}
				// #endif
				// #ifdef H5
				/*H5音频销毁*/
				if (this.$audio) {
					this.$audio.destroy();
				}
				// #endif
			},
			sliderChanging(e) {
				var that = this;
				that.musicOnPause();
			},
			sliderChange(e) {
				var that = this;
				var changeVal = e.detail.value;
				var _audioContext = this.$audio;
				that.music.sliderVal = changeVal;
				_audioContext.seek(changeVal);
				that.musicOnPlay();
				//console.log('value 发生变化：' + changeVal)
			},
			onClicksegmented(index) {
				var that = this;
				// console.log(that.current, index)
				if (that.current !== index) {
					that.current = index;
				}
				if (index <= 0) {
					that.learnTime(); //统计时长
				} else if (index >= 1) {
					that.learn_begin = Math.round(new Date().getTime() / 1000); //记录进入时间
				}
				if (index === 0) {
					that.musicOnPause(); //音频暂停musicOnPause
				}
			},
			goback() {
				var that = this;
				if (that.current === 1) {
					that.current = 0;
					that.musicOnPause(); //音频暂停musicOnPause
				} else {
					that.$store.dispatch('goback')
				}
				that.learnTime(); //统计时长
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
				// console.log(uniPreviewImg)
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
			},
			learnTime() {
				// 课时学习时长 进入时间-退出时间
				var that = this;
				if (that.isJoined) {
					let learn_begin = that.learn_begin; //记录出去时间
					if (learn_begin <= 0) {
						console.log("**learnTime return***")
						return
					}
					let learn_end = Math.round(new Date().getTime() / 1000); //记录出去时间
					let time_over = parseFloat(learn_end - learn_begin);
					time_over = time_over <= 0 ? 1 : time_over;
					if (learn_begin <= 0) {
						time_over = 1;
					}
					console.log('learnTime::: cLessId：%s, learn_begin %s, learn_end: %s, time_over: %s', that.cLessId, learn_begin,
						learn_end, time_over)
					/* lessons */
					let param = {
						"inter": "saveTime",
						"data": {
							lesson_id: that.cLessId,
							duration: time_over,
						},
						method: "POST",
						"header": {
							"token": that.__token
						}
					}
					param["fun"] = function(res) {
						if (res.success) {
							that.learn_begin = 0;
							that.learn_end = 0;
							//that.test_list = res.data.list;
						}
					}
					that.$store.dispatch("getData", param);


					// let param1 = {
					// 	"inter": "saveTime",
					// 	"data": {
					// 		lesson_id: that.cLessId,
					// 		delete: 1,
					// 		duration: learn_begin,
					// 	},
					// 	method: "POST",
					// 	"header": {
					// 		"token": that.__token
					// 	}
					// }
					// param1["fun"] = function(res) {}
					// let param2 = {
					// 	"inter": "saveTime",
					// 	"data": {
					// 		lesson_id: that.cLessId,
					// 		delete: 2,
					// 		duration: learn_end,
					// 	},
					// 	method: "POST",
					// 	"header": {
					// 		"token": that.__token
					// 	}
					// }
					// param2["fun"] = function(res) {}
					// that.$store.dispatch("getData", param1)
					// that.$store.dispatch("getData", param2)
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./train.css");
</style>
