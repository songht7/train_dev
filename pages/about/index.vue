<template>
	<view class="content">
		<view class="page-main">
			<view class="cus-map">
				<image src="/static/map.png" mode="aspectFill" class="cmap"></image>
			</view>
			<view class="cus-main">
				<view class="cus-row">
					<uni-icons type="dianhua" size="20" color="#919191"></uni-icons>
					<view class="cus-val" @click="$store.dispatch('makePhoneCall')">
						{{phoneNumber}}
					</view>
				</view>
				<view class="cus-row">
					<uni-icons type="youjian" size="20" color="#919191"></uni-icons>
					<view class="cus-val">
						<text class="mailto">{{email}}</text>
					</view>
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
				email: ""
			}
		},
		onLoad(e) {},
		onReady() {
			var that = this;
			that.phoneNumber = this.$store.state.phoneNumber;
			that.email = this.$store.state.email;
		},
		onShow() {
			var that = this;
		},
		components: {},
		computed: {},
		methods: {

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
