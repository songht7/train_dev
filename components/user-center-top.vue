<template>
	<view class="user-center-top">
		<view class="user-block">
			<view class="user-head">
				<view class="portrait">
					<uni-icon v-if="!userInfo.photo||userInfo.photo==''" type="touxiang" :size="62" color="#D8D8D8"></uni-icon>
					<image class="user-portrait" v-if="userInfo.photo&&userInfo.photo!=''" :src="userInfo.photo" mode="aspectFill"></image>
				</view>
				<view class="user-infos">
					<view class="user-name txt-sross">{{userInfo.name||"用户名"}}<text class="logout" @click="$store.dispatch('logout')">[退出]</text></view>
					<view class="user-type">
						<block v-if="userType!='3'">
							<view class="user-more job"><text>{{userType=='1'?'管理员':'企业主'}}</text></view>
						</block>
						<block v-if="userType=='3'">
							<navigator url="/pages/user/collect" class="user-more my-collect"><text>我的收藏</text></navigator>
							<navigator url="/pages/user/resume" class="user-more my-resume"><text>我的简历</text></navigator>
						</block>
					</view>
				</view>
				<block v-if="userType=='3'">
					<view class="user-edit" @click="navTo('edit')">
						<uni-icon type="shezhi" :size="30" color="#D8D8D8"></uni-icon>
					</view>
				</block>
			</view>
		</view>
		<view class="user-block">
			<view class="user-class-info">
				<view class="user-my-class">
					<view class="my-class-block" @click="navToCourse('joinCourse')">
						<view class="class-overview" v-if="userType!='3'">员工总数</view>
						<view class="class-count">
							<view class="count-txt">{{userType!='3'?enterpriseUserCount:joinCourse}}</view>
							<uni-icon v-if="userType!='3'" type="wo" :size="18" color="#008CEE"></uni-icon>
						</view>
						<view class="class-overview" v-if="userType=='3'">参加课程</view>
					</view>
					<view class="my-class-block" @click="navToCourse('passCourse')">
						<view class="class-overview" v-if="userType!='3'">参与学习</view>
						<view class="class-count">
							<view class="count-txt class-state-green">{{userType!='3'?joinCourseUserCount:passCourse}}</view>
							<uni-icon v-if="userType!='3'" type="wo" :size="18" color="#3BC1B0"></uni-icon>
						</view>
						<view class="class-overview" v-if="userType=='3'">通过考试</view>
					</view>
					<view class="my-class-block" @click="navToCourse('failCourse')">
						<view class="class-overview" v-if="userType!='3'">总课程数</view>
						<view class="class-count">
							<view class="count-txt class-state-red">{{userType!='3'?courseCount:failCourse}}</view>
							<uni-icon v-if="userType!='3'" type="shuji" :size="18" color="#EE6858"></uni-icon>
						</view>
						<view class="class-overview" v-if="userType=='3'">未通过考试</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**userType 1：management管理员		2：business商业	3：customer顾客**/
	export default {
		name: 'user-center-top',
		props: {
			userInfo: {
				type: Object,
				default: function(e) {
					return this.$store.state.user ? this.$store.state.user.userInfo : {}
				}
			},
			enterpriseUserCount: { //员工总数
				type: String,
				default: "0"
			},
			joinCourseUserCount: { //参与学习
				type: String,
				default: "0"
			},
			courseCount: { //总课程数
				type: String,
				default: "0"
			},
			joinCourse: { //参加课程
				type: String,
				default: "0"
			},
			passCourse: { //通过考试
				type: String,
				default: "0"
			},
			failCourse: { //未通过考试
				type: String,
				default: "0"
			}
		},
		data() {
			return {
				userType: this.$store.state.user.userType || ""
			};
		},
		computed: {},
		methods: {
			navTo(page) {
				uni.navigateTo({
					url: `/pages/user/${page}`
				})
			},
			navToCourse(type) {
				var that = this;
					return
				if (that.userType != '3') {
					return
				}
				var url = "/pages/user/my-class"
				switch (type) {
					case 'passCourse':
						url = url + "?cs=1";
						break;
					case 'failCourse':
						url = url + "?cs=0";
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>
<style>
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
		flex-direction: column;
	}

	.user-type {
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.user-name {
		line-height: 2;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.logout {
		font-weight: 200;
		padding: 0 10upx;
		font-size: 26upx;
	}

	.user-more {
		border: 2upx solid #929292;
		border-radius: 30upx;
		color: #929292;
		padding: 0 20upx;
		margin-right: 20upx;
	}

	.job {
		border: none;
		border-radius: 0;
		padding: 0;
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
		flex-direction: row;
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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
		align-content: center;
		padding: 20upx 0 0;
	}

	.count-txt {
		font-size: 52upx;
		color: #008CEE;
		line-height: 1;
	}

	.class-state-green {
		color: #3BC1B0;
	}

	.class-state-red {
		color: #EE6858;
	}
</style>
