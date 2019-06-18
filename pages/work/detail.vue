<template>
	<view class="content">
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
								<uni-icon type="weizhi" size="20" color="#898989"></uni-icon>{{datas.province?datas.province+' - ':''}}{{datas.city?datas.city:''}}
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
				<view class="fbtns fbtns-clr-full btn-totest" @click="showResume">发送简历</view>
			</fix-button>
		</view>
		<uni-popup :show="poptype === 'showReume'" position="middle" mode="posfixed" width="80" @hidePopup="togglePopup('')">
			<view class="train-show-modal-box">
				<user-resume editBlock="basic" isSendResume="true" :temp="resume" :datas="resume" @sendResume="sendResume"></user-resume>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniPopup from '@/components/uni-popup.vue'
	import userResume from '@/components/user-resume.vue'
	export default {
		data() {
			return {
				article_id: "",
				__token: "",
				datas: [],
				resume: {},
				poptype: ""
			}
		},
		onLoad(e) {
			var that = this;
			that.article_id = e.id;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			that.__token = that.$store.state.user.token;
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
					if (res.success) {
						var _data = res.data
						_data['tags'] = _data["tag"].split("，")
						that.datas = _data;
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
							that.resume = _info;
						}
					}
				}
				that.$store.dispatch("getData", _data)
			},
			showResume() {
				var that = this;
				that.poptype = "showReume";
			},
			sendResume() {
				var that = this;
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
					if (res.success) {}
				}
				//that.$store.dispatch("getData", data)
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
