<template>
	<view class="page-main user-center-main">
		<view class="list-row">
			<view class="list-block">
				<user-center-top :userInfo="userInfo" :joinCourse="joinCourse" :passCourse="passCourse" :failCourse="failCourse"></user-center-top>
				<view class="user-block" v-if="eStatus==='1'">
					<view class="user-class-list">
						<view class="my-class-head">
							<view class="class-tip">
								<view class="class-icon class-icon-qy">
									<uni-icon type="dashaxiaoqudizhi01" :size="16" color="#FFFFFF"></uni-icon>
								</view>
								<view class="txt-sross">企业必须课程</view>
							</view>
							<navigator url="/pages/user/my-class?t=ECourses" class="class-more">全部{{ECoursesTotal}}个></navigator>
						</view>
						<view class="class-list">
							<view class="list-row class-list-row" v-for="(obj,k) in ECourses" :key="k">
								<view class="list-block" @click="navToTrain(obj.id)">
									<view class="list-more">
										<view class="list-left class-list-left">
											<view class="list-title">{{obj.name}}</view>
											<view class="class-progress">
												<view class="progress-box">
													<view class="percent">{{obj.progress<=0?"开始学习":"已学"+obj.progress+"%"}}</view>
													<progress :percent="obj.progress" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0" />
												</view>
											</view>
										</view>
										<view class="list-right">
											<image class="image-full" :src="obj.original_src?obj.original_src:sourceUrl+'/img/logo.png'" mode="aspectFill"></image>
										</view>
									</view>
								</view>
							</view>
							<navigator url="/pages/user/my-class?t=ECourses" class="btns-more">
								查看更多<uni-icon type="gengduo2" size="16" color="#919191"></uni-icon>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-row">
			<view class="list-block">
				<view class="user-block">
					<view class="user-class-list">
						<view class="my-class-head">
							<view class="class-tip">
								<view class="class-icon">
									<uni-icon type="shuji" :size="20" color="#FFFFFF"></uni-icon>
								</view>
								<view class="txt-sross">我参与的课程</view>
							</view>
							<navigator url="/pages/user/my-class" class="class-more">全部{{joinCourse}}个></navigator>
						</view>
						<view class="class-list">
							<view class="list-row class-list-row" v-for="(obj,k) in joinCourses" :key="k">
								<view class="list-block" @click="navToTrain(obj.id)">
									<view class="list-more">
										<view class="list-left class-list-left">
											<view class="list-title">{{obj.name}}</view>
											<view class="class-progress">
												<view class="progress-box">
													<view class="percent">{{obj.progress<=0?"开始学习":"已学"+obj.progress+"%"}}</view>
													<progress :percent="obj.progress" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0" />
												</view>
											</view>
										</view>
										<view class="list-right">
											<image class="image-full" :src="obj.original_src?obj.original_src:sourceUrl+'/img/logo.png'" mode="aspectFill"></image>
										</view>
									</view>
								</view>
							</view>
							<navigator url="/pages/user/my-class" class="btns-more">
								查看更多<uni-icon type="gengduo2" size="16" color="#919191"></uni-icon>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import userCenterTop from '@/components/user-center-top.vue'
	import uniGrid from '@/components/uni-grid.vue'
	export default {
		data() {
			return {
				userInfo: {},
				UserId: "",
				__token: "",
				joinCourses: [], //参与的课
				joinCourse: "0",
				passCourse: "0", //通过考试数
				failCourse: "0", //未通过考试数
				ECourses: [], //企业必须课
				ECoursesTotal: 0,
				eStatus: ""
			}
		},
		components: {
			userCenterTop,
			uniGrid
		},
		onLoad() {},
		onShow() {
			var that = this;
			uni.showLoading({
				title: "加载中..."
			})
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page", 2)
			let _user = that.$store.state.user;
			//console.log(_user.userInfo)
			that.userInfo = _user.userInfo;
			that.__token = _user.token;
			let _subInfo = _user.userInfo.subInfo
			that.joinCourse = _subInfo.joinCourse;
			that.passCourse = _subInfo.passCourse;
			that.failCourse = _subInfo.failCourse;
			that.setPageData(_user.userInfo)
		},
		onPullDownRefresh() {
			var that = this;
			that.getUserInfo()
		},
		methods: {
			setPageData(userInfo) {
				var that = this;
				that.UserId = userInfo.id || '';
				let _eStatus = userInfo.eStatus ? userInfo.eStatus : "";
				that.eStatus = _eStatus;
				that.getJoinCourses()
				if (_eStatus) {
					that.getECourses()
				}
			},
			getUserInfo() {
				var that = this;
				let _data = {
					"inter": "info",
					"header": {
						"token": that.__token
					}
				}
				_data["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						var getUser_res = res.data;
						uni.getStorage({
							key: "user",
							success: function(ress) {
								let ress_data = ress.data;
								ress_data["userInfo"] = getUser_res.userInfo;
								that.setPageData(ress_data["userInfo"])
								uni.setStorage({
									key: "user",
									data: ress_data,
									success: function() {
										//that.$store.dispatch('cheack_user');
									}
								});
							},
							fail() {}
						})
					}
				}
				that.$store.dispatch("getData", _data)
			},
			navTo(page) {
				uni.navigateTo({
					url: `/pages/user/${page}`
				})
			},
			navToTrain(id) {
				uni.navigateTo({
					url: `/pages/train/unitlist?id=${id}`
				})
			},
			getJoinCourses() {
				var that = this;
				let data = {
					"inter": "joinCourses",
					"parm": "?currentPage=1&pagesize=3",
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					uni.hideLoading()
					if (res.success) {
						let _list = res.data.list;
						if (_list) {
							_list.map(item => item["progress"] = parseInt(item["progress"]));
							// _info.company.map((val, i, arr) => {
							// 	val['start_time'] = val['start_time'].split(" ")[0]
							// 	val['end_time'] = val['end_time'].split(" ")[0]
							// })
						}
						that.joinCourses = _list;
						that.joinCourse = res.data.total;
					}
				}
				that.$store.dispatch("getData", data)
			},
			getECourses() {
				var that = this;
				let data = {
					"inter": "enterpriseCourses",
					"parm": "?currentPage=1&pagesize=1",
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					uni.hideLoading()
					if (res.success) {
						let _list = res.data.list;
						if (_list) {
							_list.map(item => item.progress = parseInt(item.progress));
						}
						that.ECourses = _list;
						that.ECoursesTotal = res.data.total;
					}
				}
				that.$store.dispatch("getData", data)
			},
			logout() {
				var that = this;
				let data = {
					"inter": "logout",
					"header": {
						"Content-Type": "application/json",
						"token": that.__token
					},
					"method": "DELETE"
				}
				data["fun"] = function(res) {
					if (res.success) {
						uni.removeStorage({
							key: 'user',
							success: function(res) {
								that.$store.commit("get_user", {})
								that.$store.dispatch("menu_default")
								uni.redirectTo({
									url: '/pages/index/index'
								});
							}
						});
					}
				}
				that.$store.dispatch("getData", data)
			}
		}
	}
</script>

<style>
	@import "./center.css";
</style>
