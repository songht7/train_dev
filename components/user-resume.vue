<template>
	<view class="user-resume">
		<block v-if="editBlock=='basic'">
			<view class="edit-block edit-basic">
				<view class="resume-head">
					<view class="block-title">修改信息</view>
					<view class="block-edit" @click="saveResume">
						<view class="edit-name save-btn">完成</view>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">名字</view>
							<view class="basic-val">
								<input name="name" data-key="name" @input="setData" placeholder="请输入" :value="basicInfo.name" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">生日</view>
							<view class="basic-val">
								<picker mode="date" @change="pickerDate" name="Birthday" :value="date" :start="startDate" :end="endDate">
									<view>{{basicInfo.brithday||date}}</view>
								</picker>
							</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">性别</view>
							<view class="basic-val">
								<picker name="Gender" @change="pickerGender" :value="genderIndex" :range="gender">
									<view>{{basicInfo.sex||gender[genderIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">学历</view>
							<view class="basic-val">
								<picker name="Education" @change="pickerEdu" :value="eduIndex" :range="education">
									<view>{{basicInfo.education||education[eduIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">工作年限</view>
							<view class="basic-val">
								<picker name="WorkAge" @change="pickerWork" :value="workIndex" :range="workAge">
									<view>{{basicInfo.age_work||workAge[workIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">手机</view>
							<view class="basic-val">
								<input name="phone" type="number" data-key="phone" @input="setData" placeholder="请输入" :value="basicInfo.phone" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">电子邮箱</view>
							<view class="basic-val">
								<input name="email" data-key="email" @input="setData" placeholder="请输入" :value="basicInfo.email" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="editBlock=='work'">
			<view class="edit-block edit-work">
				<view class="resume-head">
					<view class="block-title">工作经历</view>
					<view class="edits">
						<view class="block-edit" v-if="editKey>=1" @click="saveResume('dlt')">
							<view class="edit-name">删除</view>
						</view>
						<view class="block-edit" @click="saveResume('save')">
							<view class="edit-name save-btn">完成</view>
						</view>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-val date-box">
								<view class="date-block">
									<picker mode="date" @change="workStartDate" name="workStartDate" :start="startDate" :end="endDate">
										<view class="time-val">{{wkSDate?wkSDate:(editKey>0?company[editKey-1].start_time:'开始')}}</view>
									</picker>
								</view>
								<view class="date-cut">至</view>
								<view class="date-block">
									<picker mode="date" @change="workEndDate" name="workEndDate" :start="startDate" :end="endDate">
										<view class="time-val">{{wkEDate?wkEDate:(editKey>0?company[editKey-1].end_time:'结束')}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">公司名</view>
							<view class="basic-val ipt-block">
								<input name="company" data-key="company" @input="setCompanyData" placeholder="请输入" :value="editKey>0?company[editKey-1]['company']:''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">职位</view>
							<view class="basic-val ipt-block">
								<input name="job" data-key="job" @input="setCompanyData" placeholder="请输入" :value="editKey>0?company[editKey-1]['job']:''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">描述</view>
							<view class="basic-val ipt-block">
								<textarea :value="editKey>0?company[editKey-1]['infomation']:''" name="infomation" data-key="infomation" @input="setCompanyData"
								 auto-height class="txtArea" />
								</view>
						</view>
					</view>
				</view>
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
</template>

<script>
	export default {
		name: 'user-resume',
		props: {
			editBlock: {
				type: String,
				default: ''
			},
			editKey: {
				type: Number,
				default: -1
			},
			basicInfo: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			tempCompany: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			company: {
				type: Array,
				default () {
					return [];
				}
			},
			school: {
				type: Array,
				default () {
					return [];
				}
			},
			project: {
				type: Array,
				default () {
					return [];
				}
			},
			about_self: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				gender: ['男', '女'],
				genderIndex: 0,
				education: ['初中', '高中', '大专', '本科', '本科以上'],
				eduIndex: 3,
				workAge: ['3年以下', '4年', '5年', '6年', '7年', '8年以上'],
				workIndex: 2,
				date: this.getDate({
					format: true
				}),
				wkSDate: "",
				wkEDate: ""
			};
		},
		watch: {},
		components: {
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
			saveResume(type) {
				if(type=='dlt'){
					this.$emit('dltResume');
				}else{
					this.$emit('saveResume');
				}
			},
			setData(e) {
				var that = this;
				that.basicInfo[`${e.currentTarget.dataset.key}`] = e.detail.value;
			},
			setCompanyData(e) {
				var that = this;
				that.tempCompany[`${e.currentTarget.dataset.key}`] = e.detail.value;
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
			workStartDate(e) {
				var that = this;
				that.wkSDate = e.target.value
				that.tempCompany.start_time = e.target.value
			},
			workEndDate(e) {
				var that = this;
				that.wkEDate = e.target.value
				that.tempCompany.end_time = e.target.value
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
	};
</script>

<style>
	@import "../pages/user/center.css";

	.date-box {
		display: flex;
		width: 100%;
		align-content: center;
		align-items: center;
	}

	.block-full {
		width: 100%;
	}

	.date-block {
		width: 45%;
		padding: 10upx;
		border-bottom: 1px solid #D1D1D1;
	}

	.time-val {
		text-align: center;
	}

	.date-cut {
		width: 10%;
		text-align: center;
	}

	.ipt-block {
		border-bottom: 1px solid #D1D1D1;
	}

	.txtArea {
		min-height: 150upx;
	}
	.edits{display: flex;}
	.save-btn{color: #007AFF;}
	.block-edit{margin-left: 40upx;}
</style>
