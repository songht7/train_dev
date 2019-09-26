<template>
	<view class="content">
		<view class="flex-top-box" v-if="filterShow">
			<view class="flex-filter">
				<view class="filter-block" @click="showPicker(0)">
					<view class="filter-val">
						<text>{{filterPram["company"]||"公司"}}</text>
					</view>
					<uni-icons type="sanjiao" size="18" color="#929292"></uni-icons>
				</view>
				<view class="filter-block" @click="showPicker(1)">
					<view class="filter-val">
						<text>{{filterPram["trade"]||"行业"}}</text>
					</view>
					<uni-icons type="sanjiao" size="18" color="#929292"></uni-icons>
				</view>
				<view class="filter-block filter-more-btn">
					<uni-icons type="gengduo3" size="32" color="#929292" @click="showDrawer(true)"></uni-icons>
					<uni-drawer :visible="drawerBox" mode="right" @close="showDrawer(false)">
						<view class="filter-more-box">
							<view class="filter-list">
								<view class="filter-more">
									<view class="filter-title">职能</view>
								</view>
								<view class="filter-more">
									<view class="filter-title">区域</view>
									<view class="filter-vals" @click="areaPicker">
										{{filterPram["area"]||"选择"}}
									</view>
								</view>
								<view class="filter-more">
									<view class="filter-title">薪水</view>
								</view>
							</view>
							<view class="filter-btns">
								<view class="frbtns f-cancel" @click="showDrawer(false)">取消</view>
								<view class="frbtns f-confirm" @click="getDatas">搜索</view>
							</view>
						</view>
					</uni-drawer>
				</view>
			</view>
			<view class="flex-station"></view>
		</view>
		<view class="page-main">
			<view class="search-main">
				<view class="serch-fex-btn" @click="searchMod" v-show="!searchShow">
					<uni-icons type="shousuo" size="32" color="#919191"></uni-icons>
				</view>
				<view class="search-result" v-show="searchShow">
					<view class="block search-box search-box-inn">
						<view class="flex-left">
							关键词：
						</view>
						<input type="text" class="search-input" confirm-type="search" v-model="serchModel" :value="keywords" @confirm="searchConfirm"
						 placeholder="想要查找的工作" placeholder-style="color:#999" />
						<view class="search-btn" @click="searchConfirm">搜索</view>
					</view>
					<view class="search-show-all" @click="searchAll">全部</view>
				</view>
			</view>
			<block v-for="(obj,index) in datas" :key="index">
				<view class="work-list" @click="goDetail(obj.id)">
					<view class="work-block">
						<view class="work-block-title">{{obj.name}} | {{obj.type}}</view>
						<view class="work-salary">{{obj.salary}}</view>
					</view>
					<view class="work-block">
						<view class="work-require">{{obj.province?obj.province+' | ':''}}{{obj.city?obj.city+' | ':''}}{{obj.age_min}}-{{obj.age_max}}年
							| {{obj.education?obj.education:'无学历要求'}}</view>
						<view class="work-time">{{obj.add_time.split(" ")[0]}}</view>
					</view>
					<view class="work-block">
						<view class="work-tag-list">
							<block v-for="(t,i) in obj.tags" :key="i">
								<view class="work-tag">{{t}}</view>
							</block>
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :status="status"></uni-load-more>
			<tab-bar></tab-bar>
		</view>
		<mpvue-picker themeColor="#007AFF" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel"
		 @onConfirm="onConfirmArea"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import cityData from '@/common/city.data.js';
	import uniLoadMore from '@/components/uni-load-more.vue'
	const company = [{
			label: '公司1'
		},
		{
			label: '公司2'
		},
		{
			label: '公司3'
		},
		{
			label: '公司4'
		}
	];
	const trade = [{
			label: '行业1'
		},
		{
			label: '行业2'
		},
		{
			label: '行业3'
		},
		{
			label: '行业4'
		}
	]
	export default {
		data() {
			return {
				ctgId: "",
				datas: [],
				data_total: 0,
				pageIndex: 1,
				pageSize: 5,
				status: "more",
				filterShow: false,
				pickerValueArray: company,
				pickerValueDefault: [0],
				pickerType: {
					"company": company,
					"trade": trade
				},
				deepLength: 1,
				filterIndex: 0,
				cityPickerValueDefault: [0, 0, 1],
				mode: 'selector', //单级selector 二级multiLinkageSelector
				drawerBox: false,
				filterPram: {
					"company": "",
					"trade": "",
					"province": "",
					"city": "",
					"district": "",
					"area": "",
					"salary": ""
				},
				keywords: "",
				serchModel: "",
				searchShow: true
			}
		},
		onLoad(e) {
			var that = this;
			that.ctgId = e.ctg_id || 17;
		},
		onReady() {
			var that = this;
		},
		onShow() {
			var that = this;
			uni.showLoading({
				title: "加载中..."
			})
			that.$store.dispatch('cheack_user')
			that.getDatas()
		},
		components: {
			mpvuePicker,
			mpvueCityPicker,
			uniDrawer,
			uniLoadMore
		},
		computed: {},
		onPullDownRefresh() {
			var that = this;
			that.pageIndex = 1;
			that.getDatas()
		},
		onReachBottom() {
			var that = this;
			if (that.status === "noMore") {
				return;
			}
			if (that.datas.length >= that.data_total || that.data_total <= 0) {
				that.status = "noMore";
				return;
			}
			that.pageIndex = that.pageIndex + 1;
			that.getDatas()
		},
		methods: {
			searchMod() {
				this.searchShow = !this.searchShow;
			},
			searchConfirm(e) {
				var that = this;
				if (that.serchModel) {
					that.keywords = that.serchModel;
					that.currentPage = 1;
					that.pagesize = 1000;
					that.getDatas();
				}
			},
			searchAll() {
				var that = this;
				that.keywords = "";
				that.currentPage = 1;
				that.pagesize = 5;
				that.getDatas();
			},
			getDatas() {
				var that = this;
				that.drawerBox = false;
				that.status = "loading";
				let filterPram = that.filterPram;
				var _pram =
					`company=${filterPram.company}&trade=${filterPram.trade}&province=${filterPram.province}&city=${filterPram.city}&district=${filterPram.district}&salary=${filterPram.salary}`;
				let data = {
					"inter": "supports",
					"parm": `?cat_id=${that.ctgId}&keywords=${that.keywords}&currentPage=${that.pageIndex}&pagesize=${that.pageSize}&${_pram}`,
					"header": {
						"token": that.$store.state.user.token || ""
					}
				}
				console.log(data)
				data["fun"] = function(res) {
					that.status = "more";
					uni.hideLoading()
					uni.stopPullDownRefresh()
					if (res.success) {
						var _data = res.data.list;
						if (_data) {
							_data.map((val, i, arr) => {
								val['tags'] = val["tag"].split("，")
							})
							if (that.pageIndex == 1) {
								that.datas = _data;
							} else {
								console.log(_data)
								//that.datas.push(_data);
								_data.forEach(item => {
									that.datas.push(item);
								});
							}
							that.data_total = res.data.total;
						}
						if (that.datas.length >= res.data.total || res.data.total <= 0) {
							that.status = "noMore";
							return;
						}
					}
				}
				that.$store.dispatch("getData", data)
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/work/detail?id=${id}`
				})
			},
			showPicker(key) {
				var that = this;
				that.filterIndex = key;
				switch (key) {
					case 0:
						that.pickerValueArray = that.pickerType.company;
						break;
					case 1:
						that.pickerValueArray = that.pickerType.trade;
						break;
					default:
						break;
				}
				that.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				var that = this;
				switch (that.filterIndex) {
					case 0:
						that.filterPram['company'] = e.label
						break;
					case 1:
						that.filterPram['trade'] = e.label
						break;
					default:
						break;
				}
				that.pageIndex = 1;
				that.getDatas();
				console.log(that.filterPram)
			},
			areaPicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirmArea(e) {
				var that = this;
				var _label = e.label;
				var _split = _label.split("-");
				that.filterPram.area = _label;
				that.filterPram.province = _split[0];
				that.filterPram.city = _split[1];
				that.filterPram.district = _split[2];
				that.pageIndex = 1;
			},
			onCancel(e) {
				console.log(e)
			},
			showDrawer(type) {
				this.drawerBox = type;
			}
		}
	}
</script>

<style>
	@import "./work.css";
</style>
