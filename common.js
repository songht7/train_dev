/*
 *	userType 1：management管理员		2：business商业	3：customer顾客
 *	A：普通用户 or 员工 
 *	B：企业管理员
 * */

var api = {
	"formal": {
		"interface": "https://api.bdmartech.com", //接口
		"domain": "http://m.bdmartech.com",
		"cosConfig":{//`https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'plbs-test-1257286922',
			"Region": 'ap-shanghai',
			"SecretId": 'AKIDujJnIXMBSeeOuVMVt0sa2Jh5A90rcJoh',
			"SecretKey": 'tDI8jS2VWaXPDwUryoGblz2Z8B1k1QtF'
		}
	},
	"dev": {
		"interface": "https://api-test.wsshanghai.com", //接口
		"domain": "http://train.wsshanghai.com",
		"cosConfig":{//`https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'plbs-test-1257286922',
			"Region": 'ap-shanghai',
			"SecretId": 'AKIDujJnIXMBSeeOuVMVt0sa2Jh5A90rcJoh',
			"SecretKey": 'tDI8jS2VWaXPDwUryoGblz2Z8B1k1QtF'
		}
	},
	"wuxi": {
		"interface": "https://api.jobpgroup.com", //接口
		"domain": "http://jobpgroup.com",
		"cosConfig":{//`http://jobpassport-1259247972.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'jobpassport-1259247972',
			"Region": 'ap-shanghai',
			"SecretId": 'AKIDRbLQM4DqRnKgpzR1NlEUWP9jD7pJt1K3',
			"SecretKey": 'mNnzhBSUHtb6SWP4bulOmwwazA8RWTCV'
		}
	}
}
var lks = "formal";
export default {
	Interface: {
		"apiurl": api[lks]["interface"], //space111111
		"domain": api[lks]["domain"],
		"cosConfig":api[lks]["cosConfig"],
		"addr": {
			"slideShow": "/v2/ApiHome-slideShow.htm", //首页列表
			"login": "/v4/ApiAuth-login.htm", //登录[POST]--A
			"sign": "/v4/ApiAuth-sign.htm", //登录--B
			"register": "/v4/ApiAuth-register.htm", //注册[POST] A
			"checkPhone": "/v4/ApiAuth-checkPhone.htm", //验证手机号是否可用
			"sendRegistSms": "/v4/ApiSms-sendRegistSms.htm", //发送验证码(有阻拦：手机号已使用) 测试：1111
			"sendSms": "/v4/ApiSms-sendSms.htm", //发送验证码(无阻拦）
			"logout": "/v4/ApiAuth-logout.htm", //用户退出[DELETE]
			"info": "/v4/ApiAccount-info.htm", //用户信息
			"photo": "/v4/ApiAccount-photo.htm", //图片上传[POST]
			"editInfo": "/v4/ApiAccount-info.htm", //用户信息编辑[PUT]
			"reset": "/v4/ApiAuth-reset.htm", //重置密码[PUT]（A）
			"courses": "/v4/ApiCourse-courses.htm", //培训列表?id=分类id course_id
			"course": "/v4/ApiCourse-course.htm", //培训详细?id=培训id
			"lessons": "/v4/ApiCourse-lessons.htm", //课程列表{培训详细内}-headers token--?id=1
			"lesson": "/v4/ApiCourse-lesson.htm", //课程详细-headers token--?id=1
			"joinCourses": "/v4/ApiAccount-courses.htm", //参与的课程
			"accountCourse": "/v4/ApiAccount-course.htm", //参与课时[POST] course_id
			"accountLesson": "/v4/ApiAccount-lesson.htm", //课程学习进度[POST] lesson_id
			"categorys": "/v4/ApiBase-categorys.htm", //培训分类
			"tests": "/v4/ApiCourse-tests.htm", //获取随机试题
			"test": "/v4/ApiAccount-test.htm", //提交测试[POST]
			"supports": "/v4/ApiArticle-supports.htm", //?cat_id=17
			"support": "/v4/ApiArticle-support.htm", //?article_id=1
			"favorites": "/v4/ApiAccount-favorites.htm", //收藏夹列表
			"favorite": "/v4/ApiAccount-favorite.htm", //用户：收藏夹[POST]
			"enterprise": "/v4/ApiAccount-enterprise.htm", //用户关联企业[POST]
			"enterpriseCourses": "/v4/ApiAccount-enterpriseCourses.htm", //员工：企业专用课程列表
			"personalProgresses": "/v4/ApiAccount-personalProgresses.htm", // 企业主：员工学习进度
			"courseProgresses": "/v4/ApiAccount-courseProgresses.htm", //企业主：课程参与度
			"testProgresses": "/v4/ApiAccount-testProgresses.htm", //企业主：考试合格率
			"resume": "/v4/ApiAccount-resume.htm", //获取简历[GET], 编辑简历[PUT], 投递简历[POST]?article_id

		}
	}
}
