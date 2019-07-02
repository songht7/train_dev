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
		openid: "",
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
			var _openid = ctx.state.openid;
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
		wxXCXAuth(ctx, type) {
			var _type = !type || type == "mp" ? 'getWeChatInfoMP' : 'getWeChatInfo';
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log("getProvider:", res)
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin', //登录服务提供商
							//scopes: 'auth_user', //授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）
							success: function(loginRes) {
								console.log("wx-login-res:", loginRes)
								var _code = loginRes.code;
								if (_code) {
									var _url = ctx.state.interface.apiurl + ctx.state.interface.addr[_type] + '?code=' + _code;
									console.log("getWeChatInfo-url:", _url)
									uni.request({
										url: _url,
										method: "GET",
										header: {},
										success(res) {
											console.log("getWeChatInfo-success:", res)
											if (res.data.success && res.data.data.openid) {
												var _openid = res.data.data.openid;
												// var _token = res.data.data.token ? res.data.data.token : '';
												// uni.getStorage({
												// 	key: "user",
												// 	success(ress) {
												// 		let ress_data = ress.data;
												// 		ress_data["token"] = _token;
												// 		uni.setStorage({
												// 			key: "user",
												// 			data: ress_data
												// 		});
												// 	},
												// 	fail() {}
												// })
												uni.setStorage({
													key: "openid",
													data: _openid
												});
												ctx.state.openid = _openid;
											}
										},
										fail(err) {
											console.log("getWeChatInfo-err:", err)
										},
										complete() {}
									})
								}
							},
							fail(f) {},
							complete() {}
						});
					}
				}
			});
		},
		checkSession() {
			/*检查登录状态是否过期*/
			uni.checkSession({
				success(e) {},
				fail(f) {},
				complete() {}
			});
		},
		logout(ctx) {
			var _openid = ctx.state.openid;
			var _token = ctx.state.user.token;
			var _data = {
				"inter": "info",
				"header": {
					"token": _token
				}
			}
			if (_openid) {
				_data["header"]["openid"] = _openid
			}
			_data["fun"] = function(ress) {
				if (ress.success) {
					uni.removeStorage({
						key: 'user',
						success: function(res) {},
						complete() {
							ctx.commit("get_user", {})
							ctx.dispatch("menu_default")
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}
					});
					uni.removeStorage({
						key: 'openid',
						success: function(res) {}
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "退出失败，请重试..."
					})
				}
			}
			ctx.dispatch("getData", _data)
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
