<template>
	<view class="user-center user-center-full">
		<view class="page-main">
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">基本信息</view>
					<view class="block-edit" @click="edit('basic')">
						<view class="edit-name">编辑</view>
						<uni-icons type="bianji" size="16" color="#008CEE"></uni-icons>
					</view>
				</view>
				<view class="resume-basic" v-if="datas.name">
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">名字</view>
							<view class="basic-val">{{datas.name}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">生日</view>
							<view class="basic-val">{{datas.brithday}}</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">性别</view>
							<view class="basic-val">{{datas.sex}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">学历</view>
							<view class="basic-val">{{datas.education}}</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">工作年限</view>
							<view class="basic-val">{{datas.age_work}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">手机</view>
							<view class="basic-val">{{datas.phone}}</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">电子邮箱</view>
							<view class="basic-val">{{datas.email}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">工作经历</view>
					<view class="block-edit" @click="edit('company')">
						<view class="edit-name">添加</view>
						<uni-icons type="tianjia" size="16" color="#008CEE"></uni-icons>
					</view>
				</view>
				<view class="resume-work">
					<block v-if="datas.company&&obj.id" v-for="(obj, index) in datas.company" v-bind:key="obj.id">
						<view class="work-row">
							<view class="work-title">{{obj.start_time}} - {{obj.end_time}} {{obj.company}} {{obj.job}}</view>
							<view class="work-overview">
								<view class="work-ov-li">
									<rich-text class="course-detail" :nodes="obj.infomation"></rich-text>
								</view>
							</view>
							<view class="block-edit work-edit" @click="edit('company',index)">
								<view class="edit-name">编辑</view>
								<uni-icons type="bianji" size="16" color="#929292"></uni-icons>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">教育经历</view>
					<view class="block-edit" @click="edit('school')">
						<view class="edit-name">添加</view>
						<uni-icons type="tianjia" :size="16" color="#008CEE"></uni-icons>
					</view>
				</view>
				<view class="resume-work">
					<block v-if="datas.school&&obj.id" v-for="(obj, index) in datas.school" v-bind:key="obj.id">
						<view class="work-row">
							<view class="work-title">{{obj.start_time}} - {{obj.end_time}}</view>
							<view class="work-val">{{obj.school}} {{obj.profession}}</view>
							<view class="block-edit work-edit" @click="edit('school',index)">
								<view class="edit-name">编辑</view>
								<uni-icons type="bianji" :size="16" color="#929292"></uni-icons>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">项目经历</view>
					<view class="block-edit" @click="edit('project')">
						<view class="edit-name">添加</view>
						<uni-icons type="tianjia" size="16" color="#008CEE"></uni-icons>
					</view>
				</view>
				<view class="resume-work">
					<block v-if="datas.project&&obj.id" v-for="(obj, index) in datas.project" v-bind:key="obj.id">
						<view class="work-row">
							<view class="work-title">{{obj.start_time}} - {{obj.end_time}} {{obj.name}}</view>
							<view class="work-overview">
								<view class="work-ov-li">
									<rich-text class="course-detail" :nodes="obj.overview"></rich-text>
								</view>
							</view>
							<view class="block-edit work-edit" @click="edit('project',index)">
								<view class="edit-name">编辑</view>
								<uni-icons type="bianji" size="16" color="#929292"></uni-icons>
							</view>
						</view>
					</block>
				</view>
			</view>
			<view class="border-block">
				<view class="resume-head">
					<view class="block-title">自我描述</view>
					<view class="block-edit" @click="edit('about_self')">
						<view class="edit-name">编辑</view>
						<uni-icons type="bianji" size="16" color="#008CEE"></uni-icons>
					</view>
				</view>
				<view class="resume-work">
					<view class="self-des">
						<textarea :value="datas.about_self||''" disabled />
						</view>
				</view>
			</view>
		</view>
		<uni-popup :show="poptype === 'editBox'" position="middle" mode="posfixed" width="80" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<user-resume :editBlock="editBlock" :editKey="editKey" :temp="temp" @saveResume="saveResume" @dltResume="dltResume"></user-resume>
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
				datas: [],
				basic: {},
				temp: {},
				saveData: []
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
			that.getData()
		},
		computed: {},
		onPullDownRefresh() {
			var that = this;
			that.getData();
		},
		methods: {
			saveResume() {
				var that = this;
				switch (that.editBlock) {
					case 'basic':
						//that.saveData = that.temp;
						that.saveData = that.$store.state.resumeTemp;
						break;
					case 'about_self':
						//that.saveData = that.temp;
						that.saveData = that.$store.state.resumeTemp;
						break;
					case 'company':
						var _basic = that.basic;
						if (that.isDelete) {
							//that.temp["delete"] = 1;
							that.$store.state.resumeTemp["delete"] = 1;
						}
						//_basic["company"] = [that.temp];
						_basic["company"] = [that.$store.state.resumeTemp];
						that.saveData = _basic;
						break;
					case 'school':
						var _basic = that.basic;
						if (that.isDelete) {
							//that.temp["delete"] = 1;
							that.$store.state.resumeTemp["delete"] = 1;
						}
						//_basic["school"] = [that.temp];
						_basic["school"] = [that.$store.state.resumeTemp];
						that.saveData = _basic;
						break;
					case 'project':
						var _basic = that.basic;
						if (that.isDelete) {
							//that.temp["delete"] = 1;
							that.$store.state.resumeTemp["delete"] = 1;
						}
						//_basic["project"] = [that.temp];
						_basic["project"] = [that.$store.state.resumeTemp];
						that.saveData = _basic;
						break;
					default:
						break;
				}
				console.log("saveData:", that.saveData)
				that.saveDatas();
			},
			dltResume() {
				var that = this;
				that.isDelete = true;
				that.saveResume();
			},
			getData() {
				var that = this;
				let _data = {
					"inter": "resume",
					"header": {
						"token": that.__token
					}
				}
				_data["fun"] = function(res) {
					if (res.success) {
						var _info = res.data.info;
						if (_info) {
							if (_info.company) {
								_info.company.map((val, i, arr) => {
									val['start_time'] = val['start_time'].split(" ")[0]
									val['end_time'] = val['end_time'].split(" ")[0]
								})
							}
							if (_info.school) {
								_info.school.map((val, i, arr) => {
									val['start_time'] = val['start_time'].split(" ")[0]
									val['end_time'] = val['end_time'].split(" ")[0]
								})
							}
							if (_info.project) {
								_info.project.map((val, i, arr) => {
									val['start_time'] = val['start_time'].split(" ")[0]
									val['end_time'] = val['end_time'].split(" ")[0]
								})
							}
							that.basic = {
								"name": _info.name,
								"brithday": _info.brithday,
								"sex": _info.sex,
								"education": _info.education,
								"age_work": _info.age_work,
								"phone": _info.phone,
								"email": _info.email,
								"about_self": _info.about_self
							}
							that.datas = _info;
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
					uni.stopPullDownRefresh()
				}
				that.$store.dispatch("getData", _data)
			},
			saveDatas() {
				var that = this;
				let _data = {
					"inter": "resume",
					"method": "PUT",
					"header": {
						"token": that.__token
					}
				}
				_data["header"]["Content-Type"] = "application/json";
				_data["data"] = that.saveData;
				console.log(_data)
				//return
				_data["fun"] = function(res) {
					var title = res.success ? "编辑成功" : "编辑失败，请重试",
						icon = res.success ? "success" : "none";
					if (that.isDelete) {
						title = "删除成功";
					}
					uni.showToast({
						title: title,
						icon: icon,
						complete() {
							setTimeout(() => {
								that.isDelete = false;
								that.saveData = [];
								that.temp = {};
								that.$store.state.resumeTemp = {};
								that.poptype = "";
							}, 1500)
						}
					})
					that.getData();
				}
				that.$store.dispatch("getData", _data)
			},
			edit(type, key) {
				var that = this;
				that.poptype = "editBox";
				that.editBlock = type;
				that.editKey = key ? key : -1;
				switch (that.editBlock) {
					case 'basic':
						that.temp = that.basic;
						that.$store.state.resumeTemp = that.basic;
						break;
					case 'about_self':
						that.temp = that.basic;
						that.$store.state.resumeTemp = that.basic;
						break;
					case 'company':
						that.temp = key != undefined && key >= 0 ? that.datas.company[key] : {};
						that.$store.state.resumeTemp = key != undefined && key >= 0 ? that.datas.company[key] : {};
						break;
					case 'school':
						that.temp = key != undefined && key >= 0 ? that.datas.school[key] : {};
						that.$store.state.resumeTemp = key != undefined && key >= 0 ? that.datas.school[key] : {};
						break;
					case 'project':
						that.temp = key != undefined && key >= 0 ? that.datas.project[key] : {};
						that.$store.state.resumeTemp = key != undefined && key >= 0 ? that.datas.project[key] : {};
						break;
					default:
						break;
				}
				console.log(that.editBlock, key)
			},
			togglePopup(type) {
				var that = this;
				that.poptype = type;
				that.editKey = -1;
				that.temp = {};
				that.$store.state.resumeTemp={};
			}
		}
	}
</script>

<style>
	@import "./center.css";
</style>
