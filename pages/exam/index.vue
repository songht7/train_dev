<template>
	<view class="exam">
		<view class="page-main">
			<block v-if="datas.length<=0">
				<view class="exam-null">
					<view class="exam-null-icon">
						<uni-icons class="icon-wenhao" type="qm" size="50" color="#929292"></uni-icons>
						<uni-icons type="hezi401" size="120" color="#929292"></uni-icons>
					</view>
					<view class="exam-null-info">
						目前还没有单元考试哦
					</view>
				</view>
			</block>
			<block v-else="">
				<view class="exam-box">
					<block v-for="(obj,index) in datas" :key="index">
						<view class="exam-row">
							<view class="exam-block">
								<view class="exam-title">{{obj.name}}</view>
								<view class="exam-status">
									<block v-if="obj.passStatus=='0'||obj.passStatus=='2'">
										<view class="exam-btns">
											<view class="exam-btn" :class="obj.passStatus=='2'?'exam-btn-red':''" @click="goDetail(obj.id)">
												{{obj.passStatus=='0'?'参与考试':'点击重考'}}
											</view>
										</view>
									</block>
									<block v-if="obj.passStatus=='1'">
										<view class="exam-res">
											<view class="exam-mark txt-green">
												{{obj.maxPoint?obj.maxPoint:'-'}}
											</view>
											<view class="exam-ovs">
												通过考试
											</view>
										</view>
									</block>
								</view>
							</view>
						</view>
					</block>
					<uni-load-more :status="status"></uni-load-more>
				</view>
			</block>
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
			that.$store.dispatch("cheack_page", 1)
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
					url: "/pages/train/test?type=exam&id=" + id
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

	.exam-btn-red {
		border-color: #EE6858;
		color: #EE6858;
	}

	.exam-null {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
	}

	.exam-null-icon {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.icon-wenhao {
		position: relative;
		top: 82upx;
		z-index: 2;
	}

	.exam-null-info {
		color: #929292;
		font-size: 36upx;
	}
</style>
