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
					<block v-if="company&&obj.company" v-for="(obj, index) in company">
						<view class="work-row">
							<view class="work-title">{{obj.start_time}} - {{obj.end_time}} {{obj.company}} {{obj.job}}</view>
							<view class="work-overview">
								<view class="work-ov-li">
									<rich-text class="course-detail" :nodes="obj.infomation"></rich-text>
								</view>
							</view>
							<view class="block-edit work-edit" @click="edit('work',index+1)">
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
							<view class="block-edit work-edit" @click="edit('edu',index+1)">
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
				<user-resume :editBlock="editBlock" :editKey="editKey" :basicInfo="basicInfo" :school="school" :company="company"
				 :tempCompany="tempCompany" :project="project" :about_self="about_self" @saveResume="saveResume('PUT')" @dltResume="dltResume('PUT')"></user-resume>
			</view>
		</uni-popup>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	var graceChecker = require("../../common/graceChecker.js");
	import fixButton from '@/components/fix-button.vue'
	import uniPopup from '@/components/uni-popup.vue'
	import userResume from '@/components/user-resume.vue'
	export default {
		data() {
			return {
				UserId: "",
				__token: "",
				poptype: "",
				editBlock: "",
				editKey: -1,
				isDelete: false,
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
				about_self: "",
				tempCompany: {
					"id": "",
					"company": "",
					"job": "",
					"start_time": "",
					"end_time": "",
					"infomation": ""
				}
			}
		},
		components: {
			fixButton,
			uniPopup,
			userResume
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
		computed: {},
		methods: {
			saveResume(methodType) {
				var that = this;
				var type = "add";
				if (that.editKey > -1) {
					type = "edit";
				}
				switch (type) {
					case "add":
						switch (that.editBlock) {
							case 'work':
								that.company.push(that.tempCompany);
								break;
							default:
								break;
						}
						break;
					case "edit":
						switch (that.editBlock) {
							case 'work':
								that.company[that.editKey - 1] = that.tempCompany;
								break;
							default:
								break;
						}
						break;
					default:
						break;
				}
				that.getData(methodType);
			},
			dltResume(methodType) {
				var that = this;
				that.isDelete = true;
				that.getData(methodType);
			},
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
					if (that.isDelete) {
						switch (that.editBlock) {
							case 'work':
								that.company[that.editKey - 1]["delete"] = 1;
								break;
							default:
								break;
						}
					}
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
					console.log(_data)
					//return
				}
				_data["fun"] = function(res) {
					if (methodType == "GET") {
						if (res.success) {
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
								that.school = _info.school ? _info.school : [];
								if (_info.company) {
									_info.company.map((val, i, arr) => {
										val['start_time'] = val['start_time'].split(" ")[0]
										val['end_time'] = val['end_time'].split(" ")[0]
									})
								}
								that.company = _info.company || [];
								that.project = _info.project ? _info.project : [];
								that.about_self = _info.about_self;
							}
						} else {
							uni.showToast({
								title: "获取简历失败",
								icon: "none",
								complete() {
									setTimeout(() => {
										that.poptype = "";
									}, 1500)
								}
							})
						}
					} else if (methodType == "PUT") {
						var title = res.success ? "编辑成功" : "编辑失败，请重试",
							icon = res.success ? "success" : "none";
						if (that.isDelete) {
							title = "删除成功";
							that.company.splice(that.editKey - 1, 1);
						}
						uni.showToast({
							title: title,
							icon: icon,
							complete() {
								setTimeout(() => {
									that.poptype = "";
								}, 1500)
							}
						})
					}
					uni.stopPullDownRefresh()
					that.isDelete = false;
				}
				that.$store.dispatch("getData", _data)
			},
			edit(type, key) {
				var that = this;
				that.poptype = "editBox";
				that.editBlock = type;
				that.editKey = key ? key : -1;
				if (key) {
					switch (that.editBlock) {
						case 'work':
							that.tempCompany = that.company[key - 1]
							break;
						default:
							break;
					}
				}
				console.log(that.editBlock, key)
			},
			togglePopup(type) {
				var that = this;
				that.poptype = type;
				that.editKey = -1;
				switch (that.editBlock) {
					case 'work':
						that.tempCompany = {
							"id": "",
							"company": "",
							"job": "",
							"start_time": "",
							"end_time": "",
							"infomation": ""
						}
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	@import "./center.css";
</style>
