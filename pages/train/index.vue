<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
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
				list: {
					"id":1,
					"title": "质量快速入门",
					"overview": "来这里，一周入门质检",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					"count": "6"
				},
				tabBars: [{
					name: '质量单元',
					id: 'id_1'
				}, {
					name: '工艺单元',
					id: 'id_2'
				}, {
					name: '物流单元',
					id: 'id_3'
				}, {
					name: '热点',
					id: 'id_4'
				}, {
					name: '财经',
					id: 'id_5'
				}, {
					name: '娱乐',
					id: 'id_6'
				}, {
					name: '军事',
					id: 'id_7'
				}, {
					name: '历史',
					id: 'id_8'
				}, {
					name: '本地',
					id: 'id_9'
				}]
			}
		},
		onLoad: function() {
			this.newsitems = this.randomfn()
			console.log(this.randomfn())
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
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType: 0,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['list']);
					}
					ary.push(aryItem);
				}
				return ary;
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
