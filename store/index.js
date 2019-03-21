import Vue from 'vue'
import Vuex from 'vuex'
import tab_bar from "./modules/tab_bar.js"
Vue use(Vuex)

const store = new Vuex.Store({
	state: {
		loading: "0",
		base_url: "",
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
		cheack_user(state, data) {
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
		get_data(ctx){
			console.log(ctx)
			ctx.commit("switch_loading","1")
			uni.request({
				url:ctx.state.base_url+"/topics",
				data:{
					page :1,
					tab :"share",
					limit :10,
					mdrender :false
				},
				success(res) {
					ctx.commit("update_list",res.data.data)
				},
				complete(){
					ctx.commit("switch_loading","0")
				}
			})
		}
	},
	modules: {
		tab_bar
	}
})
export default store
