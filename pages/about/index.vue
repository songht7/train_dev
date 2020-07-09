<template>
	<view class="content">
		<view class="page-main">
			<view class="cus-map">
				<image :src="map" mode="aspectFit" class="cmap" @click="previewImage"></image>
			</view>
			<view class="cus-main">
				<view class="cus-row" v-if="phoneNumber">
					<uni-icons type="phone" size="20" color="#919191"></uni-icons>
					<view class="cus-val" @click="$store.dispatch('makePhoneCall')">
						{{phoneNumber}}
					</view>
				</view>
				<view class="cus-row" v-if="email">
					<uni-icons type="email" size="20" color="#919191"></uni-icons>
					<view class="cus-val">
						<text class="mailto">{{email}}</text>
					</view>
				</view>
				<view class="cus-row" v-if="address">
					<uni-icons type="position" size="20" color="#919191"></uni-icons>
					<view class="cus-val">{{address}}</view>
				</view>
			</view>
			<tab-bar></tab-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: "",
				email: "",
				address: "",
				map: ""
			}
		},
		onLoad(e) {},
		onShow() {
			var that = this;
			var data = {
				"inter": "getBasePhone"
			}
			data["fun"] = function(res) {
				if (res.success) {
					let v = res.data.info.split(',')
					that.phoneNumber = v[0];
					that.email = v[1];
					that.address = v[2];
					that.map = v[3] ? v[3] : "/static/map.jpg";
				} else {
					that.phoneNumber = that.$store.state.phoneNumber;
					that.email = that.$store.state.email;
					that.address = that.$store.state.address;
					that.map = "/static/map.jpg";
				}
			}
			that.$store.dispatch("getData", data)
		},
		onReady() {
			var that = this;
		},
		components: {},
		computed: {},
		methods: {
			previewImage() {
				var that = this;
				uni.previewImage({
					urls: [that.map],
					current: 0
				});
			}
		}
	}
</script>

<style>
	.cus-map {
		width: 100%;
	}

	.cmap {
		width: 100%;
	}

	.cus-main {
		padding: 30rpx 10%;
	}

	.mailto {
		color: inherit;
		text-decoration: none;
	}

	.cus-row {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		padding-bottom: 15rpx;
	}

	.cus-val {
		padding-left: 10rpx;
	}
</style>
