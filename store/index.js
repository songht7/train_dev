import Vue from 'vue'
import Vuex from 'vuex'
import tab_bar from "./modules/tab_bar.js"
import common from "../common.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading: "0",
		phoneNumber: "4008200000",
		user: {},
		list: {},
		interface: common.Interface
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
		getData(ctx, parm) {
			ctx.commit("switch_loading", "1")
			let _parm = parm.parm || '';
			let _url = ctx.state.interface.apiurl + ctx.state.interface.addr[parm.inter] + _parm
			console.log(_url)
			console.log(parm)
			uni.request({
				url: _url,
				data: parm.data || {},
				method: parm.method || "GET",
				success(res) {
					console.log(res)
					ctx.commit("update_list", res.data.data)
				},
				fail(e) {
					console.log(e)
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
					url: url,
					animationType: 'pop-out',
					animationDuration: 1000
				});
			} else {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right',
					animationDuration: 1000
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
