<template>
	<view class="login-box">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<input class="uni-input train-input" name="UserName" placeholder="用户名/邮箱/手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="with-fun">
					<input class="uni-input train-input" password name="Password" :value="inputClearValue" @input="clearInput" />
					<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button formType="submit">登录</button>
				<view class="nav-black">返回</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserType: "",
				loading: false,
				inputClearValue: '',
				showClearIcon: false,
			};
		},
		onLoad(e) {
			var that = this;
			let _type = e.type;
			that.UserType = _type;
			uni.setNavigationBarTitle({
				title: _type == "company" ? "企业登录" : "个人登录"
			})
		},
		onShow() {

		},
		computed: {},
		methods: {
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				//that.loading = true
				console.log(formData);
				formData["UserType"] = that.UserType
				uni.setStorage({
					key: "user",
					data: formData
				});
				setTimeout(function() {
					uni.redirectTo({
						url: "/"
					})
				}, 2000)
			},
			clearInput: function(event) {
				this.inputClearValue = event.target.value;
				if (event.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
		}
	}
</script>

<style>
	.train-input {
		background: #F4F4F4;
	}
</style>
