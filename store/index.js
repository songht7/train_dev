import Vue from 'vue'
import Vuex from 'vuex'
import tab_bar from "./modules/tab_bar.js"
import common from "../common.js"
Vue.use(Vuex)


/*
 *	dispatch.actions
 * 	commit.mutations
 * */
const store = new Vuex.Store({
	state: {
		loading: "0",
		phoneNumber: "4008200000",
		user: {},
		data: {},
		haveMsg: false,
		interface: common.Interface,
		systemInfo: {},
		portrait: "",
		cosConfig: common.Interface.cosConfig
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
			console.log("store-get_user：", data)
			state.user = data
		},
		update_data(state, data) {
			state.data = data
		},
		update_detail(state, data) {
			state.detail = data
		},
		setSystemInfo(state, data) {
			state.systemInfo = data
		}
	},
	actions: {
		getData(ctx, parm) {
			ctx.commit("switch_loading", "1")
			let _parm = parm.parm || '';
			let _url = ctx.state.interface.apiurl + ctx.state.interface.addr[parm.inter] + _parm
			console.log("getData-url-", parm.inter, "：", _url)
			console.log("getData-parm-", parm.inter, "：", parm)
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
					console.log("getData-success-", parm.inter, "：", result)
				},
				fail(err) {
					console.log("getData-err-", parm.inter, "：", err)
					result = {
						"success": false,
						"msg": "接口请求失败",
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
					let timestamp = Math.round(new Date().getTime() / 1000);
					if (!user.deathline || timestamp >= user.deathline) {
						uni.removeStorage({
							key: "user"
						});
						ctx.dispatch("menu_default");
						user = {};
						uni.redirectTo({
							url: "/pages/index/index"
						})
					} else {
						ctx.dispatch("menu_" + user.tabBarType);
					}
					ctx.commit("get_user", user)
				},
				fail() {
					ctx.commit("get_user", {})
					// uni.redirectTo({
					// 	url: "/pages/index/index"
					// })
				}
			})
		},
		cheack_page(ctx, index) {
			if (ctx.state.user.userInfo && ctx.state.user.userInfo.id) {
				ctx.commit("change_page", index)
			} else {
				ctx.commit("change_page", 0)
				// uni.navigateTo({
				// 	url: "/pages/index/index"
				// })
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
		makePhoneCall(ctx, contactNumb) {
			uni.makePhoneCall({
				phoneNumber: contactNumb || ctx.state.phoneNumber
			});
		},
		getSystemInfo(ctx) {
			var systemInfo = {}
			uni.getSystemInfo({
				success(res) {
					systemInfo = res
				},
				complete() {
					ctx.commit("setSystemInfo", systemInfo)
				}
			});
		}
	},
	modules: {
		tab_bar
	}
})
export default store
