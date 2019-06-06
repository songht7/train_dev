<template>
	<view class="content">
		<!-- <view class="flex-top-box">
			<view class="flex-filter">
				<view class="filter-block" @click="showPicker('address')">
					<view class="filter-val">{{pickerVal['address']['txt']}}</view>
					<uni-icon type="sanjiao" size="18" color="#929292"></uni-icon>
				</view>
				<view class="filter-block" @click="showPicker('type')">
					<view class="filter-val">{{pickerVal['type']['txt']}}</view>
					<uni-icon type="sanjiao" size="18" color="#929292"></uni-icon>
				</view>
			</view>
			<view class="flex-station"></view>
		</view> -->
		<view class="page-main">
			<block v-for="(obj,index) in datas" :key="index">
				<view class="work-list" @click="goDetail(obj.id)">
					<view class="work-block">
						<view class="work-block-title">{{obj.name}} | {{obj.type}}</view>
						<view class="work-salary">{{obj.salary}}</view>
					</view>
					<view class="work-block">
						<view class="work-require">{{obj.province?obj.province+' | ':''}}{{obj.city?obj.city+' | ':''}}{{obj.age_min}}-{{obj.age_max}}年
							| {{obj.education?obj.education:'无学历要求'}}</view>
						<view class="work-time">{{obj.add_time.split(" ")[0]}}</view>
					</view>
					<view class="work-block">
						<view class="work-tag-list">
							<block v-for="(t,i) in obj.tags" :key="i">
								<view class="work-tag">{{t}}</view>
							</block>
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="status"></uni-load-more>
			<tab-bar></tab-bar>
		</view>
		<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="selector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray[pickerKey]"></mpvue-picker>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '@/components/mpvuePicker.vue';
	import uniLoadMore from '@/components/uni-load-more.vue'
	export default {
		data() {
			return {
				ctgId: "",
				datas: [],
				data_total: 0,
				pageIndex: 1,
				pageSize: 5,
				status: "more",
				pickerValueArray: {
					"address": [{
							label: '全部地址',
							value: 0
						}, {
							label: '上海',
							value: 1
						},
						{
							label: '北京',
							value: 2
						},
						{
							label: '南京',
							value: 3
						},
						{
							label: '江苏',
							value: 4
						}
					],
					"type": [{
							label: '全部类型',
							value: 0
						}, {
							label: '类型1',
							value: 1
						},
						{
							label: '类型2',
							value: 2
						},
						{
							label: '类型3',
							value: 3
						},
						{
							label: '类型4',
							value: 4
						}
					]
				},
				pickerKey: "address",
				pickerValueDefault: [0],
				deepLength: 1,
				pickerVal: {
					"address": {
						"txt": "选择工作地点",
						"id": ""
					},
					"type": {
						"txt": "选择工作类型",
						"id": ""
					}
				}
			}
		},
		onLoad(e) {
			var that = this;
			that.ctgId = e.ctg_id || 17;
		},
		onReady() {
			var that = this;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			that.getDatas()
		},
		components: {
			mpvuePicker,
			uniLoadMore
		},
		computed: {},
		onPullDownRefresh() {
			var that = this;
			that.pageIndex = 1;
			that.getDatas()
		},
		onReachBottom() {
			var that = this;
			if (that.status === "noMore") {
				return;
			}
			if (that.datas.length >= that.data_total || that.data_total <= 0) {
				that.status = "noMore";
				return;
			}
			that.pageIndex = that.pageIndex + 1;
			that.getDatas()
		},
		methods: {
			getDatas() {
				var that = this;
				that.status = "loading";
				let data = {
					"inter": "supports",
					"parm": `?cat_id=${that.ctgId}&currentPage=${that.pageIndex}&pagesize=${that.pageSize}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				console.log(data)
				data["fun"] = function(res) {
					that.status = "more";
					uni.stopPullDownRefresh()
					if (res.success) {
						var _data = res.data.list;
						if (_data) {
							_data.map((val, i, arr) => {
								val['tags'] = val["tag"].split("，")
							})
							if (that.pageIndex == 1) {
								that.datas = _data;
							} else {
								console.log(_data)
								//that.datas.push(_data);
								_data.forEach(item => {
									that.datas.push(item);
								});
							}
							that.data_total = res.data.total;
						}
						if (that.datas.length >= res.data.total || res.data.total <= 0) {
							that.status = "noMore";
							return;
						}
					}
				}
				that.$store.dispatch("getData", data)
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/work/detail?id=${id}`
				})
			},
			showPicker(key) {
				var that = this;
				that.pickerKey = key || "address";
				that.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				var that = this;
				console.log(e)
				that.pickerVal[that.pickerKey]['txt'] = e.label
				that.pickerVal[that.pickerKey]['id'] = e.value[0]
				console.log(that.pickerVal)
			},
			onCancel(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	@import "./work.css";
</style>
