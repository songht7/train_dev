<template>
	<view class="user-center">
		<view class="page-main">
			<view class="user-block">
				<view class="user-class-list">
					<view class="my-class-head">
						<view class="class-tip">
							<view class="class-icon" :class="{'class-icon-qy':pageType}">
								<uni-icons v-if="!pageType" type="shuji" :size="20" color="#FFFFFF"></uni-icons>
								<uni-icons v-if="pageType" type="dashaxiaoqudizhi01" :size="16" color="#FFFFFF"></uni-icons>
							</view>
							<view class="txt-sross">{{pageOverview}}</view>
						</view>
					</view>
					<view class="class-list">
						<view class="list-row class-list-row" v-for="(obj,k) in datas" :key="k">
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
						<uni-load-more :status="status"></uni-load-more>
					</view>
				</view>
			</view>
		</view>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniLoadMore from '@/components/uni-load-more.vue'
	export default {
		data() {
			return {
				UserId: "",
				__token: "",
				datas: [],
				pageOverview: "我参与的课程",
				pageType: "",
				pageIndex: 1,
				pageSize: 7,
				status: "more",
				courseState: 1
			}
		},
		components: {
			uniLoadMore,
			fixButton
		},
		onLoad(e) {
			var that = this;
			that.pageType = e.t || "";
			that.pageOverview = e.t ? "企业必须课程" : "我参与的课程";
			that.courseState = e.cs || 1;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user');
			that.UserId = that.$store.state.user.userInfo.id || '';
			that.__token = that.$store.state.user.token;
			that.getDatas();
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
			that.getDatas()
		},
		computed: {},
		methods: {
			getParseInt(val) {
				return getParseInt(val)
			},
			navToTrain(id) {
				uni.navigateTo({
					url: `/pages/train/unitlist?id=${id}`
				})
			},
			getDatas(type) {
				var that = this;
				var type = type || that.pageType;
				var inter = "joinCourses";
				if (type) {
					inter = "enterpriseCourses"
				}
				that.status = "loading";
				let data = {
					"inter": inter,
					"parm": `?currentPage=${that.pageIndex}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					that.status = "more";
					if (res.success) {
						var _data = res.data.list;
						var _total = parseInt(res.data.total);
						if (_data) {
							_data.map(item => item["progress"] = parseInt(item["progress"]));
							if (that.pageIndex == 1) {
								that.datas = _data;
							} else {
								console.log(_data)
								//that.datas.push(_data);
								_data.forEach(item => {
									that.datas.push(item);
								});
							}
							that.data_total = _total;
						}
						if (that.datas.length >= _total || _total <= 0 || !_data) {
							that.status = "noMore";
							return;
						}
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
