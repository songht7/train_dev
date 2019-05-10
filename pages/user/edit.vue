<template>
	<view class="user-center">
		<view class="page-main">
			<view class="edit-segment">
				<uni-segmented-control :current="current" :values="segmented" v-on:clickItem="onClicksegmented" styleType="text"
				 activeColor="#008CEE"></uni-segmented-control>
			</view>
			<view class="unit-content">
				<view v-show="current === 0">
					<view class="form-box">
						<form @submit="bindCompany">
							<view class="uni-form-item uni-row" v-if="companyStatu!='0'">
								<view class="uni-title-edit">企业代码：</view>
								<input class="uni-input train-input" name="companyCode" data-key="companyCode" @input="setData" placeholder="请输入企业代码"
								 :value="formData.companyCode" />
							</view>
							<view class="uni-form-item uni-row" v-if="companyName">
								<view class="uni-title-edit with-full text-align-center">所属企业：{{companyName}} <text class="txt-gray">[{{companyStatu!=1?'审核中':''}}]</text></view>
							</view>
							<view class="uni-btn-block" v-if="companyStatu!='0'">
								<view class="btns btns-full btns-big" @click="bindCompany">绑定</view>
							</view>
						</form>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="form-box">
						<form>
							<view class="edit-block">
								<view class="edit-block-title">
									<view class="block-title">基本信息修改</view>
								</view>
								<view class="uni-form-item uni-row">
									<view class="uni-title-edit">手机号：</view>
									<input class="uni-input train-input" name="phone" data-key="phone" @input="setData" placeholder="请输入手机号"
									 :value="formData.phone" />
								</view>
								<block v-if="oldPhone!=formData.phone">
									<view class="uni-form-item uni-row">
										<view class="uni-title-edit">验证码：</view>
										<view class="uni-form-item uni-form-item-edit flex-between uni-row ">
											<view class="input-block">
												<input class="uni-input train-input" name="code" data-key="code" @input="setData" placeholder="手机号验证码" />
											</view>
											<view class="get-code get-code-edit" :class="btnLoading" @click="getCode">{{getCodeTxt}}</view>
										</view>
									</view>
								</block>
								<view class="uni-form-item uni-row">
									<view class="uni-title-edit">姓名：</view>
									<input class="uni-input train-input" name="name" data-key="name" @input="setData" placeholder="请输入真实姓名" :value="formData.name" />
								</view>
							</view>
							<view class="edit-block">
								<view class="edit-block-title">
									<view class="block-title">密码修改</view>
									<view class="block-edit" @click="blockShow('password')">
										<view class="edit-name">编辑</view>
										<uni-icon type="bianji" :size="18" color="#008CEE"></uni-icon>
									</view>
								</view>
								<block v-if="editBlock==='password'">
									<view class="uni-form-item uni-row">
										<view class="uni-title-edit">新密码：</view>
										<input class="uni-input train-input" password name="password" data-key="password" @input="setData"
										 placeholder="新密码" />
									</view>
									<view class="uni-form-item uni-row">
										<view class="uni-title-edit">确认密码：</view>
										<input class="uni-input train-input" password name="cfn_password" data-key="cfn_password" @input="setData"
										 placeholder="再次确认" />
									</view>
								</block>
							</view>
							<view class="uni-btn-block">
								<view class="btns btns-full btns-big" :class="loading?'btns-loading':''" @click="getDatas('basicInfo')">确认修改</view>
							</view>
						</form>
					</view>
				</view>
			</view>
		</view>
		<!-- <fix-button btnType="fbtn-full"></fix-button> -->
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				loading: false,
				current: 0,
				btnLoading: "",
				seconds: 60,
				getCodeTxt: "获取验证码",
				segmented: [
					'绑定公司',
					'修改个人信息'
				],
				editBlock: "basicInfo",
				companyName: "",
				companyStatu: "", //estatus 3种: 0 待审 1 过了 2打回
				oldPhone: "",
				formData: {
					"phone": "",
					"code": "",
					"name": "",
					"password": "",
					"cfn_password": "",
					"companyCode": ""
				}
			}
		},
		onLoad(e) {
			var that = this;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			let _userInfo = that.$store.state.user.userInfo;
			that.setPageData(_userInfo);
		},
		components: {
			fixButton,
			uniSegmentedControl
		},
		methods: {
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			blockShow(type) {
				this.editBlock = type;
			},
			bindCompany() {
				var that = this;
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let _formData = that.formData;
				//let _formData = e.detail.value;
				console.log(_formData);
				var rule = [{
					name: "companyCode",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "企业代码不能为空"
				}];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					uni.showModal({
						title: "确认绑定公司",
						content: `公司代码: ${_formData.companyCode}`,
						confirmText: "确定",
						cancelText: "取消",
						success: function(res) {
							if (res.confirm) {
								that.getDatas('bindCompany');
							} else if (res.cancel) {}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					that.loading = false
				}
			},
			getDatas(type) {
				var that = this;
				if (that.loading == true) {
					return
				}
				if (type == 'basicInfo') {
					var _formData = that.formData;
					var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入真实姓名"
					}];
					if (that.oldPhone != _formData.phone) {
						let __rule1 = {
							name: "phone",
							checkType: "phoneno",
							checkRule: "",
							errorMsg: "请填写正确的手机号"
						};
						let __rule2 = {
							name: "code",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "验证码不能为空"
						};
						rule.push(__rule1)
						rule.push(__rule2)
					}
					if (_formData.password != "") {
						let __rule = {
							name: "cfn_password",
							checkType: "same",
							checkRule: _formData.password,
							errorMsg: "密码不一致，请确认"
						}
						rule.push(__rule)
					}
					var checkRes = graceChecker.check(_formData, rule);
					if (!checkRes) {
						uni.showToast({
							title: graceChecker.error,
							icon: "none"
						});
						that.loading = false
						return
					}
				}
				that.loading = true
				let data = {
					"inter": type == 'bindCompany' ? 'enterprise' : '',
					"method": "POST",
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				if (type == 'bindCompany') {
					data["data"] = {
						"code": that.formData.companyCode
					}
				} else {
					data["data"] = {
						"name": _formData.name,
						"phone": _formData.phone,
						"code": _formData.code,
						"password": _formData.password,
						"cfn_password": _formData.cfn_password,
					}
				}
				console.log(data)
				data["fun"] = function(res) {
					that.loading = false;
					if (res.success) {
						if (type == 'bindCompany') {
							var company_res = res.data;
							console.log(company_res);
							uni.getStorage({
								key: "user",
								success: function(ress) {
									let ress_data = ress.data;
									ress_data["userInfo"]["company"] = {
										"eName": company_res.eName,
										"ePhone": company_res.ePhone,
										"eStatus": company_res.eStatus,

									};
									that.setPageData(ress_data["userInfo"])
									uni.setStorage({
										key: "user",
										data: ress_data
									});
								},
								fail() {}
							})
							uni.showModal({
								title: "申请成功",
								content: "等待管理员审核",
								confirmText: "确定"
							})
						} else {
							uni.showToast({
								title: "信息修改成功",
								icon: "success",
								duration: 1500
							})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 1500
						})
					}
				}
				that.$store.dispatch("getData", data)
			},
			setPageData(_userInfo) {
				var that = this;
				that.companyName = _userInfo.company ? _userInfo.company.eName : "";
				that.companyStatu = _userInfo.company ? _userInfo.company.eStatus : "";
				that.formData.companyCode = _userInfo.company && _userInfo.company.code ? _userInfo.company.code : "";
				that.formData.phone = _userInfo.phone;
				that.oldPhone = _userInfo.phone;
				that.formData.name = _userInfo.name;
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
					let data_les = {
						"inter": "sendSms",
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
			setData(e) {
				var that = this;
				that.formData[`${e.currentTarget.dataset.key}`] = e.detail.value;
				if (e.currentTarget.dataset.key === 'phone') {
					if (e.detail.value == that.oldPhone) {
						that.formData.code = "";
					}
				}
			}
		}
	}
</script>

<style>
	@import "./center.css";

	.edit-segment {
		margin-bottom: 40upx;
		line-height: 2;
		font-size: 36upx;
		border-bottom: 1px solid #D1D1D1;
	}

	.uni-form-item {
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.uni-title-edit {
		font-size: 32upx;
		width: 25%;
	}

	.with-full {
		width: 100%;
	}

	.text-align-center {
		text-align: center;
	}

	.uni-form-item-edit {
		width: auto;
		overflow: hidden;
	}

	.get-code-edit {
		margin-left: 10upx;
		height: 100%;
		padding: 12upx 0;
	}

	.edit-block {
		padding-bottom: 25upx;
	}

	.edit-block-title {
		display: flex;
		color: #333;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		border-bottom: 1px solid #D1D1D1;
		padding-bottom: 15upx;
		margin-bottom: 15upx;
	}

	.block-title {
		font-size: 32upx;
	}

	.block-edit {
		display: flex;
		font-size: 26upx;
		color: #929292;
		align-content: center;
		align-items: center;
	}

	.edit-name {
		font-size: 28upx;
		padding-right: 20upx;
	}
</style>
