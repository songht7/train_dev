import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
/*全局组件引用*/
import uniIcon from "./components/uni-icon.vue"
Vue.component("uni-icon",uniIcon)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
