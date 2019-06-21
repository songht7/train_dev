<template>
	<view class="library">
		<view class="page-main">
			<view class="search-main">
				<view class="serch-fex-btn" @click="searchMod" v-show="!searchShow">
					<uni-icon type="shousuo" size="32" color="#919191"></uni-icon>
				</view>
				<view class="search-result" v-show="searchShow">
					<view class="block search-box search-box-inn">
						<view class="flex-left">
							关键词：
						</view>
						<input type="text" class="search-input" confirm-type="search" v-model="serchModel" :value="keywords" @confirm="searchConfirm"
						 placeholder="想要查找的文库" placeholder-style="color:#999" />
						<view class="search-btn" @click="searchConfirm">搜索</view>
					</view>
					<view class="search-show-all" @click="searchAll">查看全部</view>
				</view>
			</view>
			<block v-for="(obj,index) in datas" :key="index">
				<view class="list-row" @click="goDetail(obj.id)">
					<view class="list-block">
						<view class="list-title">{{obj.name}}</view>
						<view class="list-more">
							<view class="list-left">
								<view class="list-ov">{{obj.overview}}</view>
								<!-- <view class="list-browse">1896 浏览</view> -->
							</view>
							<view class="list-right">
								<image class="image-full" :src="obj.original_src?obj.original_src:sourceUrl+'/data/image_doc/358aaf312fbb4cac05b05044b5a0e824.png'"
								 mode="aspectFill"></image>
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
				pageSize: 5,
				status: "more",
				keywords: "",
				serchModel: "",
				searchShow: false
			}
		},
		onLoad: function(e) {
			var that = this;
			that.ctgId = e.ctg_id || 16;
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
			uniLoadMore
		},
		computed: {},
		methods: {
			searchMod() {
				this.searchShow = !this.searchShow;
			},
			searchConfirm(e) {
				var that = this;
				if (that.serchModel) {
					that.keywords = that.serchModel;
					that.currentPage = 1;
					that.pagesize = 1000;
					that.getDatas();
				}
			},
			searchAll() {
				var that = this;
				that.keywords = "";
				that.currentPage = 1;
				that.pagesize = 5;
				that.getDatas();
			},
			getDatas() {
				var that = this;
				that.status = "loading";
				/*文库*/
				let data = {
					"inter": "supports",
					"parm": `?cat_id=${that.ctgId}&keywords=${that.keywords}&currentPage=${that.pageIndex}&pagesize=${that.pageSize}`,
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
					url: "/pages/library/detail?id=" + id
				})
			},
		}
	}
</script>

<style>
</style>
