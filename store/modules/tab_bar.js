export default {
	state: {
		footer_nav: [{
				name: '企业用户',
				name_code: 'company',
				link: "/pages/user/login?type=company",
				icon: 'dashaxiaoqudizhi01',
				flex_dir: "flex-row"
			},
			{
				name: '个人用户',
				name_code: 'user',
				link: "/pages/user/login?type=user",
				icon: 'wo',
				flex_dir: "flex-row"
			}

		],
		now_page_index: 0,
	},
	mutations: {
		change_nav_list(state, data) {
			state.footer_nav = data;
		},
		change_page(state, index) {
			state.now_page_index = index;
		}
	},
	actions: {
		menu_company(ctx) {
			let menu_list = [{
					name: '学习进度监测',
					name_code: 'cpn-p1',
					link: "/pages/company/rate-learning/index",
					icon: '',
					flex_dir: "flex-row"
				},
				{
					name: '课程参与度',
					name_code: 'cpn-p2',
					link: "/pages/company/rate-partake/index",
					icon: '',
					flex_dir: "flex-row"
				},
				{
					name: '考试合格率',
					name_code: 'cpn-p3',
					link: "/pages/company/rate-exam/index",
					icon: '',
					flex_dir: "flex-row"
				}
			]
			ctx.commit("change_nav_list", menu_list)
		},
		menu_user(ctx) {
			let menu_list = [{
					name: '首页',
					name_code: 'user-home',
					link: "/pages/index",
					icon: 'home',
					flex_dir: "flex-column"
				},
				{
					name: '消息',
					name_code: 'user-msg',
					link: "/pages/user/msg/index",
					icon: 'xiaoxi',
					flex_dir: "flex-column"
				},
				{
					name: '我的',
					name_code: 'user-my',
					link: "/pages/user/center/index",
					icon: 'wo',
					flex_dir: "flex-column"
				},
			]

			ctx.commit("change_nav_list", menu_list)
		}
	}
}
