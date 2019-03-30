<template>
	<view class="user-center">
		<view class="user-block">
			<view class="user-head">
				<view class="portrait">
					<uni-icon v-show="!$store.state.user.Portrait" type="touxiang" :size="62" color="#D8D8D8"></uni-icon>
					<image class="user-portrait" v-show="$store.state.user.Portrait" :src="$store.state.user.Portrait" mode="aspectFill"></image>
				</view>
				<view class="user-infos">
					<view class="user-name txt-sross">{{UserId?$store.state.user.UserName:"用户名"}}</view>
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
		<view class="user-block">
			<view class="user-class-list">
				<view class="my-class-head">
					<view class="class-tip">
						<view class="class-icon">
							<uni-icon type="shuji" :size="20" color="#FFFFFF"></uni-icon>
						</view>
						<view class="txt-sross">我参与的课程</view>
					</view>
					<view class="class-more">全部8个></view>
				</view>
				<view class="class-list">
					<view class="list-row class-list-row" v-for="(r,k) in 3" :key="k">
						<view class="list-block">
							<view class="list-more">
								<view class="list-left class-list-left">
									<view class="list-title">质检员基础知识培训课程{{k}}</view>
									<view class="class-progress">
										<view class="progress-box">
											<view class="percent">{{k==2?"开始学习":"已学60%"}}</view>
											<progress :percent="k==2?'0':'60'" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0"/>
										</view>
									</view>
								</view>
								<view class="list-right">
									<image class="image-full" :src="sourceUrl+'/data/image_doc/6aa5e95da760264b14d7e73618693e74.jpg'" mode="aspectFill"></image>
								</view>
							</view>
						</view>
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

	.my-class-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}

	.class-tip {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
	}

	.class-icon {
		background: linear-gradient(#48AFBE, #58D3BE);
		width: 50upx;
		height: 50upx;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10upx;
	}

	.class-more {
		font-size: 28upx;
		color: #929292;
	}

	.class-list-row {
		border-bottom: none;
	}

	.class-list-left {
		display: flex;
		flex-direction: column;
		align-content: space-between;
		align-items: flex-start;
		height: 134upx;
	}

	.class-progress {
		width: 95%;
	}

	.progress-box {
		display: flex;
		flex-direction: column;
		height: 50upx;
	}
	.percent{text-align: right;}
</style>
