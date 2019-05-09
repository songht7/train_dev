<template>
	<view class="my-collect">
		<view class="page-main">
			<block v-for="(obj,index) in datas" :key="index">
				<view class="list-row" @click="goDetail(obj.id)">
					<view class="list-block">
						<view class="list-more">
							<view class="list-left">
								<view class="list-title collect-title">{{obj.name}}</view>
							</view>
							<view class="list-right">
								<image class="image-full" :src="obj.original_src?sourceUrl+obj.original_src:sourceUrl+'/data/image_doc/358aaf312fbb4cac05b05044b5a0e824.png'"
								 mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="status"></uni-load-more>
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
				datas: [],
				data_total: 0,
				pageIndex: 1,
				pageSize: 7,
				status: "more"
			}
		},
		onLoad() {

		},
		onShow() {
			var that = this;
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
			fixButton,
			uniLoadMore
		},
		computed: {},
		methods: {
			getDatas() {
				var that = this;
				that.status = "loading";
				/*收藏列表*/
				let data = {
					"inter": "favorites",
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
					url: "/pages/library/detail?id=" + id
				})
			},
		}
	}
</script>

<style>
	.collect-title {
		font-weight: 600;
	}
</style>
