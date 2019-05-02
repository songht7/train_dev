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
		<view class="pages">
			<view class="page-main" style="height: 1000px;">
				工作机会了吧
			</view>
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
	.flex-top-box {
		position: relative;
	}

	.flex-filter {
		background: #fff;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #D1D1D1;
		position: fixed;
		z-index: 998;
		width: 100%;
		left: 0;
		height: 44px;
	}

	.filter-block {
		width: 50%;
		border-right: 1px solid #D1D1D1;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.filter-block:last-child {
		border-right: 0
	}
</style>
