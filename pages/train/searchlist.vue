<template>
	<view class="search-train-main">
		<view class="search-result">
			<view class="block search-box search-box-inn">
				<view class="flex-left">
					关键词：
				</view>
				<input type="text" class="search-input" confirm-type="search" v-model="serchModel" :value="keywords" @confirm="searchConfirm"
				 placeholder="质检进阶课程" placeholder-style="color:#999" />
				<view class="search-btn" @click="searchConfirm">搜索</view>
			</view>
			<view class="search-show-all" @click="searchAll">查看全部</view>
		</view>
		<block v-for="(s,i) in searchList" :key="i">
			<train-list :data="s" @click="goDetail(s)"></train-list>
		</block>
		<view class="uni-tab-bar-loading">
			{{loadingText}}
		</view>
	</view>
</template>
<script>
	import trainList from '@/components/trainList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				ctgId: "",
				pageSize: 7,
				list: {},
				tabBars: [],
				keywords: "",
				serchModel: "",
				searchList: [],
				loadingText: "正在加载..."
			}
		},
		components: {
			trainList,
			uniLoadMore
		},
		onLoad: function(e) {
			var that = this;
			that.tabIndex = e.c || 0;
			that.ctgId = e.ctg_id;
			that.keywords = e.kw || "";
			that.serchModel = e.kw || "";
			that.$store.dispatch('cheack_user')
			that.$loading()
			if (!that.$store.state.user.userInfo) {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			} else {
				that.searchData();
			}
		},
		onShow(e) {
			var that = this;
		},
		onReady() {
			var that = this;
		},
		onPullDownRefresh() {
			var that = this;
			that.searchData();
		},
		methods: {
			searchConfirm(e) {
				var that = this;
				if (that.serchModel) {
					that.keywords = that.serchModel;
					that.searchData();
				}
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/train/unitlist?id=' + e.id
				})
			},
			searchAll() {
				var that = this;
				uni.redirectTo({
					url: "/pages/train/index"
				})
			},
			searchData() {
				var that = this;
				let data = {
					"inter": "courses",
					"parm": `?keywords=${that.keywords}&currentPage=1&pagesize=1000`,
					"header": {
						"token": that.$store.state.user.token
					}
				}
				data["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						if (res.data.list) {
							that.searchList = res.data.list;
							that.loadingText = "没有更多数据了";
						} else {
							that.searchList = [];
							that.loadingText = `没有搜索到有关‘${that.keywords}’的课程`;
						}
					} else {
						that.searchList = [];
						that.loadingText = "数据请求失败";
					}
				}
				that.$store.dispatch("getData", data)
			}
		}
	}
</script>

<style>
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}

	/* #endif */
</style>
