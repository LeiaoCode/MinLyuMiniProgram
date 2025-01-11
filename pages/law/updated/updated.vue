<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3  78 9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap fui-page__bd">
		<view v-for="(item, index) in records" :key="index">
			<fui-list-cell topBorder @click="itemClick(item)" :bottomLeft="104">
				<view class="fui-align__center">
					<image class="fui-list__icon" :src="item.src || '/static/images/common/icon_tabbar_3x.png'"
						mode="widthFix">
					</image>
					<text>{{ item.text || '摘要信息' }}</text>
				</view>

			</fui-list-cell>
		</view>

		<fui-actionsheet :show="showAc" :tips="tips" :itemList="itemList" @click="itemAcClick"
			@cancel="cancel"></fui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logs: [{
					date: '2024.06.11',
					version: 'V2.4.0'
				}, {
					date: '2024.02.19',
					version: 'V2.3.0'
				}],
				buttons: [{
					text: '查看',
					background: '#465CFF'
				}, {
					text: '取消收藏',
					background: '#FF2B2B'
				}],
				itemList: [{
					text: '退出登录',
					color: '#FF2B2B'
				}],
				showAc: false,
				tips: '退出后不会删除任何历史数据，下次登录依然可以使用本账号。',
				records: [],
				user: ''
			}
		},
		created() {
			this.getFavorites()
		},
		methods: {
			async itemClick(e) {
				this.user = e;
				console.log(this.user)
				this.tips = '';
				this.isCancel = true;
				// 动态设置菜单项
				this.itemList = ['查看', '取消收藏'];
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
				}
				this.cancel()
			},
			cancel() {
				this.showAc = false
			},
			// 获取收藏的用户列表
			async getFavorites() {
				try {
					const result = await new Promise((resolve, reject) => {
						uni.getStorage({
							key: "favorites",
							success(e) {
								resolve(e.data || []); // 返回存储的数据，或者空数组
							},
							fail() {
								resolve([]); // 如果没有存储数据，返回空数组
							}
						});
					});
					this.records = result;
				} catch (error) {
					console.error("获取收藏列表失败:", error);
					this.records = []; // 如果发生错误，返回空数组
				}
			},
			// 从收藏中移除
			async removeFromFavorites(userId) {
				// 过滤掉要移除的用户
				let favorites = this.records.filter(fav => fav.id !== userId);
				// 保存更新后的收藏列表到 localStorage
				uni.setStorage({
					key: "favorites",
					data: favorites
				});
				this.fui.toast("取消收藏成功");
				await this.refreshPage()
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
			onClick(e) {
				console.log(e)
				if (e.item.text == '取消收藏') {
					this.fui.toast('取消收藏成功!')
				} else {

				}
			},
			onTap(e) {
				console.log(e)
				//列表点击事件，此处也可关闭菜单
				this.fui.toast('滑动可以取消收藏～')
			},
			detail(date, version) {
				this.fui.href(`../log/log?date=${date}&version=${version}`)
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
		font-weight: normal;
		padding-bottom: 64rpx;
	}

	.fui-wrap {
		padding-top: 32rpx;
	}

	.fui-title {
		font-size: 28rpx;
		font-weight: 500;
	}

	.fui-date {
		font-size: 24rpx;
		color: #B2B2B2;
		padding-top: 8rpx;
	}

	.fui-section__title {
		margin-left: 32rpx;
	}

	.fui-list__item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fui-item__img-box {
		position: relative;
		margin-right: 24rpx;
	}

	.fui-item__img {
		width: 96rpx;
		height: 96rpx;
		display: block;
	}

	.fui-list__icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 24rpx;
	}
</style>