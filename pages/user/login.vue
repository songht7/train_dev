<template>
	<view class="login-box pages">
		<view class="page-main">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<input class="uni-input train-input" name="UserName" data-key="UserName" @input="setData" :placeholder="UserType=='company'?'用户名':'用户名/邮箱/手机号'" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="with-fun">
						<input class="uni-input train-input" password name="Password" data-key="Password" @input="setData" placeholder="登录密码" />
					</view>
				</view>
				<view class="uni-btn-block">
					<view class="btns btns-full" @click="formSubmit">登录</view>
					<!-- <button formType="submit" :loading="loading" class="log-btn btn-submit">登录</button> -->
					<view class="btns btn-back" @click="$store.dispatch('goback','/pages/index/index')">返回</view>
				</view>
			</form>
			<view class="user-login-more">
				<view class="more-btn" @click="toRegister">{{UserType=='company'?'企业注册':'手机快速注册'}}</view>
				<view class="more-btn">忘记密码</view>
			</view>
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
				formData: {
					"UserName": "",
					"Password": ""
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
				that.loading = true
				console.log(_formData);
				var rule = [{
						name: "UserName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "用户名不能为空"
					},
					{
						name: "Password",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "密码不能为空"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					//_formData["Portrait"] = "/static/logo.png";
					let data = {
						"inter": "login",
						"data": _formData,
						"method": "POST"
					}
					data["fun"] = function(res) {
						console.log(res)
						that.loading = false
						if (res.success) {
							uni.setStorage({
								key: "user",
								data: res.data
							});
							that.$store.commit("change_page", 0)
							// uni.redirectTo({
							// 	url: "/"
							// })
						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						}
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
