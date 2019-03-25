import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;

/*全局组件引用*/
import uniIcon from "./components/uni-icon.vue"
Vue.component("uni-icon",uniIcon)

import tabBar from "./components/tab-bar.vue"
Vue.component("tab-bar",tabBar)

Vue.prototype.websiteUrl = 'http://main.meetji.com';
Vue.prototype.sourceUrl = 'http://api_test.meetji.com';

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
