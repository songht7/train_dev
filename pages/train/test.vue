<template>
	<view class="train-test">
		<form @submit="formSubmit">
			<view class="test-content">
				<block v-for="(t,i) in test_leng" :key="i">
					<view v-show="current === t">
						题目{{t}}
					</view>
				</block>
			</view>
			<view class="fix-button">
				<view class="fbtn-main">
					<view class="fbtns btn-goback" v-show="current===1" @click="$store.dispatch('goback')">退出测试</view>
					<view class="fbtns btn-totest" v-show="current>1" @click="test_more('prev')">上一题</view>
					<view class="fbtns fbtns-clr-full btn-totest" v-show="current<test_leng" @click="test_more('next')">下一题</view>
					<view class="fbtns fbtns-clr-full btn-totest" v-show="current===test_leng" @click="formSubmit">提交</view>
				</view>
			</view>
		</form>
		<uni-popup :show="type === 'score'" position="middle" mode="insert" @hidePopup="togglePopup('')">
			<view class="uni-center center-box score-box">
				<view class="score-top">
					<view class="score-top-val score-des">{{scoreDes}}</view>
					<view class="score-top-val ">
						<uni-icon type="al-star" isGradient="isGradient" size="45" color="#FFDA76"></uni-icon>
					</view>
				</view>
				<view class="score-middle">
					<view class="score-ov">您的成绩</view>
					<view class="score">{{score}}</view>
				</view>
				<view class="score-bottom">
					<view class="score-btn">继续学习</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		data() {
			return {
				current: 1,
				test_leng: 5,
				loading: false,
				submitData: [],
				type: '',
				scoreDes: "成绩不合格",
				score: 0
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "理论测试"
			})
		},
		onShow() {
			this.$store.dispatch('cheack_user')
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		onReady: function(res) {},
		computed: {},
		components: {
			uniPopup
		},
		methods: {
			togglePopup(type) {
				this.type = type;
			},
			test_more(type) {
				var that = this;
				switch (type) {
					case "prev":
						that.current = that.current - 1 >= 1 ? that.current - 1 : 1;
						break;
					case "next":
						that.current = that.current + 1 <= that.test_leng ? that.current + 1 : that.test_leng;
						break;
				}
			},
			formSubmit(e) {
				var that = this;
				that.togglePopup('score');
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				//that.loading = true
				console.log(formData);
			}
		}
	}
</script>

<style>
	.sub-btn {
		padding: 0;
		margin: 0;
		background: transparent;
		border-radius: 0;
		line-height: 1
	}

	.sub-btn:after {
		width: 100%;
		height: 100%;
		border: none;
	}

	.score-box {
		background: #fff;
		border-radius: 10upx;
		width: 100%;
		overflow: hidden;
	}

	.score-top{position: relative;overflow: hidden;}
	.score-top::before {
		position: absolute;
		left: -50%;
		top: -130%;
		width: 200%;
		height: 200%;
		content: "";
		background: #EA5950;
		z-index: 0;
		border-radius: 50%;
	}
	.score-top-val{position: relative;z-index: 1;}
</style>
