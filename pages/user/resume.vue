<template>
	<view class="user-center user-center-full">
		<view class="page-main">
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">基本信息</view>
					<view class="block-edit">
						<view class="edit-name">编辑</view>
						<uni-icon type="bianji" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">名字</view>
							<view class="basic-val">某某某</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">生日</view>
							<view class="basic-val">1988.01.01</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">性别</view>
							<view class="basic-val">男</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">学历</view>
							<view class="basic-val">本科</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">工作年限</view>
							<view class="basic-val">5年</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">手机</view>
							<view class="basic-val">13988888888</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">电子邮箱</view>
							<view class="basic-val">asd@163.com</view>
						</view>
					</view>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">工作经历</view>
					<view class="block-edit">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10 每日优鲜 质检员</view>
							<view class="work-overview">
								<view class="work-ov-li">1.负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">2.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">3.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作负责平台商家在线、</view>
								<view class="work-ov-li">4.负责平台商家在线、热线质检工作负责平台商家在线</view>
							</view>
							<view class="block-edit work-edit">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">教育经历</view>
					<view class="block-edit">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10</view>
							<view class="work-val">上海大学 本科 商务英语</view>
							<view class="block-edit work-edit">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">项目经历</view>
					<view class="block-edit">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10 每日优鲜 质检员</view>
							<view class="work-overview">
								<view class="work-ov-li">1.负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">2.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作</view>
							</view>
							<view class="block-edit work-edit">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">自我描述</view>
					<view class="block-edit">
						<view class="edit-name">编辑</view>
						<uni-icon type="bianji" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<view class="self-des">
						本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。
					</view>
				</view>
			</view>
		</view>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {
				UserId: "",
				__token: ""
			}
		},
		components: {
			fixButton
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

		}
	}
</script>

<style>
	@import "./center.css";

	.resume-head {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding-bottom: 15upx;
	}

	.block-title {
		font-weight: 600;
		font-size: 34upx;
	}

	.block-edit {
		display: flex;
		font-size: 26upx;
		color: #929292;
		align-content: center;
		align-items: center;
	}

	.edit-name {
		padding-right: 10upx;
	}

	.basic-row {
		display: flex;
		justify-content: space-between;
		padding-bottom: 10upx;
	}

	.basic-block {
		width: 50%;
	}

	.basic-title {
		font-size: 26upx;
		color: #929292;
	}

	.basic-val {
		font-size: 32upx;
		color: #222222;
	}

	.work-row {
		padding-bottom: 15upx;
		border-bottom: 2upx solid #E0E0E0;
		margin-bottom: 15upx;
	}

	.work-row:last-child {
		border-bottom: none;
		margin-bottom: 0
	}

	.work-title {
		color: #008CEE;
		font-size: 32upx;
		padding-bottom: 10upx;
		padding-left: 40upx;
		position: relative;
	}

	.work-title::before {
		content: "";
		width: 18upx;
		height: 18upx;
		border: 1px solid #E0E0E0;
		border-radius: 50%;
		position: absolute;
		top: 25%;
		left: 0;
	}

	.work-val {
		color: #008CEE;
		font-size: 32upx;
		padding-left: 40upx;
	}

	.work-overview {
		padding-left: 40upx;
	}

	.work-ov-li {
		font-size: 26upx;
		color: #22222;
		line-height: 1.4;
		padding-bottom: 5upx;
	}

	.work-edit {
		padding: 20upx 0 0 40upx;
	}

	.self-des {
		line-height: 1.4;
		color: #222;
		font-size: 26upx;
	}
</style>
