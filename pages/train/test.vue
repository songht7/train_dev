<template>
	<view class="train-test">
		<form @submit="formSubmit">
			<view class="test-content">
				<view class="test-head">
					<!-- <view class="test-countdown">测试倒计时</view> -->
					<view class="test-total">共{{test_total}}题</view>
				</view>
				<block v-for="(t,i) in tests" :key="i">
					<view v-show="current === i+1">
						<view class="test-block">
							<view class="test-title">
								第{{current}}题:{{t.name}},{{t.overview}}
							</view>
							<rich-text :nodes="t.detail"></rich-text>
							<view class="test-answer">
								<view class="test-answer-info">答案：</view>
								<view class="uni-list-cell">
									<input class="uni-input tst-input" value="" :name="`${i+1}`" />
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<fix-button gobackShow="hide">
				<view class="fbtns btn-goback" v-show="current===1" @click="$store.dispatch('goback')">退出测试</view>
				<view class="fbtns btn-totest" v-show="current>1" @click="test_more('prev')">上一题</view>
				<view class="fbtns fbtns-clr-full btn-totest" v-show="current<test_total" @click="test_more('next')">下一题</view>
				<!-- <view class="fbtns fbtns-clr-full btn-totest" v-show="current===test_total" @click="formSubmit">提交</view> -->
				<button class="fbtns fbtns-clr-full btn-totest btn-button" v-show="current===test_total" formType="submit" type="primary">提交</button>
			</fix-button>
		</form>
		<uni-popup :show="type === 'score'" position="middle" mode="insert" width="70" @hidePopup="goToList">
			<view class="uni-center center-box score-box" :class="scoreState">
				<view class="score-block score-top" :class="scoreState">
					<view class="score-top-val score-des">{{scoreDes}}</view>
					<view class="score-top-val score-star">
						<uni-icon type="al-star" isGradient="isGradient" v-if="scoreState=='stateGreen'" iconBig="icon-big" size="35"
						 color="#FFDA76"></uni-icon>
						<uni-icon type="al-star" isGradient="isGradient" iconBig="icon-big" size="50" color="#FFDA76"></uni-icon>
						<uni-icon type="al-star" isGradient="isGradient" v-if="scoreState=='stateGreen'" iconBig="icon-big" size="35"
						 color="#FFDA76"></uni-icon>
					</view>
				</view>
				<view class="score-block score-middle">
					<view class="score-ov">您的成绩</view>
					<view class="score">{{score}}</view>
				</view>
				<view class="score-block score-bottom">
					<view class="score-btn" :class="scoreState" @click="goToList">继续学习</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		data() {
			return {
				courseId: "",
				__token: "",
				current: 1,
				tests: [],
				test_leng: 5,
				test_total: 0,
				loading: false,
				submitData: [],
				type: '',
				scoreDes: "成绩不合格",
				score: 0,
				scoreState: "stateRed" //stateRed不合格 /stateGreen合格
			}
		},
		onLoad(e) {
			var that = this;
			that.courseId = e.course_id;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token;
			uni.setNavigationBarTitle({
				title: "理论测试"
			})
			/* tests */
			let data_tests = {
				"inter": "tests",
				"parm": `?course_id=${that.courseId}`,
				"header": {
					"token": that.__token
				}
			}
			data_tests["fun"] = function(res) {
				if (res.success) {
					that.tests = res.data.list;
					that.test_leng = res.data.max;
					that.test_total = res.data.total;
				}
			}
			that.$store.dispatch("getData", data_tests)
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
			fixButton,
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
			goToList() {
				this.togglePopup('');
				uni.redirectTo({
					url: `/pages/train/unitlist?id=${this.courseId}`
				})
			},
			formSubmit(e) {
				var that = this;
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				if (that.loading == true) {
					return
				}
				that.loading = true
				console.log(formData);

				let _data = {
					"course_id": that.courseId,
					"aws": formData
				};
				/* send test */
				let data_test = {
					"inter": "test",
					"data": _data,
					"method": "POST",
					"header": {
						"token": that.__token
					}
				}
				data_test["fun"] = function(res) {
					that.loading = false
					if (res.success) {
						that.togglePopup('score');
						let _point = res.data.exam.point
						that.score = _point;
						if (_point >= 60) {
							that.scoreDes = "成绩合格";
							that.scoreState = "stateGreen";
						} else {
							that.scoreDes = "成绩不合格";
							that.scoreState = "stateRed";
						}
					}
				}
				that.$store.dispatch("getData", data_test)
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

	.uni-popup-middle {
		width: 80%;
	}

	.score-box {
		background: #fff;
		border-radius: 10upx;
		width: 100%;
		overflow: hidden;
		color: #F04B3F;
		padding: 0 0 30upx;
	}

	.score-box.stateGreen {
		color: #56CEBE;
	}

	.score-block {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}

	.score-top {
		position: relative;
		overflow: hidden;
		padding: 40upx 0 20upx;
	}

	.score-top::before {
		position: absolute;
		left: -50%;
		top: -125%;
		width: 200%;
		height: 200%;
		content: "";
		background: linear-gradient(#F58568, #EA5950);
		z-index: 0;
		border-radius: 50%;
	}

	.score-top.stateGreen::before {
		background: linear-gradient(#48AFBE, #58D3BE);
	}

	.score-top-val {
		position: relative;
		z-index: 1;
	}

	.score-des {
		font-size: 60upx;
		line-height: 2;
		color: #fff;
	}

	.score-star {
		display: flex;
		justify-content: space-around;
		width: 80%;
		align-items: center;
	}

	.score-ov {
		font-size: 28upx;
	}

	.score {
		font-size: 130upx;
		line-height: 1;
		padding: 10upx 0 50upx;
	}

	.score-btn {
		color: #fff;
		background: #F04B3F;
		line-height: 2.4;
		width: 80%;
		border-radius: 10upx;
		font-size: 32upx;
	}

	.score-btn.stateGreen {
		background: #56CEBE;
	}

	.test-head {
		display: flex;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		padding: 20upx 30upx;
		font-size: 32upx;
	}

	.test-block {
		font-size: 32upx;
		color: #222222;
		padding: 30upx;
	}

	.test-title {
		font-size: 34upx;
		padding-bottom: 20upx;
	}

	.test-answer {
		display: flex;
		align-content: center;
		align-items: center;
	}

	.test-answer-info {
		font-size: 36upx;
	}

	.tst-input {
		border-bottom: 1px solid #929292;
		margin-left: 5upx;
		padding: 2upx 20upx;
	}

	.btn-button {
		line-height: 1.8;
		margin: 0;
		box-sizing: content-box;
	}

	.btn-button:after {
		border: none
	}
</style>
