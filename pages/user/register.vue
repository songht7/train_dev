<template>
	<view class="login-box pages">
		<view class="page-main">
			<form @submit="formSubmit">
				<view v-show="current === 0">
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" name="phone" data-key="phone" @input="setData" placeholder="请输入手机号" />
					</view>
					<view class="uni-form-item flex-between uni-row">
						<view class="input-block get-code-left">
							<input class="uni-input train-input" name="code" data-key="code" @input="setData" placeholder="验证码" />
						</view>
						<view class="get-code" :class="btnLoading" @click="getCode">{{getCodeTxt}}</view>
					</view>
					<block v-if="regType==='register'">
						<view class="uni-form-item uni-column">
							<input class="uni-input train-input" name="name" data-key="name" @input="setData" placeholder="请输入真实姓名" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="check-agreement">
								<view>
									<checkbox-group name="Agreement" @change="checkboxChange">
										<label>
											<checkbox value="true" checked="true" /><text class="agmt-txt">接受</text></label>
									</checkbox-group>
								</view>
								<view class="agreement agmt-txt" @click="popupIntro('agreement')">《声明条款》</view>
							</view>
						</view>
					</block>
					<view class="uni-btn-block">
						<view class="btns btns-full btns-big" @click="regNext(1)">下一步</view>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" password name="password" data-key="password" @input="setData" placeholder="输入密码" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" password name="cfn_password" data-key="cfn_password" @input="setData"
						 placeholder="再次确认" />
					</view>
					<view class="uni-btn-block">
						<view class="btns btn-back" @click="regNext(0)">返回</view>
						<view class="btns btns-full" @click="formSubmit">确认提交</view>
					</view>
				</view>
			</form>
		</view>
		<!-- 弹出层 -->
		<lvv-popup position="top" ref="lvvpopref">
			<view class="pop-inner" :class="'pop-inner-'+popType">
				<block v-if="popType=='agreement'">
					<agreement @click="closeIntro"></agreement>
				</block>
			</view>
		</lvv-popup>
		<!-- 弹出层 -->
		<loading></loading>
	</view>
</template>

<script>
	import lvvPopup from '../../components/lvv-popup.vue'
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				regType: "",
				loading: false,
				current: 0,
				getCodeTxt: "获取验证码",
				seconds: 60,
				btnLoading: "",
				checkCode: "",
				formData: {
					"phone": "",
					"code": "",
					"name": "",
					"Agreement": "",
					"password": "",
					"cfn_password": ""
				},
				popType: "agreement"
			};
		},
		onLoad(e) {
			var that = this;
			let _type = e.type;
			that.regType = _type ? _type : 'register';
			uni.setNavigationBarTitle({
				title: that.regType === "register" ? "个人注册" : "寻回密码"
			})
			//this.$loading()
			// 			uni.showLoading({
			// 				title:"加载中..."
			// 			})
		},
		onShow() {

		},
		computed: {},
		components: {
			lvvPopup
		},
		methods: {
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let _formData = that.formData;
				//let _formData = e.detail.value;
				that.loading = true
				console.log(_formData);
				var rule = [{
						name: "password",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "密码不能为空"
					},
					{
						name: "cfn_password",
						checkType: "same",
						checkRule: _formData.password,
						errorMsg: "密码不一致，请确认"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					let data = {
						"inter": "register",
						"data": _formData,
						"method": "POST"
					}
					data["fun"] = function(res) {
						console.log(res)
						that.loading = false
						if (res.success) {
							//that.$store.commit("change_page", 0)
							let tip = that.regType === 'forgetpw' ? "修改成功，请登录" : "注册成功";
							uni.showToast({
								title: tip,
								icon: "none",
								duration: 1500
							});
							setTimeout(() => {
								uni.redirectTo({
									url: "/pages/user/login?type=user"
								})
							}, 1500)
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
					}
					if (that.regType === 'forgetpw') {
						data["inter"] = "reset"
						data["method"] = "PUT"
					}
					that.$store.dispatch("getData", data)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					that.loading = false
				}
			},
			toRegister() {
				var that = this;
				if (that.UserType == "company") {

				} else {
					uni.navigateTo({
						url: "/pages/user/register"
					})
				}
			},
			regNext(val) {
				var that = this;
				var rule = [{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "code",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "验证码不能为空"
					}
				];
				if (that.regType === 'register') {
					let n = {
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入真实姓名"
					};
					let am = {
						name: "Agreement",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请接受声明条款"
					}
					rule.push(n)
					rule.push(am)
				}
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					that.current = val
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					that.loading = false
				}
			},
			getCode() {
				var that = this;
				if (that.btnLoading) {
					return
				}
				var rule = [{
					name: "phone",
					checkType: "phoneno",
					checkRule: "",
					errorMsg: "请填写正确的手机号"
				}];
				let _formData = that.formData;
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证码已发送",
						icon: "none"
					});
					that.btnLoading = "btn-loading";

					var countdown = setInterval(() => {
						that.seconds--
						if (that.seconds < 0) {
							that.getCodeTxt = "获取验证码";
							that.seconds = 60;
							that.btnLoading = "";
							clearInterval(countdown)
							return
						}
						that.getCodeTxt = `${that.seconds} 秒后重试`;
					}, 1000)
					/*获取验证码*/
					let _inter = "sendRegistSms";
					if (that.regType === 'forgetpw') {
						_inter = "sendSms"
					}
					let data_les = {
						"inter": _inter,
						"parm": `?phone=${_formData.phone}`
					}
					data_les["fun"] = function(res) {
						if (res.success) {
							//that.checkCode
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
							that.getCodeTxt = "获取验证码";
							that.seconds = 60;
							that.btnLoading = "";
							clearInterval(countdown)
						}
					}
					that.$store.dispatch("getData", data_les)

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}

			},
			popupIntro(type) {
				this.popType = type;
				this.$refs.lvvpopref.show();
			},
			checkboxChange(e){
				var that = this;
				that.formData['Agreement'] = e.detail.value;
			},
			setData(e) {
				//console.log(e);
				var that = this;
				that.formData[`${e.currentTarget.dataset.key}`] = e.detail.value;
			}
		}
	}
</script>

<style>
	@import "./center.css";
</style>
