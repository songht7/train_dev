<template>
	<view class="content">
		<view class="page-main">
			<view class="cus-map">
				<image :src="map" mode="aspectFit" class="cmap" @click="previewImage"></image>
			</view>
			<view class="cus-main">
				<view class="cus-row" v-if="$store.state.phoneNumber">
					<uni-icons type="phone" size="20" color="#919191"></uni-icons>
					<view class="cus-val" @click="$store.dispatch('makePhoneCall')">
						{{$store.state.phoneNumber}}
					</view>
				</view>
				<view class="cus-row" v-if="$store.state.email">
					<uni-icons type="email" size="20" color="#919191"></uni-icons>
					<view class="cus-val">
						<text class="mailto">{{$store.state.email}}</text>
					</view>
				</view>
				<view class="cus-row" v-if="$store.state.address">
					<uni-icons type="position" size="20" color="#919191"></uni-icons>
					<view class="cus-val">{{$store.state.address}}</view>
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
				map: "/static/map.jpg"
			}
		},
		onLoad(e) {},
		onShow() {
			var that = this;
			this.$store.dispatch('getBasePhone');
		},
		onReady() {
			var that = this;
		},
		components: {},
		computed: {},
		methods: {
			previewImage() {
				uni.previewImage({
					urls: [this.map],
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
