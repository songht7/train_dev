<template name="uni-icon">
	<view class="uni-icon" :class="['uni-icon-'+type,isGradient]" :style="{color:color,'font-size':fontSize}" @click="onClick()"></view>
</template>

<script>
	export default {
		name: "uni-icon",
		props: {
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: String,
			/**
			 * 图标大小
			 */
			size: [Number, String],
			isGradient:{
				type: String,
				default: ""
			}
		},
		computed: {
			fontSize() {
				return `${this.size}px`
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style>
	.isGradient{
		-webkit-background-clip: text;
		/*必需加前缀 -webkit- 才支持这个text值 */
		-webkit-text-fill-color: transparent;
		/*text-fill-color会覆盖color所定义的字体颜色： */
		background-image: -webkit-linear-gradient(#BFBFBF,#666666);
	}
	.uni-icon-boshimao1 {
		background-image: -webkit-linear-gradient(#FFFFFF,#FEF1F0);
	}
	.uni-icon-icon_likegood_fill {
		background-image: -webkit-linear-gradient(#FFFFFF,#FCF5EE);
	}
	.uni-icon-ai-book {
		background-image: -webkit-linear-gradient(#FFFFFF,#CDE2F6);
	}
	.uni-icon-gongwenbao1 {
		background-image: -webkit-linear-gradient(#FFFFFF,#DAF3F0);
	}
</style>
