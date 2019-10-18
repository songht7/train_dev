<template>
	<view class="page-main pages">
		<user-center-top :userInfo="userInfo" :enterpriseUserCount="enterpriseUserCount" :joinCourseUserCount="joinCourseUserCount"
		 :courseCount="courseCount"></user-center-top>
		<view class="user-block" v-if="statisType===0">
			<view class="user-class-list">
				<view class="my-class-head">
					<view class="class-tip">
						<view class="class-icon">
							<uni-icons type="shuji" :size="20" color="#FFFFFF"></uni-icons>
						</view>
						<view class="txt-sross">员工学习进度</view>
					</view>
					<view class="class-more">共{{data_total}}个</view>
				</view>
				<view class="class-list">
					<view class="list-statis fRowCenter">
						<!-- <view class="row-block fRowCenter">排名</view> -->
						<view class="row-block fRowCenter">学员</view>
						<view class="row-block fRowCenter">参与课程</view>
						<view class="row-block fRowCenter">通过考试</view>
						<view class="row-block fRowCenter row-progress">学习总进度</view>
					</view>
					<block v-if="datas.length">
						<view class="list-row class-list-row" v-for="(obj,k) in datas" :key="k">
							<view class="list-block">
								<view class="list-statis fRowCenter">
									<!-- <view class="row-block fRowCenter">{{k+1}}</view> -->
									<view class="row-block fRowCenter">
										<uni-icons v-if="!obj.photo||obj.photo==''" type="touxiang" :size="20" color="#D8D8D8"></uni-icons>
										<img v-if="obj.photo&&obj.photo!=''" :src="obj.photo" class="photo" />
										<!-- <image class="user-portrait photo" v-if="obj.photo&&obj.photo!=''" :src="obj.photo" mode="aspectFill"></image> -->
										{{obj.NAME}}
									</view>
									<view class="row-block fRowCenter">{{obj.joinCourseCount}}</view>
									<view class="row-block fRowCenter">{{obj.passExamCount}}</view>
									<view class="row-block fRowCenter row-progress">
										<progress :percent="obj.progress" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0" />
										{{obj.progress}}%
									</view>
								</view>
							</view>
						</view>
					</block>
					<uni-load-more :status="status"></uni-load-more>
				</view>
			</view>
		</view>
		<view class="user-block" v-if="statisType==1||statisType==2">
			<view class="user-class-list">
				<view class="my-class-head">
					<view class="class-tip">
						<view class="class-icon">
							<uni-icons type="shuji" :size="20" color="#FFFFFF"></uni-icons>
						</view>
						<view class="txt-sross">{{statisType==1?'课程参与情况':'课程合格情况'}}</view>
					</view>
					<view class="class-more">共{{data_total}}个</view>
				</view>
				<view class="class-list">
					<view class="class-list">
						<block v-if="datas">
							<view class="list-row class-list-row" v-for="(obj,k) in datas" :key="k">
								<view class="list-block" @click="navToTrain(obj.id)">
									<view class="list-more">
										<view class="list-left class-list-left">
											<view class="list-title">{{obj.name}}</view>
											<view class="class-progress">
												<view class="progress-box">
													<view class="percent">{{statisType==1?"参与度"+obj.progress+"%":(obj.passExam!=null?"合格率"+obj.progress+"%":"无试题")}}</view>
													<progress :percent="obj.progress&&obj.progress>=0?obj.progress:'0'" stroke-width="4" activeColor="#008CEE"
													 backgroundColor="#E0E0E0" />
												</view>
											</view>
										</view>
										<view class="list-right">
											<image class="image-full" :src="obj.original_src?obj.original_src:'/static/default.png'" mode="aspectFill"></image>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
					<uni-load-more :status="status"></uni-load-more>
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import userCenterTop from '@/components/user-center-top.vue'
	import uniGrid from '@/components/uni-grid.vue'
	import uniLoadMore from '@/components/uni-load-more.vue'
	export default {
		data() {
			return {
				pageKey: 0,
				userInfo: {},
				UserId: "",
				statisType: 0,
				userCenterDatas: {},
				enterpriseUserCount: "0", //员工总数
				joinCourseUserCount: "0", //参与学习
				courseCount: "0", //总课程数
				datas: [],
				data_total: 0,
				pageIndex: 1,
				pageSize: 5,
				status: "loading",
				interList: [{
					"inter": "personalProgresses",
					"dataFor": "personal"
				}, {
					"inter": "courseProgresses",
					"dataFor": "course"
				}, {
					"inter": "testProgresses",
					"dataFor": "test"
				}]
			}
		},
		components: {
			userCenterTop,
			uniGrid,
			uniLoadMore
		},
		computed: {},
		onLoad(e) {
			//console.log("onLoad")
			var that = this;
			let p = e.t || 0;
			that.pageKey = p;
			that.statisType = parseInt(p);
			that.$store.dispatch("cheack_page", p)
			//console.log(that.statisType)
		},
		onShow() {
			//console.log("onShow")
			var that = this;
			that.setPageData();
			that.getDatas();
			that.$store.dispatch("cheack_page", that.pageKey)
			// interList.forEach((obj, key) => {
			// 	that.getDatas(obj.inter, obj.dataFor)
			// })
		},
		onReady() {
			//console.log("onReady")
			var that = this;
		},
		onPullDownRefresh() {
			var that = this;
			that.pageIndex = 1;
			that.status = "loading";
			that.getDatas()
			that.getUserInfo()
		},
		onReachBottom() {
			var that = this;
			if (that.status === "noMore") {
				return;
			}
			if (that.datas.length >= that.data_total || that.data_total <= 0) {
				that.status = "noMore";
				return;
			}
			that.pageIndex = that.pageIndex + 1;
			that.status = "loading";
			that.getDatas()
		},
		methods: {
			setPageData() {
				var that = this;
				that.$store.dispatch('cheack_user');
				var _user = that.$store.state.user.userInfo;
				that.UserId = _user.id || '';
				that.userInfo = _user;
				that.enterpriseUserCount = _user.subInfo.enterpriseUserCount || '0';
				that.joinCourseUserCount = _user.subInfo.joinCourseUserCount || '0';
				that.courseCount = _user.subInfo.courseCount || '0';
				//console.log("_user:", _user)
			},
			getDatas() {
				var that = this;
				let data = {
					"inter": that.interList[that.statisType].inter,
					"parm": `?currentPage=${that.pageIndex}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				data["fun"] = function(res) {
					that.status = "more";
					uni.stopPullDownRefresh()
					if (res.success) {
						var _data = res.data.list;
						if (_data) {
							_data.map(item => item.progress = parseInt(item.progress));
							if (that.pageIndex == 1) {
								that.datas = _data;
							} else {
								//console.log(_data)
								//that.datas.push(_data);
								_data.forEach(item => {
									that.datas.push(item);
								});
							}
							that.data_total = res.data.total;
						} else {
							that.datas = []
						}
						if (that.datas.length >= res.data.total || res.data.total <= 0) {
							that.status = "noMore";
							return;
						}
					} else {
						if (res.msg == "令牌错误") {
							that.$store.dispatch('logout')
						}
					}
				}
				that.$store.dispatch("getData", data)
			},
			getUserInfo() {
				var that = this;
				let _data = {
					"inter": "info",
					"header": {
						"token": that.$store.state.user.token || ""
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
								uni.setStorage({
									key: "user",
									data: ress_data,
									success: function() {
										that.setPageData();
									}
								});
							},
							fail() {}
						})
					}
				}
				that.$store.dispatch("getData", _data)
			},
			navToTrain(id) {
				uni.navigateTo({
					url: `/pages/train/unitlist?id=${id}`
				})
			}
		}
	}
</script>

<style>
	@import "../../common/center.css";

	.fRowCenter {
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: center;
	}

	.row-block {
		width: 25%;
	}

	.row-progress {
		width: 28%;
	}

	.photo {
		width: 56upx;
		height: 56upx;
		border-radius: 50%;
		display: block;
		margin-right: 4upx;
	}
</style>
