<template>
	<view class="content pages">
		<view class="page-main">
			<view class="block search-box">
				<view class="flex-left">
					<uni-icons type="shousuo" size="20" color="#919191"></uni-icons>
				</view>
				<view class="search-block">
					<input type="text" class="search-input" confirm-type="search" v-model="serchModel" @confirm="searchConfirm"
					 placeholder="质检进阶课程" placeholder-style="color:#999;font-size:12px" @input="checkModel" />
					<!-- <view class="search-home-btn" @click="searchConfirm" v-show="searchBtnShow">搜索</view> -->
				</view>
			</view>
			<view class="block slidebox">
				<view class="swiper-block" :class="['spacing-'+spacing]" v-if="swiperleng">
					<swiper class="swiper-box swiper-slide" :indicator-dots="swiperleng>1?true:false" autoplay="autoplay" circular="circular"
					 interval="3000" duration="500" indicator-color="#E0E0E0" indicator-active-color="#999">
						<swiper-item v-for="(slide,index) in swiperList" :key="index">
							<view class="swiper-item">
								<image class="slideImg" @click="linkTo(slide.link,slide.id)" lazy-load="true" :src="slide.original_src" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="block category-box">
				<view class="ctgs">
					<block v-for="(ctg,c) in category" :key="c">
						<view class="ctg-link" v-if="ctg.show" :class="['spacing-'+spacing]" @click="navTo(ctg.link,{p1:c,p2:ctg.ctg_id})">
							<view class="ctg-icon">
								<!-- :class="['ctg-'+ctg.icon]" -->
								<image :src="'/static/icon-'+ctg.id+'.png'" class="ctg-icon-img" mode="aspectFit"></image>
							</view>
							<text class="ctg-txt">{{ctg.val}}</text>
						</view>
					</block>
				</view>
				<view class="less-ovs">
					<view class="less-title">
						系列课程
					</view>
					<view class="less-more" @click="navTo('/pages/train/index',{p1:0,p2:categoryFrist})">
						更多<uni-icons type="gengduo2" size="14" color="#999"></uni-icons>
					</view>
				</view>
				<view :class="['ctgs',$store.state.subCtgLine!=2?'ctgs-sub':'']">
					<block v-for="(ctg,s) in categorySub" :key="s">
						<!-- v-show="s%hideMultiple>0&&hideMultiple!=-1?false:true" -->
						<view :style="{'width':subCtgWidth}" :class="['ctg-link','ctg-link-sub','spacing-'+spacing,s%$store.state.hideMultiple>0?'cChildren':'cParent']">
							<view class="link-btn link-btn-sub" @click="navTo('/pages/train/index',{p1:s,p2:ctg.id})">
								<view class="ctg-icon-sub" :class="['ctg-'+ctg.id]">
									<!-- <uni-icons v-if="ctg.icon" :type="ctg.icon" isGradient="isGradient" :size="ctg.size?ctg.size:25" color="#999"></uni-icons> -->
									<!-- <image v-if="$store.state.subCtgLine>1" class="ctgImg" :style="{'height':ctgImgHeight,'backgroundColor':bgColor}"
									 lazy-load="true" :src="ctg.src" mode="aspectFill"></image> -->
									<image class="ad-img" :src="ctg.src" mode="widthFix"></image><!-- /static/banner.png -->
								</view>
								<text class="ctg-txt" v-if="$store.state.subCtgLine>1">{{ctg.name}}</text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="block">
				<view @click="$store.dispatch('contactUs')">
					<!-- <img class="ad-img" src="/static/img-1.png" /> -->
					<image class="ad-img" src="/static/img-1.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="wx-login">
				<button type="primary" lang="zh_CN" open-type="getPhoneNumber" @getphonenumber="getphonenumber">微信授权登录</button>
			</view> -->
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
				user: {},
				serchModel: "",
				keywords: "",
				searchBtnShow: false,
				swiperList: [],
				swiperleng: 0,
				poptype: "",
				categoryFrist: "",
				category: [{
						"id": 1,
						"val": "专业培训",
						"link": "/pages/train/index",
						"icon": "boshimao1",
						"size": 50,
						"ctg_id": "",
						"show": true
					},
					{
						"id": 2,
						"icon": "icon_likegood_fill",
						"val": "技术支持",
						"link": "/pages/technical/index",
						"ctg_id": "15",
						"show": true
					},
					{
						"id": 3,
						"icon": "ai-book",
						"val": "知识文库",
						"link": "/pages/library/index",
						"ctg_id": "16",
						"show": true
					},
					{
						"id": 4,
						"icon": "gongwenbao1",
						"val": "工作机会",
						"link": "/pages/work/index",
						"size": 40,
						"ctg_id": "17",
						"show": false
					},
				],
				categorySub: [],
				spacing: "default" //default 、medium、big
			}
		},
		onLoad() {
			console.log("onLoad")
			var that = this;
		},
		onShow() {
			console.log("onShow")
			var that = this;
			uni.setNavigationBarTitle({
				title: that.$store.state.appName || "培训"
			})
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page", 0);
			uni.getSystemInfo({
				success: (res) => {
					//console.log(res)
					// if (res.screenHeight >= 736 && res.screenHeight < 812) {
					// 	that.spacing = "medium"
					// } else if (res.screenHeight >= 812) {
					// 	that.spacing = "big"
					// } else {
					// 	that.spacing = "default"
					// }
					that.spacing = "default"
				}
			})
			var _user = that.$store.state.user;
			if (_user.token && _user.userType != "3") {
				uni.hideLoading()
				uni.redirectTo({
					url: "/pages/company/statis?t=0"
				})
				return
			}
			uni.showLoading({
				title: "加载中..."
			})
			that.getDatas('slideShow');
			that.getDatas('categorys');
			that.getDatas('checkSystem');
		},
		onReady() {
			console.log("onReady")
			var that = this;
		},
		onPullDownRefresh() {
			var that = this;
			that.getDatas('slideShow');
			that.getDatas('categorys');
		},
		components: {
			uniPopup
		},
		computed: {
			subCtgWidth() {
				let w = 100 / this.$store.state.subCtgLine;
				w = w == 50 ? 49 : w;
				return w + '%'
			},
			ctgImgHeight() {
				let h = this.$store.state.subCtgLine >= 4 ? '50rpx' : '120rpx';
				return h
			},
			bgColor() {
				let bg = this.$store.state.subCtgLine <= 2 ? '#f9f6f6' : 'none';
				return bg
			}
		},
		methods: {
			getphonenumber(e) {
				console.log("getwxinfo:", e)
				console.log(e.detail.errMsg);
				console.log(e.detail.iv);
				console.log(e.detail.encryptedData);
			},
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
						switch (inter) {
							case "categorys":
								let _ctg = res.data.list;
								let user = that.$store.state.user ? that.$store.state.user : {};
								let fc = _ctg.filter((element, index) => element.parent_id == 1 && index <= that.$store.state.ignoredNum - 1); //第一个
								let oc = _ctg;
								if (that.$store.state.ignoredNum > 0) {
									oc = _ctg.filter((element, index) => element.parent_id == 1 && index > that.$store.state.ignoredNum - 1); //除第一个
								}
								if (that.$store.state.hideMultiple != -1) { //是否隐藏倍数
									that.categorySub = oc.filter((e, index) => e.parent_id == 1 && index % that.$store.state.hideMultiple <= 0);
								} else {
									that.categorySub = oc.filter((e, index) => e.parent_id == 1);
								}
								if (user.token && (user.userInfo && user.userInfo.eStatus == '1') && that.$store.state.ignoredNum > 0) {
									that.categorySub = [fc[0], ...that.categorySub];
								}
								//console.log("that.categorythat.category:", that.category)
								that.category[0]["ctg_id"] = that.categorySub[0]["id"];
								that.categoryFrist = that.categorySub[0]["id"];
								break;
							case "slideShow":
								that.swiperList = res.data.list
								that.swiperleng = res.data.total
								break;
							case "checkSystem":
								let _show = res.data.info == '1' ? true : false;
								that.category.map((c, k) => {
									if (c.id == "4") c.show = _show;
								})
								break;
							default:
								break;
						}
					}
					if (inter == "categorys") {
						uni.hideLoading()
					}
				}
				that.$store.dispatch("getData", data)
			},
			checkModel(e) {
				this.searchBtnShow = e.detail.value != "" ? true : false;
			},
			searchConfirm(e) {
				//let __keywords = e.detail.value;
				let keywords = this.serchModel;
				if (keywords) {
					let url = `/pages/train/searchlist?kw=${keywords}&c=0`
					this.navTo(url)
				}
			},
			linkTo(link, slideId) {
				var that = this;
				if (link) {
					uni.navigateTo({
						url: link //'/pages/train/unitlist?id=257'
					})
				}
			},
			navTo(url, parm = {
				p1: -1,
				p2: -1
			}) {
				var that = this;
				let user = that.$store.state.user ? that.$store.state.user : {};
				if (user.token && user.userInfo.eStatus == '1' && parm.p1 >= 0) {
					// 企业用户登录点击显示当前列
					url = `${url}?c=${parm.p1}&ctg_id=${parm.p2}`
				} else if (parm.p1 >= 0) {
					url = `${url}?c=${parm.p1}&ctg_id=${parm.p2}`
					//未登录 非企业用户点击1，5，9，13显示对应下一列
					// url = `${url}?c=${parm.p1+1}&ctg_id=${that.categorySub[parm.p1+1]['id']}`
				}
				// console.log(parm.p1, that.categorySub[parm.p1 + 1]['id'], url)
				uni.navigateTo({
					url: url
				})
				// if (that.$store.state.user.userInfo) {
				// 	uni.navigateTo({
				// 		url: url
				// 	})
				// } else {
				// 	that.poptype = "getNotUser";
				// }
			},
			togglePopup(type) {
				this.poptype = type;
			}
		}
	}
</script>

<style scoped>
	.swiper-box {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.search-box {
		background: #F0F0F0;
		border-radius: 5upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	.flex-left {
		padding-left: 10upx;
		display: flex;
		height: inherit;
		align-items: center;
		align-content: center;
	}

	.search-block {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex: 1;
	}

	.search-input {
		padding: 4upx 20upx 4upx 10upx;
		line-height: 2;
		flex: 1;
	}

	.search-home-btn {
		background: #008CEE;
		color: #FFFFFF;
		padding: 0 30upx;
		letter-spacing: 2upx;
		border: 1px solid #007AFF;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.slidebox {
		margin-bottom: 30rpx;
	}

	.ctgs {

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-bottom: 10upx;
	}

	.ctgs-sub {
		justify-content: flex-start;
	}

	.ctg-link {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 25%;
		margin-bottom: 12upx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.ctg-link-sub {
		width: 50%;
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

	.category-box {
		margin-bottom: 40upx;
	}

	.ctg-txt {
		font-size: 24upx;
		color: #929292;
		letter-spacing: 1.5px;
	}

	.ctg-icon {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		text-align: center;
		width: 120upx;
		height: 120upx;
	}

	.ctg-icon-img {
		width: 100%;
		height: 100%;
	}

	.ctg-icon-sub {
		width: 100%;
		background: none;
		display: flex;
		justify-content: center;
	}

	/* .cParent {
		width: 100% !important;
		padding-bottom: 10rpx !important;
	}

	.cParent .ctgImg {
		height: 100rpx !important;
	}

	.cParent .link-btn {
		justify-content: flex-start;
		align-items: flex-start;
	}

	.cParent .ctg-txt {
		font-size: 32rpx;
	} */

	.ctgImg {
		width: 100%;
		height: 100rpx;
	}

	.ad-img {
		width: 100%;
	}

	.less-ovs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		padding-bottom: 20rpx;
		color: #929292;
		letter-spacing: 1px;
	}

	.less-title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		line-height: 1;
		height: 36rpx;
	}

	.less-title:before {
		content: "";
		width: 6rpx;
		height: 90%;
		background: #CCCCCC;
		margin-right: 10rpx;
	}

	.less-more {
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
</style>
