<template>
	<view class="exam">
		<view class="page-main">
			<block v-for="(obj,index) in datas" :key="index">
				<view class="exam-row">
					<view class="exam-block">
						<view class="exam-title">{{obj.name}}</view>
						<view class="exam-status">
							<!-- <view class="exam-res">
								<view class="exam-mark txt-green">
									90
								</view>
								<view class="exam-ovs">
									通过考试
								</view>
							</view> -->
							<view class="exam-btns">
								<view class="exam-btn" @click="goDetail(obj.id)">
									参与考试
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="status"></uni-load-more>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue'
	export default {
		data() {
			return {
				ctgId: "",
				datas: [],
				data_total: 0,
				pageIndex: 1,
				pageSize: 10,
				status: "more"
			}
		},
		onLoad: function(e) {
			var that = this;
			that.ctgId = e.ctg_id || 16;
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title: "加载中..."
			})
			that.$store.dispatch('cheack_user')
			that.getDatas()
		},
		onReady: function(res) {},
		onPullDownRefresh() {
			var that = this;
			that.pageIndex = 1;
			that.getDatas()
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
		components: {
			uniLoadMore
		},
		computed: {},
		methods: {
			getDatas() {
				var that = this;
				/*文库*/
				let data = {
					"inter": "examinations",
					"parm": `?currentPage=${that.pageIndex}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				data["fun"] = function(res) {
					that.status = "more";
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.success) {
						var _data = res.data.list;
						if (_data) {
							if (that.pageIndex == 1) {
								that.datas = _data;
							} else {
								console.log(_data)
								//that.datas.push(_data);
								_data.forEach(item => {
									that.datas.push(item);
								});
							}
							that.data_total = res.data.total;
						} else {
							that.datas = [];
						}
						if (that.datas.length >= res.data.total || res.data.total <= 0) {
							that.status = "noMore";
							return;
						}
					}
				}
				that.$store.dispatch("getData", data)
			},
			goDetail: function(id) {
				uni.navigateTo({
					url: "/pages/train/test?type=exam&examination_id=" + id
				})
			},
		}
	}
</script>

<style>
	.exam {
		width: 94%;
		min-height: 100%;
		background: #F4F4F4;
		padding: 20upx 3%;
	}

	.exam-row {
		background: #FFFFFF;
		margin-bottom: 20upx;
		border-radius: 10upx;
	}

	.exam-block {
		padding: 3%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-content: center;
		align-items: center;
	}

	.exam-title {
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		font-size: 32upx;
		color: #313131;
	}

	.exam-status {
		width: 40%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
	}

	.exam-res {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		font-size: 24upx;
		color: #929292;
	}

	.exam-mark {
		font-size: 52upx;
		line-height: 1.4;
	}

	.exam-btn {
		border: 1px solid #008CEE;
		font-size: #008CEE;
		color: #008CEE;
		padding: 5upx 15upx;
		border-radius: 10upx;
	}
</style>
