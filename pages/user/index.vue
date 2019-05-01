<template>
	<view class="user-center">
		<view class="user-block">
			<view class="user-head">
				<view class="portrait">
					<uni-icon v-show="!$store.state.user.userInfo.portrait" type="touxiang" :size="62" color="#D8D8D8"></uni-icon>
					<image class="user-portrait" v-show="$store.state.user.userInfo.portrait" :src="$store.state.user.userInfo.portrait"
					 mode="aspectFill"></image>
				</view>
				<view class="user-infos">
					<view class="user-name txt-sross">{{UserId?$store.state.user.userInfo.name:"用户名"}}<text class="logout" @click="logout">[退出]</text></view>
					<navigator :url="`/pages/user/collect?id=${UserId}`" class="user-more my-collect"><text>我的收藏</text></navigator>
					<navigator :url="`/pages/user/resume?id=${UserId}`" class="user-more my-resume"><text>我的简历</text></navigator>
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
											<progress :percent="k==2?'0':'60'" stroke-width="4" activeColor="#008CEE" backgroundColor="#E0E0E0" />
										</view>
									</view>
								</view>
								<view class="list-right">
									<image class="image-full" :src="sourceUrl+'/data/image_doc/9c84faccb7f85cddfebd2ca072f879ba.jpg'" mode="aspectFill"></image>
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
				UserId: "",
				__token: ""
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
			that.UserId = that.$store.state.user.userInfo.id || '';
			that.__token = that.$store.state.user.token;
			if (!that.__token) {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
		},
		methods: {
			logout() {
				var that = this;
				let data = {
					"inter": "logout",
					"header": {
						"Content-Type": "application/json",
						"token": that.__token
					},
					"method": "DELETE"
				}
				data["fun"] = function(res) {
					if (res.success) {
						uni.removeStorage({
							key: 'user',
							success: function(res) {
								that.$store.commit("get_user", {})
								that.$store.dispatch("menu_default")
								uni.redirectTo({
									url: '/pages/index/index'
								});
							}
						});
					}
				}
				that.$store.dispatch("getData", data)
			}
		}
	}
</script>

<style>
	@import "./center.css";
</style>
