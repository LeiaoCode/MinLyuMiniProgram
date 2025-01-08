<template>
	<view class="fui-wrap">
		<fui-vtabs :vtabs="vtabs" :activeTab="activeTab" :linkage="false" @click="onTabClick">
			<view class="fui-vtabs-content__item">
				<view class="fui-content--box" @click="hrefText(content)" v-for="(content, index) in content"
					:key="index">
					<text class="fui-title">{{ content.title }}</text>
					<image class="fui-img" :src="resUrl + content.img" mode="widthFix"></image>
					<text class="fui-descr">{{formatTimestamp(content.descr)}}</text>
				</view>
			</view>
		</fui-vtabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				vtabs: [],
				contents: [],
				content: {},
				resUrl: ''
			}
		},
		onLoad() {
			this.fetchArticlesWithCategories()
		},
		methods: {
			formatTimestamp(timestamp) {
				// 创建日期对象
				const date = new Date(timestamp);
				console.log(date)
				// 格式化日期
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
				// 拼接日期字符串
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},

			async fetchArticlesWithCategories() {
				try {
					const db = uniCloud.database();

					// 获取文章数据
					const articlesRes = await db.collection('uni-cms-articles').get();
					const articles = articlesRes.result.data;

					// 获取分类映射
					const categoriesRes = await db.collection('legal-categories').get();
					const categories = categoriesRes.result.data;

					// 创建分类映射表
					const categoryMap = new Map(categories.map(item => [item._id, item.name]));
					this.vtabs = categories.map(item => item.name);
					// 遍历文章数据，将 category_id 转换为对应的分类名称
					const articlesWithCategoryNames = articles.map(article => ({
						...article,
						category_name: categoryMap.get(article.category_id) || '未知分类' // 如果找不到分类，设置默认值
					}));

					// 打印结果
					console.log('转换后的文章数据:', articlesWithCategoryNames);

					const tabs = articlesWithCategoryNames.map(item => ({
						name: item.category_name,
						title: item.title,
						img: item.thumbnail[0], // 默认图片
						descr: item.publish_date,
						id: item._id
					}));

					// 将内容按照类别进行分组
					const groupedContents = tabs.reduce((acc, content) => {
						if (!acc[content.name]) {
							acc[content.name] = [];
						}
						acc[content.name].push(content);
						return acc;
					}, {});
					this.contents = groupedContents;
					// 获取当前 tab 的分类名称，并从 groupedContents 获取内容
					const activeCategory = this.vtabs[this.activeTab]; // 获取当前 tab 的类别
					this.content = this.contents[activeCategory] || []; // 获取该类别下的所有内容
					this.content = this.contents[this.vtabs[this.activeTab]] || [];

				} catch (error) {
					console.error('查询失败:', error);
				}
			},
			hrefText(value) {
				console.log(value, url)
				let url = '/pages/law/richText/richText?_id=' + value.id;
				this.fui.href(url)
			},
			onTabClick(e) {
				const index = e.index;
				this.activeTab = index;
				this.content = this.contents[this.vtabs[this.activeTab]] || []; // 更新当前 tab 下的内容
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
		font-weight: normal;
	}

	.fui-vtabs-content__item {
		width: 100%;
		/* padding: 0 20rpx; */
		box-sizing: border-box;
		overflow: hidden;
	}

	.fui-img {
		width: 100%;
		height: 268rpx;
		display: block;
		margin-top: 24rpx;
	}

	.fui-content--box {
		width: 100%;
		padding: 30rpx 24rpx 40rpx;
		box-sizing: border-box;
	}

	.fui-title {
		display: block;
		font-size: 32rpx;
		font-weight: bold;
	}

	.fui-descr {
		display: block;
		font-size: 24rpx;
		padding-top: 24rpx;
	}
</style>