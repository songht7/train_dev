<template>
	<view class="user-center">
		<view class="user-block">
			<view class="user-head">
				<view class="portrait">
					<uni-icon v-show="!$store.state.user.Portrait" type="touxiang" :size="62" color="#D8D8D8"></uni-icon>
					<image class="user-portrait" v-show="$store.state.user.Portrait" :src="$store.state.user.Portrait" mode="aspectFill"></image>
				</view>
				<view class="user-infos">
					<view class="user-name">{{UserId?$store.state.user.UserName:"用户名"}}</view>
					<view class="user-more my-collection"><text>我的收藏</text></view>
					<view class="user-more my-resume"><text>我的简历</text></view>
				</view>
				<view class="user-edit">
					<uni-icon type="shezhi" :size="30" color="#D8D8D8"></uni-icon>
				</view>
			</view>
		</view>
		<view class="user-block">
			<view class="user-class-info">
				<view class="user-my-class">
					<view class="my-class-block">
						<view class="class-count">15</view>
						<view class="class-overview">参加课程</view>
					</view>
					<view class="my-class-block">
						<view class="class-count class-state-green">8</view>
						<view class="class-overview">通过考试</view>
					</view>
					<view class="my-class-block">
						<view class="class-count class-state-red">2</view>
						<view class="class-overview">未通过考试</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid.vue'
	export default {
		data() {
			return {
				UserId: ""
			}
		},
		components: {
			uniGrid
		},
		onLoad() {},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page", 2)
			that.UserId = that.$store.state.user.UserId || '';
		},
		methods: {

		}
	}
</script>

<style>
	.user-center {
		width: 93%;
		padding: 30upx 3%;
	}

	.user-block {
		padding-bottom: 40upx;
	}

	.user-head {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: center;
		flex-direction: row;
		padding-bottom: 20upx;
	}

	.portrait {
		width: 125upx;
		height: 125upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-portrait {
		width: 100%;
		height: 100%
	}

	.user-infos {
		flex: 1 1 0%;
		padding: 0 20upx;
		display: flex;
		flex-wrap: wrap;
	}

	.user-name {
		font-size: 34upx;
		font-weight: 500;
		color: #222222;
		line-height: 2;
		width: 100%;
	}

	.user-more {
		border: 2upx solid #929292;
		border-radius: 30upx;
		color: #929292;
		padding: 0 20upx;
		margin-right: 20upx;
	}

	.user-edit {
		width: 60upx;
		display: flex;
		justify-content: flex-start;
		align-content: flex-start;
		align-items: flex-start;
		flex-direction: column-reverse;
		height: 100%;
	}

	.user-class-info {
		border: 2upx solid #E0E0E0;
		border-radius: 8upx;
		box-shadow: 0 0 10upx 3upx #E0E0E0;
	}

	.user-my-class {
		padding: 20upx 0;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: center;
	}

	.my-class-block {
		height: 150upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
		width: 33%;
		border-right: 2upx solid #E0E0E0;
	}

	.my-class-block:last-child {
		border-right: none;
	}

	.class-overview {
		font-size: 24upx;
	}

	.class-count {
		font-size: 52upx;
		color: #008CEE;
	}

	.class-state-green {
		color: #3BC1B0;
	}

	.class-state-red {
		color: #EE6858;
	}
</style>
