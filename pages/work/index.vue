<template>
	<view class="content">
		<view class="flex-top-box">
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
		</view>
		<view class="page-main">
			<block v-for="(item, index) in 8">
				<view class="work-list" @click="workDetail('id')">
					<view class="work-block">
						<view class="work-block-title">友爱数码 | 高级质检员</view>
						<view class="work-salary">6-8K</view>
					</view>
					<view class="work-block">
						<view class="work-require">上海 | 普陀区 | 1-2年 | 无学历要求</view>
						<view class="work-time">2019/03/05</view>
					</view>
					<view class="work-block">
						<view class="work-tag-list">
							<view class="work-tag">五险一金</view>
							<view class="work-tag">有住宿</view>
							<view class="work-tag">公司提供一日两餐</view>
						</view>
					</view>
				</view>
			</block>
			<tab-bar></tab-bar>
		</view>
		<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" mode="selector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray[pickerKey]"></mpvue-picker>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '@/components/mpvuePicker.vue';
	export default {
		data() {
			return {
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
		onLoad() {
			var that = this;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
		},
		onReady() {
			var that = this;
		},
		components: {
			mpvuePicker
		},
		computed: {},
		methods: {
			workDetail(id) {
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
			},
		}
	}
</script>

<style>
	@import "./work.css";
</style>
