(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-login"],{"22bd":function(t,n,i){"use strict";i.r(n);var e=i("ffb8"),a=i("f38a");for(var u in a)"default"!==u&&function(t){i.d(n,t,function(){return a[t]})}(u);i("3367");var o=i("2877"),r=Object(o["a"])(a["default"],e["a"],e["b"],!1,null,"a636ef76",null);n["default"]=r.exports},3367:function(t,n,i){"use strict";var e=i("9a24"),a=i.n(e);a.a},8708:function(t,n,i){n=t.exports=i("2350")(!1),n.push([t.i,".train-input[data-v-a636ef76]{background:#f4f4f4}",""])},8768:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{UserType:"",loading:!1,inputClearValue:"",showClearIcon:!1}},onLoad:function(t){var n=this,i=t.type;n.UserType=i,uni.setNavigationBarTitle({title:"company"==i?"企业登录":"个人登录"})},onShow:function(){},computed:{},methods:{formSubmit:function(t){var n=this;if(1!=n.loading){var i=t.detail.value;console.log(i),i["UserId"]="1",i["Portrait"]="/static/logo.png",i["UserType"]=n.UserType,uni.setStorage({key:"user",data:i}),setTimeout(function(){n.$store.commit("change_page",0),uni.redirectTo({url:"/"})},2e3)}},clearInput:function(t){this.inputClearValue=t.target.value,t.target.value.length>0?this.showClearIcon=!0:this.showClearIcon=!1},clearIcon:function(){this.inputClearValue="",this.showClearIcon=!1}}};n.default=e},"9a24":function(t,n,i){var e=i("8708");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("89e50724",e,!0,{sourceMap:!1,shadowMode:!1})},f38a:function(t,n,i){"use strict";i.r(n);var e=i("8768"),a=i.n(e);for(var u in e)"default"!==u&&function(t){i.d(n,t,function(){return e[t]})}(u);n["default"]=a.a},ffb8:function(t,n,i){"use strict";var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"login-box"},[i("v-uni-form",{on:{submit:function(n){n=t.$handleEvent(n),t.formSubmit(n)}}},[i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-input",{staticClass:"uni-input train-input",attrs:{name:"UserName",placeholder:"用户名/邮箱/手机号"}})],1),i("v-uni-view",{staticClass:"uni-form-item uni-column"},[i("v-uni-view",{staticClass:"with-fun"},[i("v-uni-input",{staticClass:"uni-input train-input",attrs:{password:"",name:"Password",value:t.inputClearValue},on:{input:function(n){n=t.$handleEvent(n),t.clearInput(n)}}}),t.showClearIcon?i("v-uni-view",{staticClass:"uni-icon uni-icon-clear",on:{click:function(n){n=t.$handleEvent(n),t.clearIcon(n)}}}):t._e()],1)],1),i("v-uni-view",{staticClass:"uni-btn-v"},[i("v-uni-button",{attrs:{formType:"submit"}},[t._v("登录")]),i("v-uni-view",{staticClass:"nav-black"},[t._v("返回")])],1)],1)],1)},a=[];i.d(n,"a",function(){return e}),i.d(n,"b",function(){return a})}}]);