<template>
	<view class="login-box pages">
		<view class="page-main">
			<form @submit="formSubmit">
				<view v-show="current === 0">
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" name="phone" data-key="phone" @input="setData" placeholder="请输入手机号" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" name="code" data-key="code" @input="setData" placeholder="验证码" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input train-input" name="name" data-key="name" @input="setData" placeholder="请输入真实姓名" />
					</view>
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
						<view class="btns btns-full" @click="formSubmit">注册</view>
					</view>
				</view>
			</form>
		</view>
		<loading></loading>
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				UserType: "",
				loading: false,
				current: 0,
				formData: {
					"phone": "",
					"code": "",
					"name": "",
					"password": "",
					"cfn_password": ""
				}
			};
		},
		onLoad(e) {
			var that = this;
			let _type = e.type;
			that.UserType = _type;
			uni.setNavigationBarTitle({
				title: _type == "company" ? "企业登录" : "个人登录"
			})
			//this.$loading()
			// 			uni.showLoading({
			// 				title:"加载中..."
			// 			})
		},
		onShow() {

		},
		computed: {},
		methods: {
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let _formData = that.formData;
				//let _formData = e.detail.value;
				//that.loading = true
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
					_formData["UserId"] = "1";
					_formData["Portrait"] = "/static/logo.png";
					_formData["UserType"] = that.UserType;
					uni.setStorage({
						key: "user",
						data: _formData
					});
					setTimeout(function() {
						that.$store.commit("change_page", 0)
						uni.redirectTo({
							url: "/"
						})
					}, 2000)
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
					uni.showModal({
						title: '提示',
						content: '这是一个模态弹窗',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
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
					},
					{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入真实姓名"
					}
				];
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
