<template>
	<view class="content pages">
		<view class="page-main">
			<view class="block search-box">
				<view class="flex-left">
					<uni-icon type="shousuo" size="20" color="#919191"></uni-icon>
				</view>
				<input type="text" class="search-input" confirm-type="search" value="" placeholder="质检进阶课程" placeholder-style="color:#999" />
			</view>
			<view class="block slidebox">
				<view class="swiper-block" v-if="swiperList.length">
					<swiper class="swiper-box swiper-slide" :indicator="swiperList.length>1?'indicator-dots':''" autoplay="autoplay"
					 circular="circular" interval="interval" duration="duration" indicator-color="#E0E0E0" indicator-active-color="#008CEE">
						<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
							<view class="vli">
								<view class="vli2">
									<image class="slideImg" @click="linkTo(slide.link,slide.id)" lazy-load="true" :src="sourceUrl+slide.original_src"
									 mode="aspectFill"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="block category-box">
				<view class="ctgs">
					<block v-for="(ctg,c) in category" :key="c">
						<navigator class="ctg-link" :url="`${ctg.link}?c=${c}&ctg_id=${ctg.ctg_id}`">
							<view class="ctg-icon" :class="['ctg-'+ctg.icon]">
								<uni-icon :type="ctg.icon" isGradient="isGradient" :size="ctg.size?ctg.size:30" color="#999"></uni-icon>
							</view>
							<text class="ctg-txt">{{ctg.val}}</text>
						</navigator>
					</block>
				</view>
				<view class="ctgs ctgs-sub">
					<block v-for="(ctg,s) in categorySub" :key="s">
						<view class="ctg-link ctg-link-sub">
							<navigator class="link-btn link-btn-sub" :url="'/pages/train/index?c='+s+'&ctg_id='+ctg.id">
								<view class="ctg-icon-sub" :class="['ctg-'+ctg.id]">
									<uni-icon v-show="ctg.icon" :type="ctg.icon" isGradient="isGradient" :size="ctg.size?ctg.size:25" color="#999"></uni-icon>
									<image v-show="ctg.original_src" class="ctgImg" lazy-load="true" :src="sourceUrl+ctg.original_src" mode="aspectFill"></image>
								</view>
								<text class="ctg-txt">{{ctg.name}}</text>
							</navigator>
						</view>
					</block>
				</view>
			</view>
			<view class="block">
				<view @click="$store.dispatch('makePhoneCall')">
					<img class="ad-img" src="@/static/img-1.png" />
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				category: [{
						"id": 1,
						"val": "培训",
						"link": "/pages/train/index",
						"icon": "boshimao1",
						"size": 50,
						"ctg_id":""
					},
					{
						"id": 2,
						"icon": "icon_likegood_fill",
						"val": "技术支持",
						"link": "/pages/technical/index",
						"ctg_id":""
					},
					{
						"id": 3,
						"icon": "ai-book",
						"val": "文库",
						"link": "/pages/library/index",
						"ctg_id":""
					},
					{
						"id": 4,
						"icon": "gongwenbao1",
						"val": "工作机会",
						"link": "",
						"size": 40,
						"ctg_id":""
					},
				],
				categorySub: [
					// 					{
					// 					"id": 1,
					// 					"icon": "zhiliang",
					// 					"val": "质量单元",
					// 					"link": "/pages/train/index?c=0"
					// 				}, {
					// 					"id": 2,
					// 					"icon": "deng",
					// 					"val": "工艺单元",
					// 					"link": "/pages/train/index?c=1"
					// 				}, {
					// 					"id": 3,
					// 					"icon": "wuliuqiache2",
					// 					"val": "物流单元",
					// 					"link": "/pages/train/index?c=2"
					// 				}, {
					// 					"id": 4,
					// 					"icon": "caigouon",
					// 					"val": "采购单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 5,
					// 					"icon": "huaban",
					// 					"val": "人事单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 6,
					// 					"icon": "wenjianjia1",
					// 					"val": "行政单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 7,
					// 					"icon": "homenav6",
					// 					"val": "财务单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 8,
					// 					"icon": "icon02",
					// 					"val": "生产单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 9,
					// 					"icon": "laba-fill",
					// 					"val": "市场单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 10,
					// 					"icon": "shebeiguanli",
					// 					"val": "设备单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 11,
					// 					"icon": "chanpin",
					// 					"val": "产品单元",
					// 					"link": ""
					// 				}, {
					// 					"id": 12,
					// 					"icon": "lingdaitie3",
					// 					"val": "职场附加",
					// 					"link": ""
					// 				},
				]
			}
		},
		onLoad() {
			console.log("onLoad")
			var that = this;
		},
		onShow() {
			console.log("onShow")
			var that = this;
			that.$store.dispatch('cheack_user')
			that.$store.dispatch("cheack_page", 0)
		},
		onReady() {
			console.log("onReady")
			var that = this;
			/*轮播*/
			let data = {
				"inter": "slideShow"
			}
			data["fun"] = function(res) {
				if (res.success) {
					that.swiperList = res.data.list
				}
			}
			that.$store.dispatch("getData", data)

			/*分类*/
			let data_ctg = {
				"inter": "categorys",
				"parm": "?cat_id=1"
			}
			data_ctg["fun"] = function(res) {
				if (res.success) {
					let _ctg = res.data.list;
					that.categorySub = _ctg.filter(element => element.parent_id == 1);
					that.category[0]["ctg_id"] = that.categorySub[0]["id"];
				}
			}
			that.$store.dispatch("getData", data_ctg)
		},
		methods: {

		}
	}
</script>

<style>
	.search-box {
		background: #F0F0F0;
		border-radius: 5upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	.flex-left {
		padding-left: 10upx;
	}

	.search-input {
		padding: 4upx 20upx 4upx 10upx;
	}

	.ctgs {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 10upx;
	}

	.ctg-link {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 25%;
		padding-bottom: 10upx;
	}

	.link-btn {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
		flex: 1;
		width: 100%;
	}

	.ctg-txt {
		font-size: 24upx;
	}

	.ctg-icon {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		text-align: center;
		width: 95upx;
		height: 95upx;
		border-radius: 8upx;
	}

	.ctg-boshimao1 {
		background: linear-gradient(#ED8265, #E2574D);
	}

	.ctg-icon_likegood_fill {
		background: linear-gradient(#EDB055, #E57D29);
	}

	.ctg-ai-book {
		background: linear-gradient(#74CFF3, #5596E8);
	}

	.ctg-gongwenbao1 {
		background: linear-gradient(#68D0BF, #58AFBE);
	}

	.ctg-icon-sub {
		background: none;
	}

	.ad-img {
		width: 100%;
	}
</style>
