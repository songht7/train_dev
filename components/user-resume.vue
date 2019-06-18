<template>
	<view class="user-resume">
		<block v-if="editBlock=='basic'">
			<view class="edit-block edit-basic">
				<view class="resume-head">
					<view class="block-title">修改信息</view>

					<block v-if="isSendResume=='false'">
						<view class="block-edit" @click="saveResume">
							<view class="edit-name save-btn">完成</view>
						</view>
					</block>
					<block v-if="isSendResume=='true'">
						<view class="send-step" @click="switchResume('next')">
							下一步
						</view>
					</block>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">名字</view>
							<view class="basic-val">
								<input name="name" data-key="name" @input="setData" placeholder="请输入" :value="temp.name" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">生日</view>
							<view class="basic-val">
								<picker mode="date" @change="pickerDate" name="Birthday" :value="date" :start="startDate" :end="endDate">
									<view>{{temp.brithday||date}}</view>
								</picker>
							</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">性别</view>
							<view class="basic-val">
								<picker name="Gender" @change="pickerGender" :value="genderIndex" :range="gender">
									<view>{{temp.sex||gender[genderIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">学历</view>
							<view class="basic-val">
								<picker name="Education" @change="pickerEdu" :value="eduIndex" :range="education">
									<view>{{temp.education||education[eduIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="basic-block">
							<view class="basic-title">工作年限</view>
							<view class="basic-val">
								<picker name="WorkAge" @change="pickerWork" :value="workIndex" :range="workAge">
									<view>{{temp.age_work||workAge[workIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">手机</view>
							<view class="basic-val">
								<input name="phone" type="number" data-key="phone" @input="setData" placeholder="请输入" :value="temp.phone" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block">
							<view class="basic-title">电子邮箱</view>
							<view class="basic-val">
								<input name="email" data-key="email" @input="setData" placeholder="请输入" :value="temp.email" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="editBlock=='company'">
			<view class="edit-block edit-work">
				<view class="resume-head">
					<view class="block-title">工作经历</view>
					<view class="edits">
						<block v-if="isSendResume=='false'">
							<view class="block-edit" v-if="temp.id" @click="saveResume('dlt')">
								<view class="edit-name">删除</view>
							</view>
							<view class="block-edit" @click="saveResume">
								<view class="edit-name save-btn">完成</view>
							</view>
						</block>
						<block v-if="isSendResume=='true'">
							<view class="send-step" @click="switchResume('prev')">
								上一步
							</view>
							<view class="send-step" @click="switchResume('next')">
								下一步
							</view>
						</block>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-val date-box">
								<view class="date-block">
									<picker mode="date" @change="workStartDate" name="workStartDate" :start="startDate" :end="endDate">
										<view class="time-val">{{start_date?start_date:(temp.start_time||'开始')}}</view>
									</picker>
								</view>
								<view class="date-cut">至</view>
								<view class="date-block">
									<picker mode="date" @change="workEndDate" name="workEndDate" :start="startDate" :end="endDate">
										<view class="time-val">{{end_date?end_date:(temp.end_time||'结束')}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">公司名称</view>
							<view class="basic-val ipt-block">
								<input name="company" data-key="company" @input="setData" placeholder="请输入" :value="temp['company']||''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">职位名称</view>
							<view class="basic-val ipt-block">
								<input name="job" data-key="job" @input="setData" placeholder="请输入" :value="temp['job']||''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">工作内容</view>
							<view class="basic-val ipt-block">
								<textarea :value="temp['infomation']||''" name="infomation" data-key="infomation" @input="setData" auto-height
								 class="txtArea" />
								</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="editBlock=='school'">
			<view class="edit-block edit-edu">
				<view class="resume-head">
					<view class="block-title">教育经历</view>
					<view class="edits">
						<block v-if="isSendResume=='false'">
							<view class="block-edit" v-if="temp.id" @click="saveResume('dlt')">
								<view class="edit-name">删除</view>
							</view>
							<view class="block-edit" @click="saveResume">
								<view class="edit-name save-btn">完成</view>
							</view>
						</block>
						<block v-if="isSendResume=='true'">
							<view class="send-step" @click="switchResume('prev')">
								上一步
							</view>
							<view class="send-step" @click="switchResume('next')">
								下一步
							</view>
						</block>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-val date-box">
								<view class="date-block">
									<picker mode="date" @change="workStartDate" name="workStartDate" :start="startDate" :end="endDate">
										<view class="time-val">{{start_date?start_date:(temp.start_time||'开始')}}</view>
									</picker>
								</view>
								<view class="date-cut">至</view>
								<view class="date-block">
									<picker mode="date" @change="workEndDate" name="workEndDate" :start="startDate" :end="endDate">
										<view class="time-val">{{end_date?end_date:(temp.end_time||'结束')}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">学校名称</view>
							<view class="basic-val ipt-block">
								<input name="school" data-key="school" @input="setData" placeholder="请输入" :value="temp['school']||''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">专业</view>
							<view class="basic-val ipt-block">
								<input name="profession" data-key="profession" @input="setData" placeholder="请输入" :value="temp['profession']||''" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="editBlock=='project'">
			<view class="edit-block edit-item">
				<view class="resume-head">
					<view class="block-title">项目经历</view>
					<view class="edits">
						<block v-if="isSendResume=='false'">
							<view class="block-edit" v-if="temp.id" @click="saveResume('dlt')">
								<view class="edit-name">删除</view>
							</view>
							<view class="block-edit" @click="saveResume">
								<view class="edit-name save-btn">完成</view>
							</view>
						</block>
						<block v-if="isSendResume=='true'">
							<view class="send-step" @click="switchResume('prev')">
								上一步
							</view>
							<view class="send-step" @click="switchResume('next')">
								下一步
							</view>
						</block>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-val date-box">
								<view class="date-block">
									<picker mode="date" @change="workStartDate" name="workStartDate" :start="startDate" :end="endDate">
										<view class="time-val">{{start_date?start_date:(temp.start_time||'开始')}}</view>
									</picker>
								</view>
								<view class="date-cut">至</view>
								<view class="date-block">
									<picker mode="date" @change="workEndDate" name="workEndDate" :start="startDate" :end="endDate">
										<view class="time-val">{{end_date?end_date:(temp.end_time||'结束')}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">项目名称</view>
							<view class="basic-val ipt-block">
								<input name="name" data-key="name" @input="setData" placeholder="请输入" :value="temp['name']||''" />
							</view>
						</view>
					</view>
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-title">描述</view>
							<view class="basic-val ipt-block">
								<input name="overview" data-key="overview" @input="setData" placeholder="请输入" :value="temp['overview']||''" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="editBlock=='about_self'">
			<view class="edit-block edit-selfdes">
				<view class="resume-head">
					<view class="block-title">自我描述</view>
					<view class="edits">
						<block v-if="isSendResume=='false'">
							<view class="block-edit" @click="saveResume">
								<view class="edit-name save-btn">完成</view>
							</view>
						</block>
						<block v-if="isSendResume=='true'">
							<view class="send-step" @click="sendResume('prev')">
								上一步
							</view>
							<view class="send-step" @click="sendResume">
								完成
							</view>
						</block>
					</view>
				</view>
				<view class="resume-basic">
					<view class="basic-row">
						<view class="basic-block block-full">
							<view class="basic-val ipt-block">
								<textarea :value="temp['about_self']||''" name="about_self" data-key="about_self" @input="setData"
								 auto-height class="txtArea txtArea-big" />
							</view>
						</view>
					</view>
				</view>
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
			temp: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			datas:{
				type: Object,
				default: function(e) {
					return {}
				}
			},
			isSendResume:{
				type: String,
				default:"false"
			}
		},
		data() {
			return {
				gender: ['男', '女'],
				genderIndex: 0,
				education: ['请选择', '初中', '高中', '大专', '本科', '本科以上'],
				eduIndex: 0,
				workAge: ['请选择', '3年以下', '4年', '5年', '6年', '7年', '8年以上'],
				workIndex: 0,
				date: this.getDate({
					format: true
				}),
				start_date: "",
				end_date: ""
			};
		},
		watch: {},
		components: {},
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
				if (type == 'dlt') {
					this.$emit('dltResume');
				} else {
					this.$emit('saveResume');
				}
			},
			switchResume(type){
				this.$emit('switchResume',type);
			},
			sendResume(){
				this.$emit('sendResume');
			},
			setData(e) {
				var that = this;
				that.temp[e.currentTarget.dataset.key] = e.detail.value;
				//console.log(that.temp)
			},
			pickerGender(e) {
				var that = this;
				var key = e.target.value;
				that.genderIndex = key;
				that.temp['sex'] = that.gender[key]
			},
			pickerEdu(e) {
				var that = this;
				var key = e.target.value;
				that.eduIndex = key;
				that.temp['education'] = that.education[key]
			},
			pickerWork(e) {
				var that = this;
				var key = e.target.value;
				that.workIndex = key;
				that.temp['age_work'] = that.workAge[key]
			},
			pickerDate(e) {
				var that = this;
				that.date = e.target.value
				that.temp['brithday'] = e.target.value
			},
			workStartDate(e) {
				var that = this;
				that.start_date = e.target.value
				that.temp['start_time'] = e.target.value
			},
			workEndDate(e) {
				var that = this;
				that.end_date = e.target.value
				that.temp['end_time'] = e.target.value
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
	.txtArea-big{min-height: 300upx;}

	.edits {
		display: flex;
	}

	.save-btn {
		color: #007AFF;
	}

	.block-edit {
		margin-left: 40upx;
	}
</style>
