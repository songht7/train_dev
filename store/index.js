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
		data: {},
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
		update_data(state, data) {
			state.data = data
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
			var result = [];
			uni.request({
				url: _url,
				data: parm.data || {},
				method: parm.method || "GET",
				header: parm.header || {},
				success(res) {
					//console.log(res)
					if (res.success) {
						ctx.commit("update_data", res.data.data)
					}
					result = res.data
				},
				fail(err) {
					console.log(err)
					result = {
						"success": false,
						"Msg": "接口请求失败",
						"err": err
					}
				},
				complete() {
					ctx.commit("switch_loading", "0")
					if (parm.fun) {
						new parm.fun(result)
					}
				}
			})
		},
		cheack_user(ctx) {
			var user = "";
			uni.getStorage({
				key: "user",
				success: function(res) {
					user = res.data;
					if (user.userInfo.id) {
						ctx.dispatch("menu_" + user.tabBarType);
					}
					ctx.commit("get_user", user)
				},
				fail() {
					ctx.commit("get_user", {})
				}
			})
		},
		cheack_page(ctx, index) {
			if (ctx.state.user.userInfo && ctx.state.user.userInfo.id) {
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
