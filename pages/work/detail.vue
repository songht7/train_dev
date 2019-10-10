<template>
	<view class="content">
		<block v-if="__token">
			<view class="pages page-main">
				<view class="work-dtl-head">
					<view class="work-head-main">
						<view class="work-head-list">
							<view class="work-block">
								<view class="work-block-title work-dtl-name">{{datas.name}} | {{datas.type}}</view>
							</view>
							<view class="work-block">
								<view class="work-require">{{datas.province?datas.province+' | ':''}}{{datas.city?datas.city+' | ':''}}{{datas.age_min}}-{{datas.age_max}}年
									| {{datas.education?datas.education:'无学历要求'}}</view>
							</view>
							<view class="work-block">
								<view class="work-salary">{{datas.salary}}</view>
							</view>
							<view class="work-block">
								<view class="work-tag-list">
									<block v-for="(t,i) in datas.tags" :key="i">
										<view class="work-tag">{{t}}</view>
									</block>
								</view>
							</view>
						</view>
						<view class="work-head-list">
							<view class="work-block">
								<view class="work-block-title">
									<uni-icons type="weizhi" size="20" color="#898989"></uni-icons>{{datas.province?datas.province+' - ':''}}{{datas.city?datas.city:''}}
								</view>
							</view>
							<view class="work-block">
								<view class="work-address">{{datas.address?datas.address:''}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="work-detail-overview">
					<view class="work-block-title title-block">岗位职责</view>
					<view class="work-content">
						<rich-text :nodes="datas.responsibilities"></rich-text>
					</view>
				</view>
				<view class="work-detail-overview">
					<view class="work-block-title title-block">任职资格</view>
					<view class="work-content">
						<rich-text :nodes="datas.qualifications"></rich-text>
					</view>
				</view>
				<fix-button>
					<!-- btnType="fbtn-full" -->
					<block v-if="datas.needExam">
						<view class="fbtns fbtns-clr-full btn-totest" @click="workExam">求职前小测试</view>
					</block>
					<block v-else>
						<view class="fbtns fbtns-clr-full btn-totest" :class="!disabled?'':'btn-disabled'" @click="showResume">{{datas.resume_article==1?'简历已投递':'发送简历'}}</view>
					</block>
				</fix-button>
			</view>
			<uni-popup :show="poptype === 'showReume'" position="middle" mode="posfixed" width="80" @hidePopup="togglePopup('')">
				<view class="train-show-modal-box">
					<user-resume :editBlock="editBlock" isSendResume="true" :temp="temp" :datas="resume_temp" @switchResume="switchResume"
					 @sendResume="sendResume"></user-resume>
				</view>
			</uni-popup>
		</block>
		<block v-else>
			<login-tip></login-tip>
			<tab-bar></tab-bar>
		</block>
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
				article_id: "",
				examination_id: "",
				__token: "",
				datas: [],
				saveData: {},
				temp: {},
				resume_temp: {},
				poptype: "",
				editBlock: "basic",
				hasResume: false,
				disabled: false
			}
		},
		onLoad(e) {
			var that = this;
			that.article_id = e.id;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token ? that.$store.state.user.token : "";
			that.getDatas();
			that.getResume();
		},
		onReady() {
			var that = this;
		},
		components: {
			fixButton,
			uniPopup,
			userResume
		},
		onPullDownRefresh() {
			var that = this;
			that.getDatas()
		},
		computed: {},
		methods: {
			getDatas() {
				var that = this;
				/*工作机会*/
				let data = {
					"inter": "support",
					"parm": `?article_id=${that.article_id}`,
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					uni.stopPullDownRefresh()
					if (res.success) {
						var _data = res.data
						_data['tags'] = _data["tag"].split("，")
						if (_data["responsibilities"]) {
							_data["responsibilities"] = _data["responsibilities"].replace(/\<img/gi,
								'<img style="max-width:100%;height:auto" ');
						}
						if (_data["qualifications"]) {
							_data["qualifications"] = _data["qualifications"].replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						}

						if (_data["examination_id"] && _data["is_pass_exam"] && _data["resume_article"] != 1) {
							_data["needExam"] = true
							that.examination_id = _data["examination_id"];
						}
						that.datas = _data;
						that.disabled = _data.resume_article ? true : false;
						uni.setNavigationBarTitle({
							title: res.data.name
						});
					}
				}
				that.$store.dispatch("getData", data)
			},
			getResume() {
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
							that.temp = _info;
							that.resume_temp = _info;
							that.hasResume = true;
						}
					} else {
						that.hasResume = false;
					}
				}
				that.$store.dispatch("getData", _data)
			},
			workExam() {
				var that = this;
				uni.navigateTo({
					url: `/pages/train/test?type=workExam&id=${that.examination_id}&pid=${that.article_id}`
				})
			},
			showResume() {
				var that = this;
				if (that.disabled) {
					return
				}
				that.poptype = "showReume";
			},
			switchResume(type) {
				var that = this;
				if (type == "next") {
					switch (that.editBlock) {
						case "basic":
							let rule = [{
									name: "name",
									checkType: "notnull",
									checkRule: "",
									errorMsg: "姓名不能为空"
								},
								{
									name: "education",
									checkType: "notnull",
									checkRule: "",
									errorMsg: "请选择学历"
								},
								{
									name: "age_work",
									checkType: "notnull",
									checkRule: "",
									errorMsg: "请选择工作年限"
								},
								{
									name: "phone",
									checkType: "phoneno",
									checkRule: "",
									errorMsg: "请填写正确的手机号"
								}
							];
							//进行表单检查
							var checkRes = graceChecker.check(that.temp, rule);
							if (checkRes) {
								that.saveData = that.temp;
								that.saveData["about_self"] = that.resume_temp && that.resume_temp.about_self ? that.resume_temp.about_self :
									'';
								//that.saveDatas(that.saveData);
							} else {
								uni.showToast({
									title: graceChecker.error,
									icon: "none"
								});
								return
							}
							that.editBlock = "company";
							that.temp = that.resume_temp && that.resume_temp.company ? that.resume_temp.company[0] : {};
							break;
						case "company":
							that.saveData["company"] = [that.temp];
							//that.saveDatas(that.saveData);
							that.temp = that.resume_temp && that.resume_temp.school ? that.resume_temp.school[0] : {};
							that.editBlock = "school";
							break;
						case "school":
							that.saveData["school"] = [that.temp];
							//that.saveDatas(that.saveData);
							that.temp = that.resume_temp && that.resume_temp.project ? that.resume_temp.project[0] : {};
							that.editBlock = "project";
							break;
						case "project":
							that.saveData["project"] = [that.temp];
							//that.saveDatas(that.saveData);
							let _as = that.resume_temp && that.resume_temp.about_self ? that.resume_temp.about_self : ''
							that.temp = {
								'about_self': _as
							}
							that.editBlock = "about_self";
							break;
						default:
							break;
					}
					console.log(that.temp)
				} else if (type == "prev") {
					switch (that.editBlock) {
						case "about_self":
							that.editBlock = "project";
							that.temp = that.resume_temp && that.resume_temp.project ? that.resume_temp.project[0] : {};
							break;
						case "project":
							that.editBlock = "school";
							that.temp = that.resume_temp && that.resume_temp.school ? that.resume_temp.school[0] : {};
							break;
						case "school":
							that.editBlock = "company";
							that.temp = that.resume_temp && that.resume_temp.company ? that.resume_temp.company[0] : {};
							break;
						case "company":
							that.editBlock = "basic";
							that.temp = that.resume_temp
							break;
						default:
							break;
					}
				}
			},
			sendResume() {
				var that = this;
				if (!that.hasResume) {
					uni.showToast({
						title: "请完善简历信息",
						icon: "none"
					})
					return
				}
				that.saveData["about_self"] = that.temp.about_self;
				that.saveDatas(that.saveData);
				/*发送简历*/
				let data = {
					"inter": "resume",
					"method": "POST",
					"data": {
						"article_id": that.article_id
					},
					"header": {
						"token": that.__token
					}
				}
				data["fun"] = function(res) {
					if (res.success) {
						that.poptype = "";
						that.disabled = true;
						uni.showToast({
							title: "简历已投递",
							icon: "success"
						})
					} else {
						uni.showToast({
							title: "简历发送失败！请重试",
							icon: "none"
						})
					}
				}
				that.$store.dispatch("getData", data)
			},
			saveDatas(data) {
				var that = this;
				let _data = {
					"inter": "resume",
					"method": "PUT",
					"data": data,
					"header": {
						"token": that.__token,
						"Content-Type": "application/json"
					}
				}
				console.log(_data)
				//return
				_data["fun"] = function(res) {
					if (res.success) {
						that.getResume();
					}
				}
				that.$store.dispatch("getData", _data)
			},
			togglePopup(type) {
				var that = this;
				that.poptype = type;
			}
		}
	}
</script>

<style>
	@import "./work.css";
</style>
