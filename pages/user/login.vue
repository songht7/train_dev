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
				<view class="uni-btn-v">
					<view class="log-btn btn-submit" @click="formSubmit">登录</view>
					<!-- <button formType="submit" :loading="loading" class="log-btn btn-submit">登录</button> -->
					<view class="log-btn btn-back" @click="$store.dispatch('goback','/pages/index/index')">返回</view>
				</view>
			</form>
		</view>
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
			setData(e) {
				//console.log(e);
				var that = this;
				that.formData[`${e.currentTarget.dataset.key}`] = e.detail.value;
			}
		}
	}
</script>

<style>
	.train-input {
		background: #F4F4F4;
	}

	.uni-btn-v {
		display: flex;
		align-content: space-between;
		align-items: center;
		justify-content: space-between;
	}

	.log-btn {
		width: 48%;
	}

	.log-btn {
		text-align: center;
		line-break: 2;
		font-size: 36upx;
		border: 4upx solid #008CEE;
		color: #008CEE;
		height: 100%;
		height: 86upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10upx;
		padding: 0;
		margin: 0;
	}

	.btn-submit {
		background: #008CEE;
		color: #ffffff;
	}
</style>
