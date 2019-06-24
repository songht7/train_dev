<template>
	<view class="page-main train-test">
		<form @submit="formSubmit">
			<view class="test-content">
				<view class="test-head">
					<view class="test-countdown" v-if="countdownShow">
						答题倒计时 <uni-countdown color="#f40" border-color="#f40" :show-day="false" :minute="countdown" :second="0" @timeup="toSubmit"></uni-countdown>
						后自动提交
					</view>
					<view class="test-total">本章节测试，共{{test_total}}题</view>
				</view>
				<block v-for="(t,i) in tests" :key="i">
					<view v-show="current === i+1">
						<view class="test-block">
							<block v-if="submitted==true">
								<view class="test-marking">
									<uni-icon :type="t.serialization==formData[t.id]?'buoumaotubiao49':'kulian'" size="80" :color="t.serialization==formData[t.id]?'#5FC1B7':'#DE544C'"></uni-icon>
								</view>
							</block>
							<view class="test-title-box">
								<view class="test-title">
									第{{current}}题:{{t.name}}
								</view>
								<view class="test-tyle">
									<block v-if="t.type==='select'">
										单选题
									</block>
									<block v-else-if="t.type==='selects'">
										多选题
									</block>
									<block v-else>
										填空题
									</block>
								</view>
							</view>
							<rich-text v-if="t.detail" :nodes="t.detail"></rich-text>
							<block v-if="t.type==='select'">
								<view class="choose-list radio-box">
									<radio-group :name="t.id" @change="setData" :data-key="t.id">
										<label class="train-choose-list" v-for="(val, key) in t.select" :key="val">
											<view>
												<radio :value="key" />
											</view>
											<view>
												<!-- <text class="TorF true">✔</text><text class="TorF false">✘</text> -->
												<text v-if="val=='对'||val=='正确'" class="TorF true">✔</text>
												<text v-else-if="val=='错'||val=='错误'" class="TorF false">✘</text>
												<text v-else>{{key}}：{{val}}</text>
											</view>
										</label>
									</radio-group>
								</view>
							</block>
							<block v-else-if="t.type==='selects'">
								<checkbox-group :name="t.id" @change="setData" :data-key="t.id" data-tyle="checkbox">
									<label class="train-choose-list" v-for="(val, key) in t.select" :key="val">
										<checkbox :value="key" />{{key}}：{{val}}
									</label>
								</checkbox-group>
							</block>
							<block v-else>
								<view class="test-answer">
									<view class="test-answer-info">答案：</view>
									<view class="uni-list-cell">
										<input class="uni-input" :name="t.id" :data-key="t.id" @input="setData" @focus="setFixBtn('static')" @blur="setFixBtn('fixed')" />
									</view>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>
			<fix-button gobackShow="hide" :isFixed="getFixBtn">
				<view class="fbtns btn-goback" :class="test_total<=0?'fbtn-full':''" v-show="current===1" @click="$store.dispatch('goback')">退出测试</view>
				<view class="fbtns btn-totest" v-show="current>1" @click="test_more('prev')">上一题</view>
				<view class="fbtns fbtns-clr-full btn-totest" v-show="current<test_total" @click="test_more('next')">下一题</view>
				<view class="fbtns fbtns-clr-full btn-totest" v-show="current===test_total" v-if="!submitted" @click="formSubmit">提交</view>
				<view class="fbtns fbtns-clr-full btn-totest" v-show="current===test_total" v-else @click="goToList">继续学习</view>
				<!-- 	<button class="fbtns fbtns-clr-full btn-totest btn-button" v-show="current===test_total" formType="submit" type="primary">提交</button> -->
			</fix-button>
		</form>
		<uni-popup :show="type === 'score'" position="middle" mode="insert" :closeBtnShow="closeBtnShow" width="70"
		 @hidePopup="togglePopup('')">
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
					<view class="score-btn score-back-btn" @click="togglePopup('')">查看结果</view>
					<view class="score-btn" :class="scoreState" @click="goToList">继续学习</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup :show="type === 'overtime'" position="middle" mode="fixed" width="70" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<view class="train-show-modal-info">
					<view class="train-show-modal-row">答题已超时</view>
				</view>
				<view class="btns btns-full" @click="answerAgain">重新答题</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown.vue'
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
				countdown: 5, //分钟
				countdownShow: false,
				loading: false,
				submitted: false,
				formData: [],
				type: "",
				scoreDes: "成绩不合格",
				score: 0,
				scoreState: "stateRed", //stateRed不合格 /stateGreen合格
				fixBtn: "fixed",
				closeBtnShow: false
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
					let _test = res.data.list;
					_test.map((obj, index, arr) => {
						obj["detail"] = obj["detail"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					});
					that.tests = _test;
					that.test_leng = res.data.max;
					that.test_total = res.data.total;
				}
			}
			that.$store.dispatch("getData", data_tests)
		},
		onShow() {
			this.$store.dispatch('cheack_user')
			this.$store.dispatch('getSystemInfo');
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		onReady: function(res) {},
		computed: {
			getFixBtn() {
				var that = this;
				var _fixBtn = "fixed";
				var platform = that.$store.state.systemInfo.platform || "ALL";
				if (platform.toUpperCase() == "IOS" || platform == "ALL") {
					_fixBtn = "static";
				}
				return _fixBtn;
			},
			selectType(val) {
				var _val = val;
				switch (val) {
					case '对':
						_val = '<text class="TorF true">✔</text>'
						break;
					case '错':
						_val = '<text class="TorF false">✘</text>'
						break;
					default:
						_val = val
						break;
				}
				return _val
			}
		},
		components: {
			fixButton,
			uniPopup,
			uniCountdown
		},
		methods: {
			togglePopup(type) {
				this.type = type;
			},
			test_more(type) {
				var that = this;
				if (that.countdown <= 0) {
					//that.type = "overtime";
					//return
				}
				switch (type) {
					case "prev":
						that.current = that.current - 1 >= 1 ? that.current - 1 : 1;
						break;
					case "next":
						that.current = that.current + 1 <= that.test_leng ? that.current + 1 : that.test_leng;
						break;
				}
			},
			answerAgain() {
				uni.redirectTo({
					url: `/pages/train/test?course_id=${this.courseId}`
				})
			},
			goToList() {
				this.togglePopup('');
				uni.redirectTo({
					url: `/pages/train/unitlist?id=${this.courseId}`
				})
			},
			setData(e) {
				var that = this;
				var _val = e.detail.value;
				if (e.currentTarget.dataset.tyle && e.currentTarget.dataset.tyle == 'checkbox') {
					var _v = "";
					_val.forEach((value, index, array) => {
						_v += value;
					})
					_val = _v;
				}
				that.formData[`${e.currentTarget.dataset.key}`] = _val;
			},
			setFixBtn(type) {
				var that = this;
				// var platform = that.$store.state.systemInfo.platform || "ALL";
				// if (platform.toUpperCase() == "IOS" || platform == "ALL") {
				// 	that.fixBtn = type;
				// }
			},
			toSubmit() {
				var that = this;
				if (that.submitted == true) {
					return
				}
				that.formSubmit();
			},
			formSubmit(e) {
				var that = this;
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = that.formData; //e.detail.value;
				// console.log(formData)
				// return
				if (that.loading == true) {
					return
				}
				if (that.submitted == true) {
					uni.showToast({
						title: "您已交卷！不可重复提交",
						icon: "none"
					})
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
						let _point = res.data.exam && res.data.exam.point ? res.data.exam.point : 0
						that.score = _point;
						that.countdown = 0;
						that.submitted = true;
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

	.score-bottom {
		display: flex;
		justify-content: space-around;
		flex-direction: row;
	}

	.score-btn {
		color: #fff;
		background: #F04B3F;
		line-height: 2.4;
		width: 45%;
		border-radius: 10upx;
		font-size: 32upx;
	}

	.score-btn.stateGreen {
		background: #56CEBE;
	}

	.score-back-btn {
		background: #FFFFFF;
		border: 1px solid #BBBBBB;
		color: #666;
	}

	.test-head {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding: 20upx 30upx;
	}

	.test-countdown {
		font-size: 34upx;
	}

	.test-total {
		font-size: 32upx;
		padding: 20upx 0 0;
	}

	.test-block {
		font-size: 32upx;
		color: #222222;
		padding: 30upx;
		position: relative;
	}

	.test-marking {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.test-title-box {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: flex-start;
	}

	.test-title {
		font-size: 34upx;
		padding-bottom: 20upx;
		width: 84%;
	}

	.test-tyle {
		width: 15%;
		color: #008CEE;
		border: 1px solid #008CEE;
		border-radius: 10upx;
		font-size: 24upx;
		display: flex;
		align-content: center;
		align-items: center;
		text-align: center;
		justify-content: center;
		position: relative;
		top: 10upx;
	}

	.test-answer {
		display: flex;
		align-content: center;
		align-items: center;
		padding: 40upx 0;
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

	.train-choose-list {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		padding: 20upx;
	}

	.TorF {
		font-size: 38upx;
		color: #007AFF;
		padding: 0 25upx;
	}

	.false {
		color: #3A3A3A;
	}
</style>
