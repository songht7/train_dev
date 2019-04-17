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
		<uni-popup :show="type === 'score'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="uni-center center-box score-box">
				成绩99
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
				type: ''
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
				that.togglePopup('score')
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
	}
</style>
