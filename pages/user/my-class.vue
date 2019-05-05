<template>
	<view class="user-center">
		<view class="user-block">
			<view class="user-class-list">
				<view class="my-class-head">
					<view class="class-tip">
						<view class="class-icon">
							<uni-icon type="shuji" :size="20" color="#FFFFFF"></uni-icon>
						</view>
						<view class="txt-sross">我参与的课程</view>
					</view>
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
		},
		methods: {
			
		}
	}
</script>

<style>
	@import "./center.css";
</style>
