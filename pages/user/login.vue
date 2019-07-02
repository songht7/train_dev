<template>
	<view class="login-box pages">
		<view class="page-main">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<input class="uni-input train-input" name="phone" data-key="phone" @input="setData" :placeholder="UserType=='company'?'用户名':'用户名/邮箱/手机号'" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="with-fun">
						<input class="uni-input train-input" password name="password" data-key="password" @input="setData" placeholder="登录密码" />
					</view>
				</view>
				<view class="uni-btn-block uni-row">
					<view class="btns btns-full" @click="formSubmit">登录</view>
					<!-- <button formType="submit" :loading="loading" class="log-btn btn-submit">登录</button> -->
					<view class="btns btn-back" @click="$store.dispatch('goback','/pages/index/index')">返回</view>
				</view>
			</form>
			<view class="uni-row user-login-more">
				<view class="more-btn" @click="toRegister('')">{{UserType=='company'?'企业注册':'手机快速注册'}}</view>
				<view class="more-btn" @click="toRegister('forgetpw')">忘记密码</view>
			</view>
		</view>
		<uni-popup :show="poptype === 'company-reg'" position="middle" mode="fixed" width="70" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<view class="train-show-modal-info">
					<view class="train-show-modal-row">请与我们联系</view>
					<view class="train-show-modal-row">{{popTxtType=='company-reg'?"开通企业专属账号":"寻回密码"}}</view>
				</view>
				<view class="btns btns-full btns-big" @click="$store.dispatch('makePhoneCall')">拨打电话</view>
			</view>
		</uni-popup>
		<loading></loading>

		<!-- #ifdef MP-WEIXIN -->
		<view class="mp-login" v-if="MPLogin">
			<button class="mp-btns" lang="zh_CN" open-type="getUserInfo" @click="bindMP">
				<uni-icon type="weixin" size="50" color="#80D93C"></uni-icon>
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	var graceChecker = require("@/common/graceChecker.js");
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		data() {
			return {
				UserType: "",
				loading: false,
				poptype: "",
				popTxtType: "company-reg",
				formData: {
					"phone": "",
					"password": ""
				},
				MPLogin: false
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
		components: {
			uniPopup
		},
		methods: {
			bindMP(e) {
				console.log(e)
			},
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let _formData = that.formData;
				//let _formData = e.detail.value;
				that.loading = true
				//console.log(_formData);
				var rule = [{
						name: "phone",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "用户名不能为空"
					},
					{
						name: "password",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "密码不能为空"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					//_formData["Portrait"] = "/static/logo.png";
					var _openid = that.$store.state.openid;
					console.log(_openid)
					let data = {
						"inter": that.UserType == 'company' ? "sign" : "login",
						"data": _formData,
						"method": "POST"
					}
					if (_openid) {
						data["header"] = {
							"openid": _openid
						}
					}
					data["fun"] = function(res) {
						if (res.success) {
							var _token = res.data.token;
							var deathline = res.data.deathline;
							let _data = {
								"inter": "info",
								"header": {
									"token": _token
								}
							}
							_data["fun"] = function(ress) {
								that.loading = false
								if (ress.success) {
									ress["data"]["tabBarType"] = that.UserType;
									ress["data"]["token"] = _token;
									ress["data"]["deathline"] = deathline;
									uni.setStorage({
										key: "user",
										data: ress.data
									});
									uni.showToast({
										title: "登录成功",
										icon: "success",
										duration: 1500
									})
									that.$store.dispatch('cheack_user');
									setTimeout(() => {
										that.$store.commit("change_page", 0)
										var _url = that.UserType == 'company' ? "/pages/company/statis?t=0" : "/pages/index/index";
										uni.redirectTo({
											url: _url
										})
									}, 1500)
								}
							}
							that.$store.dispatch("getData", _data)
						} else {
							that.loading = false
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
			toRegister(type) {
				var that = this;
				if (that.UserType == "company") {
					that.poptype = "company-reg";
					that.popTxtType = type ? "" : "company-reg";
				} else {
					let _type = type ? "?type=" + type : '';
					uni.navigateTo({
						url: `/pages/user/register${_type}`
					})
				}
			},
			togglePopup(type) {
				this.poptype = type;
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

	.mp-login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.mp-btns {
		background: none;
		color: #007AFF;
		letter-spacing: 2upx;
	}

	.mp-btns::after {
		border: none;
	}
</style>
