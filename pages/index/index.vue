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
				<view class="swiper-block" :class="`spacing-${spacing}`" v-if="swiperleng">
					<swiper class="swiper-box swiper-slide" :indicator-dots="swiperleng>1?'true':'false'" autoplay="autoplay" circular="circular"
					 interval="3000" duration="500" indicator-color="#E0E0E0" indicator-active-color="#008CEE">
						<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
							<view class="vli">
								<view class="vli2">
									<image class="slideImg" @click="linkTo(slide.link,slide.id)" lazy-load="true" :src="slide.original_src" mode="aspectFill"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="block category-box">
				<view class="ctgs">
					<block v-for="(ctg,c) in category" :key="c">
						<view class="ctg-link" :class="`spacing-${spacing}`" @click="navTo(`${ctg.link}?c=${c}&ctg_id=${ctg.ctg_id}`)">
							<view class="ctg-icon" :class="['ctg-'+ctg.icon]">
								<uni-icon :type="ctg.icon" isGradient="isGradient" :size="ctg.size?ctg.size:30" color="#999"></uni-icon>
							</view>
							<text class="ctg-txt">{{ctg.val}}</text>
						</view>
					</block>
				</view>
				<view class="ctgs ctgs-sub">
					<block v-for="(ctg,s) in categorySub" :key="s">
						<view class="ctg-link ctg-link-sub" :class="`spacing-${spacing}`">
							<view class="link-btn link-btn-sub" @click="navTo(`/pages/train/index?c=${s}&ctg_id=${ctg.id}`)">
								<view class="ctg-icon-sub" :class="['ctg-'+ctg.id]">
									<uni-icon v-if="ctg.icon" :type="ctg.icon" isGradient="isGradient" :size="ctg.size?ctg.size:25" color="#999"></uni-icon>
									<image v-if="ctg.src" class="ctgImg" lazy-load="true" :src="ctg.src" mode="aspectFill"></image>
								</view>
								<text class="ctg-txt">{{ctg.name}}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="block">
				<view @click="$store.dispatch('makePhoneCall')">
					<img class="ad-img" src="/static/img-1.png" />
				</view>
			</view>
		</view>
		<uni-popup :show="poptype === 'getNotUser'" position="middle" mode="fixed" width="70" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<view class="train-show-modal-info">
					<view class="train-show-modal-row">您还未登录</view>
				</view>
				<view class="btns btns-full btns-big" @click="togglePopup('')">前往登录</view>
			</view>
		</uni-popup>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		data() {
			return {
				swiperList: [],
				swiperleng: 0,
				poptype: "",
				category: [{
						"id": 1,
						"val": "培训",
						"link": "/pages/train/index",
						"icon": "boshimao1",
						"size": 50,
						"ctg_id": ""
					},
					{
						"id": 2,
						"icon": "icon_likegood_fill",
						"val": "技术支持",
						"link": "/pages/technical/index",
						"ctg_id": "15"
					},
					{
						"id": 3,
						"icon": "ai-book",
						"val": "文库",
						"link": "/pages/library/index",
						"ctg_id": "16"
					},
					{
						"id": 4,
						"icon": "gongwenbao1",
						"val": "工作机会",
						"link": "/pages/work/index",
						"size": 40,
						"ctg_id": "17"
					},
				],
				categorySub: [],
				spacing: "" //default 、medium、big
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
			if (that.$store.state.user.token && that.$store.state.user.userType != "3") {
				uni.redirectTo({
					url: "/pages/company/statis"
				})
			}
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					if (res.screenHeight >= 736 && res.screenHeight < 812) {
						that.spacing = "medium"
					} else if (res.screenHeight >= 812) {
						that.spacing = "big"
					} else {
						that.spacing = "default"
					}
				}
			})
		},
		onReady() {
			console.log("onReady")
			var that = this;
			that.getDatas('slideShow');
			that.getDatas('categorys');
		},
		onPullDownRefresh() {
			var that = this;
			that.getDatas('slideShow');
			that.getDatas('categorys');
		},
		components: {
			uniPopup
		},
		computed: {},
		methods: {
			getDatas(inter) {
				var that = this;
				let data = {
					"inter": inter
				}
				if (inter == "categorys") {
					data["parm"] = "?cat_id=1";
				}
				data["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						if (inter == "categorys") {
							let _ctg = res.data.list;
							that.categorySub = _ctg.filter(element => element.parent_id == 1);
							that.category[0]["ctg_id"] = that.categorySub[0]["id"];
						} else if (inter == "slideShow") {
							that.swiperList = res.data.list
							that.swiperleng = res.data.total
						}
					}
				}
				that.$store.dispatch("getData", data)
			},
			navTo(url) {
				var that = this;
				if (that.$store.state.user.userInfo) {
					uni.navigateTo({
						url: url
					})
				} else {
					that.poptype = "getNotUser";
				}
			},
			togglePopup(type) {
				this.poptype = type;
			}
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
		padding-bottom: 30upx;
	}

	.spacing-medium {
		padding-bottom: 40upx;
	}

	.spacing-big {
		padding-bottom: 70upx;
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
		display: flex;
		justify-content: center;
	}

	.ctgImg {
		width: 28px;
		height: 28px;
	}

	.ad-img {
		width: 100%;
	}
</style>
