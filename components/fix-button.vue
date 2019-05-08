<template>
	<view class="fix-button" :style="'position:'+isFixed">
		<view class="fbtn-main">
			<view class="fbtns btn-goback" v-if="gobackShow=='show'" :class="btnType" @click="$store.dispatch('goback')">返回</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fix-button',
		props: {
			btnType: {
				type: String,
				//fbtn-big - fbtn-full - ''
				default: ''
			},
			gobackShow: {
				type: String,
				default: "show"
			},
			isFixed:{
				type: String,
				default: "fixed"
			}
		},
		data() {
			return {};
		},
		computed: {},
		methods: {}
	};
</script>
<style>
</style>
