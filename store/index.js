import Vue from 'vue'
import Vuex from 'vuex'
import tab_bar from "./modules/tab_bar.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		sourceUrl: "http://api_test.meetji.com",
		loading: "0",
		base_url: "",
		phoneNumber: "4008200000",
		user: {},
		data: ""
	},
	mutations: {
		switch_loading(state, status) {
			if (status == "change") {
				if (state.loading == '0') {
					state.loading = '1'
				} else {
					state.loading = '0'
				}
			} else {
				state.loading = status;
			}

		},
		get_user(state, data) {
			console.log(data)
			state.user = data
		},
		update_list(state, data) {
			state.list = data
		},
		update_detail(state, data) {
			state.detail = data
		}
	},
	actions: {
		get_data(ctx) {
			console.log(ctx)
			ctx.commit("switch_loading", "1")
			uni.request({
				url: ctx.state.base_url + "/topics",
				data: {
					page: 1,
					tab: "share",
					limit: 10,
					mdrender: false
				},
				success(res) {
					ctx.commit("update_list", res.data.data)
				},
				complete() {
					ctx.commit("switch_loading", "0")
				}
			})
		},
		cheack_user(ctx) {
			var user = "";
			uni.getStorage({
				key: "user",
				success: function(res) {
					user = res.data;
					if (user.UserId) {
						ctx.dispatch("menu_" + user.UserType);
					}
					ctx.commit("get_user", user)
				}
			})
		},
		cheack_page(ctx, index) {
			if (ctx.state.user.UserId) {
				ctx.commit("change_page", index)
			} else {
				uni.navigateTo({
					url: "/pages/index/index"
				})
			}
		},
		goback(ctx, url) {
			if (url) {
				uni.navigateTo({
					url: url
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		logout(ctx) {
			uni.removeStorage({
				key: 'user',
				success: function(res) {
					ctx.commit("get_user", {})
					ctx.dispatch("menu_default")
					uni.redirectTo({
						url: '/pages/index/index'
					});
				}
			});
		},
		makePhoneCall(ctx) {
			uni.makePhoneCall({
				phoneNumber: ctx.state.phoneNumber
			});
		}
	},
	modules: {
		tab_bar
	}
})
export default store
