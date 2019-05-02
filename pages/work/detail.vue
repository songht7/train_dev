<template>
	<view class="content">
		<view class="pages page-main">
			<view class="work-dtl-head">
				<view class="work-head-main">
					<view class="work-head-list">
						<view class="work-block">
							<view class="work-block-title work-dtl-name">友爱数码 | 高级质检员</view>
						</view>
						<view class="work-block">
							<view class="work-require">上海 | 普陀区 | 1-2年 | 无学历要求</view>
						</view>
						<view class="work-block">
							<view class="work-salary">6-8K</view>
						</view>
						<view class="work-block">
							<view class="work-tag-list">
								<view class="work-tag">五险一金</view>
								<view class="work-tag">有住宿</view>
								<view class="work-tag">公司提供一日两餐</view>
							</view>
						</view>
					</view>
					<view class="work-head-list">
						<view class="work-block">
							<view class="work-block-title">
								<uni-icon type="weizhi" size="20" color="#898989"></uni-icon>上海 - 普陀区
							</view>
						</view>
						<view class="work-block">
							<view class="work-address">上海普陀区某某路xx号5楼</view>
						</view>
					</view>
				</view>
			</view>
			<view class="work-detail-overview">
				<view class="work-block-title title-block">职位描述</view>
				<view class="work-content">
					<rich-text :nodes="htmlString"></rich-text>
				</view>
			</view>
			<fix-button>
				<view class="fbtns fbtns-clr-full btn-totest" @click="sendResume">发送简历</view>
			</fix-button>
		</view>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	export default {
		data() {
			return {
				htmlString: "<p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p><p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p><p>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</p>"
			}
		},
		onLoad() {
			var that = this;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			// uni.setNavigationBarTitle({
			// 	title: "友爱数码 | 高级质检员"
			// })
		},
		onReady() {
			var that = this;
		},
		components: {
			fixButton
		},
		computed: {},
		methods: {
			sendResume() {}
		}
	}
</script>

<style>
	@import "./work.css";
</style>
