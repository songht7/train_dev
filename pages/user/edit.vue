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
							<view class="uni-form-item uni-row" v-if="companyStatu==''||companyStatu=='2'">
								<view class="uni-title-edit">企业代码：</view>
								<input class="uni-input train-input" name="companyCode" data-key="companyCode" @input="setData" placeholder="请输入企业代码"
								 :value="formData.companyCode" />
							</view>
							<view class="uni-form-item uni-column" v-if="companyName">
								<view class="uni-title-edit with-full " :class="companyStatu=='0'?'text-align-center':''">所属企业：{{companyName}}
									<text class="txt-gray" v-if="companyStatu!='1'">[{{companyStatu=='0'?'审核中':'审核未通过'}}]</text></view>
							</view>
							<view class="uni-btn-block">
								<view class="btns" v-if="companyName" :class="companyStatu=='0'?'btns-big':''" @click="$store.dispatch('makePhoneCall',companyPhone)">联系企业</text></view>
								<view class="btns btns-full" :class="companyName==''?'btns-big':''" v-if="companyStatu!='0'" @click="bindCompany(companyStatu=='1'?'unbind':'')">{{companyStatu!="1"?"绑定":"解绑"}}</view>
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
									<!-- https://ext.dcloud.net.cn/plugin?id=63#detail -->
									<view class="uni-title-edit">头像：</view>
									<view class="uni-uploader">
										<sunui-upimg-tencent :upImgConfig="upImgCos" @onUpImg="upCosData" @onImgDel="delImgInfo" ref="uImage"></sunui-upimg-tencent>
										<!-- <button type="primary" @tap="getUpImgInfoCos">获取上传Cos图片信息</button>
										<button type="primary" @tap="uImageTap">手动上传图片</button>
										<view class="uni-uploader__files">
											<block v-for="(image,index) in imageList" :key="index">
												<view class="uni-uploader__file">
													<image class="uni-uploader__img" :src="image.tempFilePaths?image.tempFilePaths:sourceUrl+image" :data-src="image"
													 @tap="chooseImage"></image>
													<progress v-show="progress!=100&&image.tempFilePaths" :percent="progress" active stroke-width="2"></progress>
												</view>
											</block>
											<view class="uni-uploader__input-box" v-show="imageList.length<=0">
												<view class="uni-uploader__input" @tap="chooseImage"></view>
											</view>
										</view> -->
									</view>
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
										<view class="uni-title-edit">原始密码：</view>
										<input class="uni-input train-input" password name="password" data-key="password" @input="setData"
										 placeholder="原始密码" />
									</view>
									<view class="uni-form-item uni-row">
										<view class="uni-title-edit">新密码：</view>
										<input class="uni-input train-input" password name="new_password" data-key="new_password" @input="setData"
										 placeholder="新密码" />
									</view>
									<view class="uni-form-item uni-row">
										<view class="uni-title-edit">确认密码：</view>
										<input class="uni-input train-input" password name="new_password_cfn" data-key="new_password_cfn" @input="setData"
										 placeholder="确认新密码" />
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
	import sunuiUpimgTencent from '@/components/sunui-upimg/sunui-upimg-tencent.vue'
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
					'绑定企业',
					'修改个人信息'
				],
				editBlock: "basicInfo",
				companyName: "",
				companyPhone: "",
				companyStatu: "", //estatus 3种: 0 待审 1 过了 2打回
				imageList: [],
				progress: "0",
				oldPhone: "",
				formData: {
					"photo": "",
					"phone": "",
					"code": "",
					"name": "",
					"password": "",
					"new_password": "",
					"new_password_cfn": "",
					"companyCode": ""
				},
				picture_list: [],
				cosFlag: true,
				cosArr: [],
				upImgCos: {
					cosConfig: {
						Bucket: 'plbs-test-1257286922',
						Region: 'ap-shanghai',
						SecretId: 'AKIDujJnIXMBSeeOuVMVt0sa2Jh5A90rcJoh',
						SecretKey: 'tDI8jS2VWaXPDwUryoGblz2Z8B1k1QtF'
					},
					// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
					notli: false,
					// 图片数量
					count: 1,
					// 上传图片背景修改 
					upBgColor: '#E8A400',
					// 上传icon图标颜色修改(仅限于iconfont)
					upIconColor: '#eee',
					// 上传svg图标名称
					upSvgIconName: 'icon-certificate',
					//是否压缩上传照片(仅小程序生效)
					sizeType: true,
					//相机来源(相机->camera,相册->album,两者都有->all,默认all)
					sourceType: "all",
					path: `user_path/user_${this.$store.state.user.userInfo.id}/`,
					photoType:"portrait-"
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
			that.imageList = _userInfo.photo ? [`${_userInfo.photo}`] : [];
			that.$store.state.portrait = _userInfo.photo;
			that.setPageData(_userInfo);
		},
		components: {
			fixButton,
			uniSegmentedControl,
			sunuiUpimgTencent
		},
		methods: {
			// 手动上传图片(适用于表单等上传) -2019/05/10增加
			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgCos);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e);
			},
			// 腾讯云
			async upCosData(e) {
				if (this.cosFlag) {
					this.cosArr = await e;
					// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
					if (this.cosArr.length == this.upImgCos.cosConfig.count) {
						uni.showToast({
							title: `上传成功`,
							icon: 'none'
						});
					}
				}
				this.cosFlag = false;

			},
			// 获取上传图片腾讯云
			async getUpImgInfoCos() {
				let arrImg = [];
				for (let i = 0, len = this.cosArr.length; i < len; i++) {
					try {
						if (this.cosArr[i].path_server != "") {
							await arrImg.push(this.cosArr[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				console.log('腾讯云转成一维数组:', arrImg.join().split(','));
			},
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			blockShow(type) {
				this.editBlock = type;
			},
			bindCompany(type) {
				console.log(type);
				var that = this;
				if (type === 'unbind') {
					that.getDatas(type);
					return
				}
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
						title: "确认绑定企业",
						content: `企业代码: ${_formData.companyCode}`,
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
					if (_formData.new_password != "" || _formData.password != "") {
						let __rule1 = {
							name: "password",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "原始密码不能为空"
						};
						let __rule2 = {
							name: "new_password",
							checkType: "same",
							checkRule: _formData.new_password,
							errorMsg: "新密码不能为空"
						}
						let __rule3 = {
							name: "new_password_cfn",
							checkType: "same",
							checkRule: _formData.new_password,
							errorMsg: "新密码不一致，请确认"
						}
						rule.push(__rule1)
						rule.push(__rule2)
						rule.push(__rule3)
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
					"inter": type == 'bindCompany' || type == 'unbind' ? 'enterprise' : 'editInfo',
					"method": type == 'bindCompany' || type == 'unbind' ? 'POST' : 'PUT',
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				if (type == 'bindCompany') {
					data["data"] = {
						"code": that.formData.companyCode
					}
				} else if (type == 'basicInfo') {
					data["data"] = {
						"photo": that.$store.state.portrait || _formData.photo,
						"name": _formData.name,
					}
					if (that.oldPhone != _formData.phone) {
						data["data"]["phone"] = _formData.phone;
						data["data"]["code"] = _formData.code;
					}
					if (_formData.new_password) {
						data["data"]["password"] = _formData.password;
						data["data"]["new_password"] = _formData.new_password;
						data["data"]["new_password_cfn"] = _formData.new_password_cfn;
					}
				} else {
					/*unbind*/
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
									ress_data["userInfo"]["eName"] = company_res.eName;
									ress_data["userInfo"]["ePhone"] = company_res.ePhone;
									ress_data["userInfo"]["eStatus"] = company_res.eStatus;
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
								showCancel: false,
								confirmText: "确定"
							})
						} else if (type == 'basicInfo') {
							var user_res = res.data;
							console.log(user_res);
							uni.getStorage({
								key: "user",
								success: function(ress) {
									let ress_data = ress.data;
									ress_data["userInfo"]["photo"] = that.$store.state.portrait || ress_data["userInfo"]["photo"];
									ress_data["userInfo"]["phone"] = _formData.phone || ress_data["userInfo"]["phone"];
									ress_data["userInfo"]["name"] = _formData.name || ress_data["userInfo"]["name"];
									//ress_data["userInfo"]["photo"] = _formData.photo || ress_data["userInfo"]["photo"];
									that.setPageData(ress_data["userInfo"])
									uni.setStorage({
										key: "user",
										data: ress_data
									});
								},
								fail() {}
							})
							uni.showToast({
								title: "信息修改成功",
								icon: "success",
								duration: 1500
							});
							setTimeout(() => {
								uni.redirectTo({
									url: "/pages/user/index"
								});
							}, 1500);
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
				that.companyName = _userInfo.eName ? _userInfo.eName : "";
				that.companyStatu = _userInfo.eStatus ? _userInfo.eStatus : "";
				that.companyPhone = _userInfo.ePhone ? _userInfo.ePhone : "";
				that.formData.companyCode = _userInfo.code ? _userInfo.code : "";
				that.formData.phone = _userInfo.phone;
				that.oldPhone = _userInfo.phone;
				that.formData.name = _userInfo.name;
				that.formData.photo = _userInfo.photo;
			},
			chooseImage: async function() {
				var that = this;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res)
						that.imageList = [{
							"tempFilePaths": res.tempFilePaths[0]
						}];
						var _res = res.tempFiles;
						that.uploadFile(res.tempFiles[0])
					}
				})
			},
			uploadFile(file) {
				var that = this;
				var _interface = that.$store.state.interface;
				var _url = _interface.apiurl + _interface.addr.photo;
				console.log(_url);
				const upload_task = uni.uploadFile({
					url: _interface.apiurl + _interface.addr.photo,
					filePath: file['path'],
					name: 'photo',
					"header": {
						"token": that.$store.state.user.token || ""
					},
					formData: {},
					async success(res) {
						//console.log(res);
						if (res.statusCode == 200) {
							let _data = JSON.parse(res.data);
							console.log(_data)
							if (_data.success) {
								that.formData.photo = _data.data;
								uni.getStorage({
									key: "user",
									success: function(ress) {
										let ress_data = ress.data;
										ress_data["userInfo"]["photo"] = _data.data;
										that.setPageData(ress_data["userInfo"])
										uni.setStorage({
											key: "user",
											data: ress_data
										});
									},
									fail() {}
								})
							} else {
								uni.showLoading({
									title: `上传失败!`
								});
								that.imageList = [];
								setTimeout(() => {
									uni.hideLoading();
								}, 2000)
							}
							uni.hideLoading();
						}
					},
					async fail(err) {
						uni.showLoading({
							title: `上传失败!`
						});
						that.imageList = [];
						setTimeout(() => {
							uni.hideLoading();
						}, 2000)
					}
				});
				upload_task.onProgressUpdate(async (res) => {
					//console.log(res);
					for (let i = 0, len = that.imageList.length; i < len; i++) {
						this.progress = res.progress;
					}
				});
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
