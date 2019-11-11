<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.tab_id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
			 :id="tab.tab_id" :data-current="index" @click="tapTab(index,tab.id)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in tab.data" :key="index2">
						<train-list :datas="newsitem" @click="goDetail(newsitem)"></train-list>
					</block>
					<view class="uni-tab-bar-loading">
						{{tab.loadingText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<loading></loading>
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
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				ctgId: "",
				__token: "",
				pageSize: 7,
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
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token ? that.$store.state.user.token : "";
			that.$loading()
			// uni.showLoading({
			// 	title: "加载中..."
			// })
			/*分类*/
			let data_ctg = {
				"inter": "categorys",
				"parm": "?cat_id=1",
				"header": {
					"token": that.__token
				}
			}
			data_ctg["fun"] = function(res) {
				that.$loading(0)
				if (res.success) {
					let _ctg = res.data.list;
					_ctg = _ctg.filter(element => element.parent_id == 1);
					for (let i = 0, length = _ctg.length; i < length; i++) {
						/*分类下列表*/
						let aryItem = {
							loadingText: '上拉显示更多',
							pageIndex: 1,
							ctgId: _ctg[i].id,
							total: 0,
							data: []
						};
						that.newsitems.push(aryItem)
						_ctg[i]["tab_id"] = "tab_" + _ctg[i].id;
						if (that.ctgId && that.ctgId == _ctg[i].id) {
							console.log("i:", i)
							that.changeTab(i);
						}
						that.getList("init", _ctg[i].id, i)
					}
					that.tabBars = _ctg;
				}
			}
			that.$store.dispatch("getData", data_ctg)
		},
		onShow(e) {
			var that = this;
		},
		onReady() {
			var that = this;
			console.log(that.newsitems)
		},
		onPullDownRefresh() {
			this.getList("refresh");
		},
		onBackPress(e) {
			uni.redirectTo({
				url: '/pages/index/index'
			});
			return false
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/train/unitlist?id=' + e.id
				})
			},
			loadMore(e) {
				var that = this;
				var data_obj = that.newsitems[e],
					data_leng = data_obj.data.length,
					data_total = data_obj.total;
				if (parseInt(data_leng) >= parseInt(data_total)) {
					data_obj.loadingText = "没有更多数据了";
					return;
				}
				data_obj.loadingText = "正在加载...";
				that.getList('getMore');
			},
			async changeTab(e) {
				var that = this;
				//console.log("changeTab:", e)
				let index = e.detail ? e.detail.current : e;
				//console.log("index:", index);
				var current_ctg = that.tabBars.filter((c, k) => k == index)[0];
				that.ctgId = current_ctg.id;

				if (that) {
					that.tabIndex = index;
					that.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].tab_id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].tab_id),
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
			getList(getType, ctgId, index) {
				var that = this;
				var ary = [],
					ni = that.newsitems,
					ti = that.tabIndex, //当前tab index
					cPI = ni[ti] && ni[ti].pageIndex ? ni[ti].pageIndex : 1; //当前页码
				var mPI = "";
				switch (getType) {
					case "getMore": //getType=="getMore" 获取更多
						mPI = cPI + 1;
						break;
					case "tapTab": //getType=="tapTab" tab切换
						mPI = ni[ti] && ni[ti].data.length <= 0 ? cPI : "tapTab"; //切换tab当前列表为空获取，不为空retrun
						break;
					case "refresh":
						mPI = 1;
						break;
					default:
						mPI = cPI;
						break;
				}
				console.log(mPI);
				if (mPI === "tapTab") {
					return
				}
				if (ni[ti] && ni[ti].loadingText) {
					ni[ti].loadingText = "正在加载...";
				}
				let __ctg_id = ctgId || that.ctgId;
				let data = {
					"inter": "courses",
					"parm": `?cat_id=${__ctg_id}&currentPage=${mPI}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					ni[ti].loadingText = "上拉显示更多";
					if (res.success) {
						//console.log("getlist-tabIndex:", ti)
						ni[ti]["pageIndex"] = mPI;
						if (res.data.list) {
							var res_list = res.data.list;
							if (getType == "refresh") {
								ni[ti]["data"] = res_list;
								if (res.data.total <= ni[ti]["total"]) {
									ni[ti].loadingText = "没有更多数据了";
								}
							} else {
								if (getType == "init") {
									ni[index]["data"] = res_list;
									ni[index]["total"] = res.data.total;
									if (res.data.total <= res_list.length) {
										ni[index]["loadingText"] = "没有更多数据了";
									}
								} else {
									res_list.forEach(item => {
										ni[ti]["data"].push(item);
									});
									//ni[ti]["data"].push(res_list);
									if (res.data.total <= ni[ti]["data"].length) {
										ni[ti].loadingText = "没有更多数据了";
									}
									// let d1 = ni[ti].data;
									// Array.prototype.push.apply(d1, res_list);
								}
							}
							//console.log("getlist-newsitems:", ni)
						} else {
							if (getType == "init") {
								ni[index]["total"] = res.data.total;
								ni[index]["loadingText"] = "没有更多数据了";
							} else {
								ni[ti].loadingText = "没有更多数据了";
							}
						}
					}
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

	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}
</style>
