<template>
	<view>
		<view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
			<view class="train-list" v-if="data.id">
				<view class="train-block">
					<view v-if="showImg" class="image-section">
						<image class="image-full" :src="data.original_src?data.original_src:sourceUrl+'/img/logo.png'"></image>
					</view>
					<view class="train-infos">
						<view class="train-title">
							<text class="media-title">{{data.name}}</text>
							<text v-if="data.overview">{{data.overview}}</text>
						</view>
						<view class="train-count" v-if="data.lessCount">共{{data.lessCount}}门课程</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		computed: {
			showImg() {
				return true
				//return this.data.original_src
			}
		},
		methods: {
			close(e) {
				this.$emit('close');
			},
			bindClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.list-cell {
		width: 750upx;
		padding: 0 30upx;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.train-list {
		flex: 1;
		flex-direction: column;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-bottom-color: #c8c7cc;
		padding: 20upx 0;
	}

	.train-block {
		flex-direction: row;
	}

	.media-title {
		flex: 1;
		lines: 3;
		text-overflow: ellipsis;
		font-size: 32upx;
		color: #555555;
	}

	.train-infos {
		padding-left: 20upx;
		flex-direction: column;
		justify-content: space-between;
		align-content: space-between;
		height: 100%;
		width: 64%;
	}

	.image-section {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 0upx;
		margin-right: 10upx;
		width: 35%;
		height: 180upx;
		border-radius: 15upx;
		overflow: hidden;
	}

</style>
