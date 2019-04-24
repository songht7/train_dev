/*
 *	A：普通用户 or 员工 
 *	B：企业管理员
 * */

export default {
	Interface: {
		"apiurl": " http://api_test.wsshanghai.com",
		"domain": "http://wsshanghai.com",
		"addr": {
			"login": "/v4/ApiAuth-login.htm", //登录--A
			"sign": "/v4/ApiAuth-sign.htm", //登录--B
			"register": "/v4/ApiAuth-register.htm", //注册 A
			"checkPhone": "/v4/ApiAuth-checkPhone.htm", //手机验证 测试：1111
			"logout": "/v4/ApiAuth-logout.htm", //用户退出
			"info": "/v4/ApiAccount-info.htm", //用户信息
			"reset": "/v4/ApiAuth-reset.htm", //重置密码（A）
		}
	}
}
