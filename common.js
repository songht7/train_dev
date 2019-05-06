/*
 *	userType 1：management管理员		2：business商业	3：customer顾客
 *	A：普通用户 or 员工 
 *	B：企业管理员
 * */

export default {
	Interface: {
		"apiurl": "http://api_test.wsshanghai.com",//space111111
		"domain": "http://wsshanghai.com",
		"addr": {
			"slideShow":"/v2/ApiHome-slideShow.htm",//首页列表
			"login": "/v4/ApiAuth-login.htm", //登录[POST]--A
			"sign": "/v4/ApiAuth-sign.htm", //登录--B
			"register": "/v4/ApiAuth-register.htm", //注册[POST] A
			"checkPhone": "/v4/ApiAuth-checkPhone.htm", //验证手机号是否可用 测试：1111
			"logout": "/v4/ApiAuth-logout.htm", //用户退出[DELETE]
			"info": "/v4/ApiAccount-info.htm", //用户信息
			"reset": "/v4/ApiAuth-reset.htm", //重置密码[PUT]（A）
			"courses":"/v4/ApiCourse-courses.htm",//培训列表?id=分类id course_id
			"course":"/v4/ApiCourse-course.htm",//培训详细?id=培训id
			"lessons":"/v4/ApiCourse-lessons.htm",//课程列表{培训详细内}-headers token--?id=1
			"lesson":"/v4/ApiCourse-lesson.htm",//课程详细-headers token--?id=1
			"categorys":"/v4/ApiBase-categorys.htm",//培训分类
			"tests":"/v4/ApiCourse-tests.htm",//获取随机试题
			"test":"/v4/ApiAccount-test.htm",//提交测试[POST]
			
		}
	}
}
