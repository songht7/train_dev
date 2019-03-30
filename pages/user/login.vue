<template>
	<view class="login-box pages">
		<view class="page-main">
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
					<button class="log-btn" formType="submit">登录</button>
					<view class="log-btn nav-black" @click="$store.dispatch('goback','/pages/index/index')">返回</view>
				</view>
			</form>
		</view>
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
				formData["UserId"] = "1";
				formData["Portrait"] = "/static/logo.png";
				formData["UserType"] = that.UserType;
				uni.setStorage({
					key: "user",
					data: formData
				});
				setTimeout(function() {
					that.$store.commit("change_page", 0)
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

	.uni-btn-v {
		display: flex;
		align-content: space-between;
		align-items: center;
		justify-content: space-between;
	}

	.log-btn {
		width: 48%;
	}

	.nav-black {
		text-align: center;
		line-break: 2;
		border: 2upx solid #008CEE;
		color: #008CEE;
		height: 100%;
	}
</style>
