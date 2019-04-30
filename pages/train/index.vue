<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="'id_'+tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
			 :id="tab.id" :data-current="index" @click="tapTab(index,tab.id)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in tab.data" :key="index2">
						<train-list :data="newsitem" @click="goDetail(newsitem)"></train-list>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import trainList from '@/components/trainList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			trainList,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				pageSize: 10,
				ctgId: "",
				list: {
					// "id": 1,
					// "title": "质量快速入门",
					// "overview": "来这里，一周入门质检",
					// "image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					// "count": "6"
				},
				tabBars: []
			}
		},
		onLoad: function(e) {
			var that = this;
			that.tabIndex = e.c || 0;
			that.ctgId = e.ctg_id;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			if (!that.$store.state.user.userInfo) {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		},
		onReady() {
			var that = this;
			/*分类*/
			let data_ctg = {
				"inter": "categorys",
				"parm": "?cat_id=1",
				"header": {
					"token": that.$store.state.user.token || ""
				}
			}
			data_ctg["fun"] = function(res) {
				if (res.success) {
					let _ctg = res.data.list;
					_ctg = _ctg.filter(element => element.parent_id == 1);
					that.tabBars = _ctg;
					// let ary = [];
					// for (let i = 0, length = _ctg.length; i < length; i++) {
					// 	let aryItem = {
					// 		loadingType: 0,
					// 		pageIndex: 1,
					// 		data: []
					// 	};
					// 	ary.push(aryItem);
					// }
					// that.newsitems = ary;
					// console.log(ary)
					/*分类下列表*/
					that.getList()
				}
			}
			that.$store.dispatch("getData", data_ctg)
		},
		onPullDownRefresh() {
			this.getList("refresh");
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/train/unitlist?id=' + e.id
				})
			},
			loadMore(e) {
				this.newsitems[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].data.push(this['list']);
				}
				this.newsitems[e].loadingType = 1;
			},
			async changeTab(e) {
				let index = e.detail.current;
				console.log(index)
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index, ctg_id) { //点击tab-bar
				var that = this;
				if (that.tabIndex === index) {
					return false;
				} else {
					let tabBar = await that.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					that.scrollLeft = tabBarScrollLeft;
					that.isClickChange = true;
					that.tabIndex = index;
					that.ctgId = ctg_id;
					that.getList('tapTab');
				}
			},
			getList(getType) {
				var that = this;
				var ary = [],
					ti = that.tabIndex, //当前tab index
					ni = that.newsitems,
					cPI = ni[ti] && ni[ti]["pageIndex"] ? ni[ti]["pageIndex"] : 1; //当前页码
				var mPI = "";
				switch (getType) {
					case "getMore": //getType=="getMore" 获取更多
						mPI = cPI + 1;
						break;
					case "tapTab": //getType=="tapTab" tab切换
						mPI = ni[ti] == undefined || ni[ti].data.length <= 0 ? cPI : "tapTab"; //切换tab当前列表为空获取，不为空retrun
						break;
					case "refresh":
						mPI = 1;
						break;
					default:
						mPI = cPI;
						break;
				}
				console.log(mPI);
				console.log(ni[ti]);
				if (mPI === "tapTab") {
					return
				}
				let data = {
					"inter": "courses",
					"parm": `?cat_id=${that.ctgId}&currentPage=${mPI}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.$store.state.user.token
					}
				}
				data["fun"] = function(res) {
					if (res.success) {
						console.log("getlist-tabIndex:", ti)
						var aryItem = {
							"loadingType": 0,
							"pageIndex": 1,
							"data": []
						};
						if (res.data.list) {
							var res_list = res.data.list;
							if (getType == "refresh") {
								ni[ti]["data"] = res_list;
							} else {
								console.log(123123)
								if (mPI > 1) {
									ni[ti].push(res_list);
								} else {
									if (ni[ti] && ni[ti].data) {
										let d1 = ni[ti].data;
										Array.prototype.push.apply(d1, res_list);
									} else {
										aryItem["data"] = res_list;
										ni.push(aryItem);
									}
								}
								//that.newsitems.push(aryItem);
							}
							console.log("getlist-newsitems:", ni)
						} else {
							if (ni[ti]) {
								ni[ti]["loadingType"] = 2;
							} else {
								aryItem["loadingType"] = 2;
								ni.push(aryItem);
							}
							//ni[ti]["loadingType"] = 2;
						}
					}
					uni.stopPullDownRefresh();
				}
				that.$store.dispatch("getData", data)

				// for (let i = 0, length = this.tabBars.length; i < length; i++) {
				// 	let aryItem = {
				// 		loadingType: 0,
				// 		data: []
				// 	};
				// 	for (let j = 1; j <= 10; j++) {
				// 		aryItem.data.push(this['list']);
				// 	}
				// 	ary.push(aryItem);
				// }
				// return ary;
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
