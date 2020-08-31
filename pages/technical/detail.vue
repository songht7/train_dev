<template>
	<view class="article-detail">
		<block v-if="__token">
			<view class="page-main">
				<block v-if="datas.id">
					<view class="banner">
						<!-- <img :src="datas.original_src||'/static/default.png'" class="banner-img" alt=""> -->
						<image class="banner-img" :src="datas.original_src||'/static/default.png'" mode="widthFix"></image>
					</view>
					<view class="banner-title">{{datas.name}}</view>
					<!-- <view class="article-meta">
				<text class="article-author">21人已办理</text>
			</view> -->
					<view class="article-content">
						<rich-text :nodes="datas.detail"></rich-text>
					</view>
				</block>

				<fix-button>
					<view class="fbtns fbtns-clr-full btn-totest" @click="$store.dispatch('makePhoneCall')">
						<uni-icons type="dianhua1" size="25" color="#fff"></uni-icons>咨询我们
					</view>
				</fix-button>
			</view>
		</block>
		<block v-else>
			<login-tip></login-tip>
			<tab-bar></tab-bar>
		</block>
	</view>
</template>
<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {
				__token: "",
				article_id: "",
				datas: []
			}
		},
		onLoad(e) {
			var that = this;
			that.article_id = e.id;
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title: "加载中..."
			});
			that.$store.dispatch('cheack_user');
			that.__token = that.$store.state.user.token ? that.$store.state.user.token : "";
			that.getDatas()
		},
		components: {
			fixButton
		},
		methods: {
			getDatas() {
				var that = this;
				/*文库*/
				let data = {
					"inter": "support",
					"parm": `?article_id=${that.article_id}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				data["fun"] = function(res) {
					uni.hideLoading()
					if (res.success) {
						let _data = res.data;
						uni.setNavigationBarTitle({
							title: res.data.name
						});
						if (_data["detail"]) {
							_data["detail"] = _data["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						}
						that.datas = _data;
					}
				}
				that.$store.dispatch("getData", data)
			},
		}
	}
</script>

<style>
	.banner {
		/* height: 360upx; */
		overflow: hidden;
		position: relative;
		/* background-color: #ccc; */
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		padding: 30upx 3% 10upx;
		font-size: 44upx;
		font-weight: 500;
		color: #222222;
	}

	.article-meta {
		padding: 0 3% 20upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 3%;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>
