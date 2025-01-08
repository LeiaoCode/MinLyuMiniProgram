<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3 7  89）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<fui-index-list isSrc :listData="records" @init="init" @click="itemClick">
		<fui-search-bar @search="search"></fui-search-bar>
		<template v-slot:footer>
			<fui-loadmore v-if="!show"></fui-loadmore>
			<fui-divider :text="recordsNum" v-if="show"></fui-divider>
		</template>
		<fui-actionsheet :show="showAc" :tips="tips" :itemList="itemList" @click="itemAcClick"
			@cancel="cancel"></fui-actionsheet>
	</fui-index-list>

</template>

<script>
	import lists from './index.list.js'
	export default {
		data() {
			return {
				//如果是请求数据返回，返回后直接整体赋值给lists（注意数据格式正确）
				lists: lists,
				show: false,
				showAc: false,
				tips: '退出后不会删除任何历史数据，下次登录依然可以使用本账号。',
				itemList: [{
					text: '退出登录',
					color: '#FF2B2B'
				}],
				user: {},
				records: [],
				recordsNum: 0,
				legalSpecialtyMap: {},
				name: ''
			}
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.show = true;
			// }, 500)
		},
		created() {
			// this.fetchLegalSpecialtyMap()
			this.getLawyers()
		},
		methods: {
			async fetchLegalSpecialtyMap() {
				try {
					const db = uniCloud.database();
					const res = await db.collection("legal-categories").get();
					// 构建映射关系
					this.legalSpecialtyMap = res.result.data.reduce((map, item) => {
						map[item._id] = item.name;
						return map;
					}, {});
				} catch (err) {
					console.error("Error fetching legal specialties:", err);
				}
			},
			// 翻译方法
			translateLegalSpecialty(values) {
				if (!Array.isArray(values)) {
					console.error("Expected an array, but got:", values);
					return ["未知专长"]; // 返回一个数组，默认值为包含“未知专长”的数组
				}
				return values.map(value => this.legalSpecialtyMap[value] || "未知专长");
			},
			async getLawyers() {
				try {
					// 构造查询条件
					const collection = uniCloud.database().collection('lawyers');
					let query = this.name ? collection.where({
						lawyer_name: new RegExp(this.name, 'i')
					}) : collection;

					// 查询数据
					const res = await query.get();
					let arr = res.result.data
					if (arr.length) {
						this.recordsNum = arr.length
						this.records = arr;
						console.log('1', this.records)
						await this.rebuildRecords()
						console.log(Object.entries(this.groupRecordsBySpecialty()))
						const grouped = await this
							.groupRecordsBySpecialty(); // 等待分组结果
						this.records = Object.entries(grouped).map(([practice_region, data]) => ({
							letter: practice_region.charAt(0),
							descr: practice_region,
							data
						}));
						console.log('分组结果1:', this.records);
						await this.constructRecordsFromFavorites();
						console.log('分组结果2:', this.records);
					} else {
						console.error('查询失败，没有结果:', res);
					}
				} catch (error) {
					console.error('查询 lawyers 数据库失败:', error);
				}
			},
			// 获取收藏用户列表并重新构造 records
			async constructRecordsFromFavorites() {
				const favorites = await this.getFavorites(); // 获取收藏用户列表
				console.log('favorites')
				console.log(favorites)
				if (!Array.isArray(favorites)) {
					console.error("收藏列表不是数组：", favorites);
					return;
				}
				// 构造符合目标结构的数组
				const records = {
					letter: "★", // 默认设置为 "收藏"
					descr: '★ 收藏', // 完整的 practice_region
					data: favorites
				}
				console.log('records')
				console.log(records)
				// this.records.push(records)
				// this.records = records.concat(this.records);
				this.records = [records, ...this.records]; // 使用扩展运算符
				console.log("重新构造的 records:", this.records);
			},
			async rebuildRecords() {
				this.records = this.records.map(record => ({
					id: record._id, // 保留 text 字段
					text: record.lawyer_name, // 保留 text 字段
					src: record.personal_photo.path, // 保留 src 字段
					practice_region: record.practice_region, // 保留 practice_region 字段
					lawyer_intro: record.lawyer_intro // 保留 practice_region 字段
				}));
			},
			//  分组
			async groupRecordsBySpecialty() {
				const grouped = this.records.reduce((acc, record) => {
					const key = record.practice_region; // 使用 specialty 作为分组的键
					if (!acc[key]) {
						acc[key] = []; // 如果没有这个分组，初始化为空数组
					}
					acc[key].push(record); // 将当前记录加入对应分组
					return acc;
				}, {});
				console.log('结果', grouped)
				return grouped
			},
			init() {
				this.show = true;
			},
			// 从收藏中移除
			async removeFromFavorites(userId) {
				let favorites = await this.getFavorites();
				// 过滤掉要移除的用户
				favorites = favorites.filter(fav => fav.id !== userId);
				// 保存更新后的收藏列表到 localStorage
				uni.setStorage({
					key: "favorites",
					data: favorites
				});
				this.fui.toast("取消收藏成功");
			},
			search(e) {
				this.name = e.detail.value
				this.getLawyers()
			},
			async refreshPage() {
				const currentPage = getCurrentPages().pop(); // 获取当前页面实例
				const route = `/${currentPage.route}`; // 当前页面路径
				const options = currentPage.options; // 页面参数

				// 构造完整路径（带参数）
				const queryString = Object.keys(options)
					.map(key => `${key}=${options[key]}`)
					.join('&');

				const fullPath = queryString ? `${route}?${queryString}` : route;

				// 跳转到当前页面，重新加载
				uni.redirectTo({
					url: fullPath
				});
			},
			async itemClick(e) {
				this.user = e;
				this.tips = '';
				this.isCancel = true;
				// 获取收藏列表
				const favorites = await this.getFavorites();

				// 检查是否已收藏
				const isAlreadyFavorited = favorites.some(fav => fav.id === e.id);

				// 动态设置菜单项
				this.itemList = isAlreadyFavorited ? ['查看', '取消收藏'] : ['查看', '收藏'];
				this.theme = 'dark'
				setTimeout(() => {
					this.showAc = true
				}, 50)
				console.log(e)
			},
			async itemAcClick(e) {
				if (e.text == '查看') {
					console.log('信息', this.user)
					this.fui.href("/pages/law/skeleton/skeleton?index=2&_id=" + this.user.id)
				} else if (e.text == '取消收藏') {
					await this.removeFromFavorites(this.user.id)
					await this.refreshPage();
				} else {
					this.fui.toast('收藏成功')
					await this.addToFavorites(this.user)
					await this.refreshPage();
				}
				this.cancel()
			},
			async addToFavorites(user) {
				// 从 localStorage 获取已收藏的用户列表
				let favorites = await this.getFavorites(); // 获取已有收藏列表
				// 检查用户是否已存在，避免重复收藏
				const isAlreadyFavorited = favorites.some(fav => fav.id === user.id);

				if (!isAlreadyFavorited) {
					// 添加当前用户到收藏数组
					favorites.push(user);
					// 保存回 localStorage
					uni.setStorage({
						key: "favorites",
						data: favorites
					});;
					this.$forceUpdate();
				} else {
					this.fui.toast("该用户已收藏");
				}
			},
			// 获取收藏的用户列表
			async getFavorites() {
				try {
					const result = await uni.getStorage({
						key: "favorites"
					});
					console.log(result)
					return result.data || []; // 返回存储的数据，或者空数组
				} catch (error) {
					console.error("获取收藏列表失败:", error);
					return []; // 如果没有存储，返回空数组
				}
			},
			cancel() {
				this.showAc = false
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}
</style>