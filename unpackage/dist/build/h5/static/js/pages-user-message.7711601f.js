(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-message"],{8005:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{UserId:this.$store.state.user.UserId||""}},onLoad:function(){},onShow:function(){var e=this;e.$store.dispatch("cheack_user"),e.$store.dispatch("cheack_page",1)},methods:{}};t.default=a},9134:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"message-center"},[n("v-uni-view",{staticClass:"message-block"},[e._v("message")]),n("tab-bar")],1)},s=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return s})},c1ea:function(e,t,n){"use strict";n.r(t);var a=n("9134"),s=n("fbfa");for(var r in s)"default"!==r&&function(e){n.d(t,e,function(){return s[e]})}(r);var u=n("2877"),c=Object(u["a"])(s["default"],a["a"],a["b"],!1,null,"02e0275a",null);t["default"]=c.exports},fbfa:function(e,t,n){"use strict";n.r(t);var a=n("8005"),s=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=s.a}}]);