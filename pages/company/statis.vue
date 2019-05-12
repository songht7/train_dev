<template>
	<view class="user-center">
		<user-center-top :personal="personal"></user-center-top>
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
											<progress :percent="k==2?'0':'60'" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0" />
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
	import userCenterTop from '@/components/user-center-top.vue'
	import uniGrid from '@/components/uni-grid.vue'
	export default {
		data() {
			return {
				UserId: "",
				statisType: "",
				userCenterDatas: {},
				personal: "0",//员工总数
			}
		},
		components: {
			userCenterTop,
			uniGrid
		},
		onLoad(e) {
			var that = this;
			let p = e.t || 0
			that.statisType = p;
			that.$store.dispatch("cheack_page", p)
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user');
			that.UserId = that.$store.state.user.UserId || '';
			var interType = "personalProgresses";
			switch (that.statisType) {
				case 0:
					interType = "personalProgresses";
					break;
				default:
					break;
			}
			that.getDatas(interType)
		},
		methods: {
			getDatas(type) {
				var that = this;
				let data = {
					"inter": type,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				data["fun"] = function(res) {
					if (res.success) {
						that.personal = res.data.total;
						console.log(that.userCenterDatas)
					}
				}
				that.$store.dispatch("getData", data)
			}
		}
	}
</script>

<style>
	@import "../../common/center.css";
</style>
