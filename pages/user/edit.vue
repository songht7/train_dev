<template>
	<view class="user-center">
		<view class="page-main">
			<view class="edit-segment">
				<uni-segmented-control :current="current" :values="segmented" v-on:clickItem="onClicksegmented" styleType="text"
				 activeColor="#008CEE"></uni-segmented-control>
			</view>
			<view class="unit-content">
				<view v-show="current === 0">
					1
				</view>
				<view v-show="current === 1">
					2
				</view>
			</view>
		</view>
		<fix-button btnType="fbtn-full"></fix-button>
	</view>
</template>

<script>
	import fixButton from '@/components/fix-button.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	export default {
		data() {
			return {
				current: 0,
				segmented: [
					'绑定公司',
					'修改个人信息'
				]
			}
		},
		onLoad(e) {
			var that = this;
		},
		onShow() {
			var that = this;
			that.$store.dispatch('cheack_user')
			that.getDatas()
		},
		components: {
			fixButton,
			uniSegmentedControl
		},
		methods: {
			onClicksegmented(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			getDatas() {
				var that = this;
				/*文库*/
				let data = {
					"inter": "support",
					"parm": `?article_id=${that.article_id}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				data["fun"] = function(res) {
					if (res.success) {
						let _data = res.data;
						that.datas = _data;
						if (_data.favorites === 1) {
							that.isCollect = true;
						} else {
							that.isCollect = false;
						}
						uni.setNavigationBarTitle({
							title: _data.name
						});
					}
				}
				that.$store.dispatch("getData", data)
			}
		}
	}
</script>

<style>
	.edit-segment {
		padding: 30upx 0 0;
		margin-bottom: 40upx;
		line-height: 2;
		font-size: 36upx;
		border-bottom: 1px solid #D1D1D1;
	}
</style>
