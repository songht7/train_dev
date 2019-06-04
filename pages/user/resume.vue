<template>
	<view class="user-center user-center-full">
		<view class="page-main">
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">基本信息</view>
					<view class="block-edit" @click="edit('basic')">
						<view class="edit-name">编辑</view>
						<uni-icon type="bianji" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-basic" v-if="basicInfo.name">
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">名字</view>
							<view class="basic-val">{{basicInfo.name}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">生日</view>
							<view class="basic-val">{{basicInfo.brithday}}</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">性别</view>
							<view class="basic-val">{{basicInfo.sex}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">学历</view>
							<view class="basic-val">{{basicInfo.education}}</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">工作年限</view>
							<view class="basic-val">{{basicInfo.age_work}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">手机</view>
							<view class="basic-val">{{basicInfo.phone}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">电子邮箱</view>
							<view class="basic-val">{{basicInfo.email}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">工作经历</view>
					<view class="block-edit" @click="edit('work')">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10 每日优鲜 质检员</view>
							<view class="work-overview">
								<view class="work-ov-li">1.负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">2.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">3.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作负责平台商家在线、</view>
								<view class="work-ov-li">4.负责平台商家在线、热线质检工作负责平台商家在线</view>
							</view>
							<view class="block-edit work-edit" @click="edit('work',index)">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">教育经历</view>
					<view class="block-edit" @click="edit('edu')">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10</view>
							<view class="work-val">上海大学 本科 商务英语</view>
							<view class="block-edit work-edit" @click="edit('edu',index)">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">项目经历</view>
					<view class="block-edit" @click="edit('item')">
						<view class="edit-name">添加</view>
						<uni-icon type="tianjia" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<block v-for="(item, index) in 2">
						<view class="work-row">
							<view class="work-title">2012.10 - 2015.10 每日优鲜 质检员</view>
							<view class="work-overview">
								<view class="work-ov-li">1.负责平台商家在线、热线质检工作</view>
								<view class="work-ov-li">2.负责平台商家在线、热线质检工作负责平台商家在线、热线质检工作</view>
							</view>
							<view class="block-edit work-edit" @click="edit('item',index)">
								<view class="edit-name">编辑</view>
								<uni-icon type="bianji" :size="16" color="#929292"></uni-icon>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">自我描述</view>
					<view class="block-edit" @click="edit('selfdes')">
						<view class="edit-name">编辑</view>
						<uni-icon type="bianji" :size="16" color="#008CEE"></uni-icon>
					</view>
				</view>
				<view class="resume-work">
					<view class="self-des">
						本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。本人性格开朗、稳住、有活力，具有较强的无私奉献精神。
					</view>
				</view>
			</view>
		</view>
		<uni-popup :show="poptype === 'editBox'" position="middle" mode="posfixed" width="80" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<block v-if="editBlock=='basic'">
					<view class="edit-block edit-basic">
						<view class="resume-head">
							<view class="block-title">修改信息</view>
							<view class="block-edit" @click="getData('PUT')">
								<view class="edit-name">完成</view>
							</view>
						</view>
						<view class="resume-basic">
							<view class="basic-row">
								<view class="basic-block">
									<view class="basic-title">名字</view>
									<view class="basic-val">
										<input name="name" data-key="name" @input="setData" placeholder="请输入" />
									</view>
								</view>
							</view>
							<view class="basic-row">
								<view class="basic-block">
									<view class="basic-title">生日</view>
									<view class="basic-val">
										<picker mode="date" @change="pickerDate" name="Birthday" :value="date" :start="startDate" :end="endDate">
											<view>{{date}}</view>
										</picker>
									</view>
								</view>
								<view class="basic-block">
									<view class="basic-title">性别</view>
									<view class="basic-val">
										<picker name="Gender" @change="pickerGender" :value="genderIndex" :range="gender">
											<view>{{gender[genderIndex]}}</view>
										</picker>
									</view>
								</view>
							</view>
							<view class="basic-row">
								<view class="basic-block">
									<view class="basic-title">学历</view>
									<view class="basic-val">
										<picker name="Education" @change="pickerEdu" :value="eduIndex" :range="education">
											<view>{{education[eduIndex]}}</view>
										</picker>
									</view>
								</view>
								<view class="basic-block">
									<view class="basic-title">工作年限</view>
									<view class="basic-val">
										<picker name="WorkAge" @change="pickerWork" :value="workIndex" :range="workAge">
											<view>{{workAge[workIndex]}}</view>
										</picker>
									</view>
								</view>
							</view>
							<view class="basic-row">
								<view class="basic-block">
									<view class="basic-title">手机</view>
									<view class="basic-val">
										<input name="phone" type="number" data-key="phone" @input="setData" placeholder="请输入" value="" />
									</view>
								</view>
							</view>
							<view class="basic-row">
								<view class="basic-block">
									<view class="basic-title">电子邮箱</view>
									<view class="basic-val">
										<input name="email" data-key="email" @input="setData" placeholder="请输入" value="" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<block v-if="editBlock=='work'">
					<view class="edit-block edit-work">
						工作经历
					</view>
				</block>
				<block v-if="editBlock=='edu'">
					<view class="edit-block edit-edu">
						教育经历
					</view>
				</block>
				<block v-if="editBlock=='item'">
					<view class="edit-block edit-item">
						项目经历
					</view>
				</block>
				<block v-if="editBlock=='selfdes'">
					<view class="edit-block edit-selfdes">
						自我评价
					</view>
				</block>
			</view>
		</uni-popup>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	var graceChecker = require("../../common/graceChecker.js");
	import fixButton from '@/components/fix-button.vue'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		data() {
			return {
				UserId: "",
				__token: "",
				poptype: "",
				editBlock: "",
				gender: ['男', '女'],
				genderIndex: 0,
				education: ['初中', '高中', '大专', '本科', '本科以上'],
				eduIndex: 3,
				workAge: ['3年以下', '4年', '5年', '6年', '7年', '8年以上'],
				workIndex: 2,
				date: this.getDate({
					format: true
				}),
				basicInfo: {
					"name": "",
					"brithday": "",
					"sex": "",
					"education": "",
					"age_work": "",
					"phone": "",
					"email": ""
				},
				school: [],
				company: [],
				project: [],
				about_self: ""
			}
		},
		components: {
			fixButton,
			uniPopup
		},
		onLoad() {},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user');
			that.$store.dispatch("cheack_page", 2)
			that.UserId = that.$store.state.user.userInfo.id || '';
			that.__token = that.$store.state.user.token;
			if (!that.__token) {
				uni.redirectTo({
					url: "/pages/index/index"
				})
			}
			that.getData("GET")
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getData(methodType) {
				var that = this;
				let _data = {
					"inter": "resume",
					"method": methodType,
					"header": {
						"token": that.__token
					}
				}
				if (methodType == "PUT") {
					_data["header"]["Content-Type"] = "application/json";
					_data["data"] = {
						"name": that.basicInfo.name,
						"brithday": that.basicInfo.brithday,
						"sex": that.basicInfo.sex,
						"education": that.basicInfo.education,
						"age_work": that.basicInfo.age_work,
						"phone": that.basicInfo.phone,
						"email": that.basicInfo.email,
						"about_self": that.about_self,
						"school": that.school,
						"company": that.company,
						"project": that.project
					};
				}
				_data["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						if (methodType == "GET") {
							var _info = res.data.info;
							if (_info) {
								that.basicInfo = {
									"name": _info.name,
									"brithday": _info.brithday,
									"sex": _info.sex,
									"education": _info.education,
									"age_work": _info.age_work,
									"phone": _info.phone,
									"email": _info.email
								};
								that.school = _info.school;
								that.company = _info.company;
								that.project = _info.project;
								that.about_self = _info.about_self;
							}
						} else {

						}
					}
				}
				that.$store.dispatch("getData", _data)
			},
			edit(type) {
				var that = this;
				that.poptype = "editBox";
				that.editBlock = type;
				console.log(that.editBlock)
			},
			setData(e) {
				var that = this;
				that.basicInfo[`${e.currentTarget.dataset.key}`] = e.detail.value;
			},
			togglePopup(type) {
				this.poptype = type;
			},
			pickerGender(e) {
				var that = this;
				var key = e.target.value;
				that.genderIndex = key;
				that.basicInfo.sex = that.gender[key]
			},
			pickerEdu(e) {
				var that = this;
				var key = e.target.value;
				that.eduIndex = key;
				that.basicInfo.education = that.education[key]
			},
			pickerWork(e) {
				var that = this;
				var key = e.target.value;
				that.workIndex = key;
				that.basicInfo.age_work = that.workAge[key]
			},
			pickerDate(e) {
				var that = this;
				that.date = e.target.value
				that.basicInfo.brithday = e.target.value
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	@import "./center.css";

	.resume-head {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		padding-bottom: 15upx;
	}

	.block-title {
		font-weight: 600;
		font-size: 34upx;
	}

	.block-edit {
		display: flex;
		font-size: 26upx;
		color: #929292;
		align-content: center;
		align-items: center;
	}

	.edit-name {
		padding-right: 10upx;
	}

	.basic-row {
		display: flex;
		justify-content: space-between;
		padding-bottom: 10upx;
	}

	.basic-block {
		width: 50%;
	}

	.basic-title {
		font-size: 26upx;
		color: #929292;
	}

	.basic-val {
		font-size: 32upx;
		color: #222222;
	}

	.work-row {
		padding-bottom: 15upx;
		border-bottom: 2upx solid #E0E0E0;
		margin-bottom: 15upx;
	}

	.work-row:last-child {
		border-bottom: none;
		margin-bottom: 0
	}

	.work-title {
		color: #008CEE;
		font-size: 32upx;
		padding-bottom: 10upx;
		padding-left: 40upx;
		position: relative;
	}

	.work-title::before {
		content: "";
		width: 18upx;
		height: 18upx;
		border: 1px solid #E0E0E0;
		border-radius: 50%;
		position: absolute;
		top: 25%;
		left: 0;
	}

	.work-val {
		color: #008CEE;
		font-size: 32upx;
		padding-left: 40upx;
	}

	.work-overview {
		padding-left: 40upx;
	}

	.work-ov-li {
		font-size: 26upx;
		color: #22222;
		line-height: 1.4;
		padding-bottom: 5upx;
	}

	.work-edit {
		padding: 20upx 0 0 40upx;
	}

	.self-des {
		line-height: 1.4;
		color: #222;
		font-size: 26upx;
	}
</style>
