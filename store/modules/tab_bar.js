export default {
	state: {
		footer_nav: [{
				name: '企业用户',
				name_code: 'company',
				icon: 'dashaxiaoqudizhi01'
			},
			{
				name: '个人用户',
				name_code: 'user',
				icon: 'wo'
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
		menu_2(ctx) {
			let menu_list = [{
					name: '学习进度监测',
					name_code: 'cpn-p1',
					icon: ''
				},
				{
					name: '课程参与度',
					name_code: 'cpn-p2',
					icon: ''
				},
				{
					name: '考试合格率',
					name_code: 'cpn-p3',
					icon: ''
				}
			]
			ctx.commit("change_nav_list", menu_list)
		},
		menu_3(ctx) {
			let menu_list = [{
					name: '首页',
					name_code: 'home',
					icon: '/static/footer_icon/a2.png',
					select_icon: '/static/footer_icon/a1.png',
					size: 'small'
				},
				{
					name: '发布',
					name_code: 'publish',
					icon: '/static/footer_icon/f2.png',
					select_icon: '/static/footer_icon/f1.png',
					size: 'big'
				},
				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},
			]

			ctx.commit("change_nav_list", menu_list)
		},
		menu_4(ctx) {
			let menu_list = [{
					name: '首页',
					name_code: 'home',
					icon: '/static/footer_icon/a2.png',
					select_icon: '/static/footer_icon/a1.png',
					size: 'small'
				},
				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},
				{
					name: '发布',
					name_code: 'publish',
					icon: '/static/footer_icon/f2.png',
					select_icon: '/static/footer_icon/f1.png',
					size: 'small'
				},
				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},
			]

			ctx.commit("change_nav_list", menu_list)
		},
		menu_5(ctx) {
			let menu_list = [{
					name: '首页',
					name_code: 'home',
					icon: '/static/footer_icon/a2.png',
					select_icon: '/static/footer_icon/a1.png',
					size: 'small'
				},
				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},
				{
					name: '发布',
					name_code: 'publish',
					icon: '/static/footer_icon/f2.png',
					select_icon: '/static/footer_icon/f1.png',
					size: 'big'
				},
				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},

				{
					name: '我的',
					name_code: 'my',
					icon: '/static/footer_icon/d1.png',
					select_icon: '/static/footer_icon/d2.png',
					size: 'small'
				},
			]

			ctx.commit("change_nav_list", menu_list)
		}
	}
}
