<template>
	<view class="fui-wrap">
		<view class="fui-page__bd">
			<!-- 布局内容 start -->
			<!-- app-nvue、字节跳动小程序、飞书小程序不支持 previous-margin、next-margin-->
			<fui-swiper-dot :items="items" :current="current2" :styles="styles">
				<view class="fui-cardswiper__box">
					<swiper class="fui-card__swiper-wrap" @change="change2" circular :indicator-dots="false" autoplay
						:interval="5000" :duration="150">
						<swiper-item v-for="(item,index) in items" :key="index" class="fui-cs__swiper-item">
							<view class="fui-cardswiper__item">
								<image :src="item.bannerfile.url" class="fui-cardswiper__img"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</fui-swiper-dot>
			<!-- 快速咨询 -->
			<view class="fui-section__title">快速咨询</view>
			<view class="fui-page-bd fui-page__spacing fui-layout__item">
				<view class="fui-template__item" @tap="href(item)" v-for="(item,index) in templateData" :key="index">
					<view class="fui-template__item-inner" :style="{background:item.background}">
						<image class="fui-icon" :src="`${resUrl}/template/light/icon_${item.src}_3x.png`"
							mode="widthFix"></image>
						<view class="fui-name__cn">{{item.cn}}</view>
						<view class="fui-name__en">{{item.en}}</view>
					</view>
				</view>
			</view>
			<!-- 咨询类型 -->
			<view class="fui-section__title">咨询类型</view>
			<view style="display: none;">
				<fui-card>
					<fui-grid :square="false" :columns="5">
						<fui-grid-item v-for="(item,index) in nums" :key="index">
							<view class="fui-grid__cell fui-padding" @click="handleNums(item)">
								<image src="/static/images/common/icon_tabbar_2x.png" class="fui-icon__2x"
									mode="widthFix">
								</image>
								<text>Grid</text>
							</view>
						</fui-grid-item>
					</fui-grid>
				</fui-card>
			</view>

			<view class="fui-card__wrap">
				<fui-card>
					<view>
						<fui-horizontal-scroll>
							<view>
								<view class="fui-list" :class="{'fui-mtop':index!==0}" v-for="(list,index) in menuList"
									:key="index">
									<view class="fui-list--item fui-mr--52" @click="handleNums(item)"
										v-for="(item,idx) in list" :key="item.name">
										<fui-lazyload background="transparent" marginBottom="12" :width="96"
											:height="96" :src="item.img.path" mode="aspectFill">
										</fui-lazyload>
										<fui-text un-shrink :text="item.name" color="#888" size="24"></fui-text>
									</view>
								</view>
							</view>
						</fui-horizontal-scroll>
					</view>
				</fui-card>
			</view>

			<!-- 推荐律师 -->
			<view class="fui-section__title">推荐律师</view>
			<view>
				<fui-card>
					<view class="fui-card__wrap">
						<fui-list-cell background="transparent" arrow :bottomBorder="false" :highlight="false"
							:padding="['24rpx','24rpx','48rpx']">
							<view class="fui-card__header">
								<fui-text text="推荐律师" :size="28" fontWeight="bold"></fui-text>
								<fui-text text="查看全部" :size="26" type="gray" @click="hrefIndex"></fui-text>
							</view>
						</fui-list-cell>
						<scroll-view :scroll-x="true" :show-scrollbar="false" class="fui-scroll__view">
							<view class="fui-cell__list">
								<view class="fui-list__item" v-for="(item,index) in records" :key="index"
									@click="jump(item)">
									<fui-avatar :src="item.personal_photo.path" marginBottom="20"></fui-avatar>
									<fui-overflow-hidden :text="item.lawyer_name" align="center" :size="26"
										width="128rpx">
									</fui-overflow-hidden>
								</view>
							</view>
						</scroll-view>
					</view>
				</fui-card>
			</view>



			<!-- 推荐案例 -->
			<view class="fui-section__title">推荐案例</view>
			<fui-card imageRadius="50%" title="推荐案例" color="#465CFF" tag="23小时前" :headerLine="false"
				showBorder>
				<view class="fui-list__item-card" @click="hrefTabs">
					<image class="fui-cover" :src="`${resUrl}/cooperate/light/img_banner_3x.png`" mode="widthFix">
					</image>
					<view class="fui-list__title">客户提供的成功解决方案，涵盖各行业的实际应用和最佳实践。</view>
				</view>
			</fui-card>
			<!-- 布局内容 end -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				current2: 0,
				items: [{
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_1.png'
				}, {
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_2.png'
				}, {
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_3.png'
				}],
				styles: {
					activeBackground: '#FFB703',
					activeWidth: 30
				},
				resUrl: this.fui.resUrl(),
				nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				arrs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				templateData: [{
					cn: '免费咨询',
					en: 'Consulting',
					src: 'login',
					background: '#FFF7E5',
					page: '/pages/nav/login-nav/login-nav'
				}, {
					cn: '找律师',
					en: 'Find a lawyer',
					src: 'education',
					background: '#FFF4F4',
					page: ''
				}, ],
				records: [{
					avatar: '/static/images/common/logo.png',
					name: '独留清风醉'
				}, {
					avatar: '/static/images/common/img_logo.png',
					name: '醉酒鞭名马'
				}, {
					avatar: '/static/images/help/light/icon_assembly_3x.png',
					name: '久居孤海'
				}, {
					avatar: '/static/images/common/logo.png',
					name: '张大大'
				}, {
					avatar: '/static/images/common/img_logo.png',
					name: '李思思'
				}, {
					avatar: '/static/images/help/light/icon_bug_3x.png',
					name: '邹小小'
				}, {
					avatar: '/static/images/common/logo.png',
					name: '独留清风醉'
				}, {
					avatar: '/static/images/common/img_logo.png',
					name: '醉酒鞭名马'
				}, {
					avatar: '/static/images/help/light/icon_member_relevant_3x.png',
					name: '久居孤海'
				}],
				menuList: [
					[{
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '百亿补贴'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '查快递'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '实时低价'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '摇现金'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '家电清洗'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '活动日历'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '资质规则'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '限时秒杀'
					}],
					[{
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '签到'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '医药馆'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '断码清仓'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '爱回收'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '买车养车'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '家用电器'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '免费水果'
					}, {
						icon: '/static/images/common/icon_tabbar_2x.png',
						text: '充值中心'
					}]
				]

			}
		},
		created() {
			this.getBanners()
			this.getLegalCategories()
			this.getLawyers()
		},
		methods: {
			handleNums(e) {
				console.log(e)
				const url = "/pages/law/panel/panel?name=" + e.name
				uni.fui.href(url)
			},
			async getBanners() {
				try {
					const res = await uniCloud.database().collection('opendb-banner').get();
					const arr = res.result.data
					if (arr.length > 0) {
						this.items = arr; // 保存查询到的数据
					} else {
						console.log('No data found in opendb-banner.');
					}
				} catch (error) {
					console.error('Error querying opendb-banner:', error);
				}
			},
			async getLegalCategories() {
				try {
					// 查询 legal-categories 数据库
					const res = await uniCloud.database().collection('legal-categories').get();
					let arr = res.result.data
					if (arr.length > 0) {
						// 将数据分成两个数组
						this.menuList = this.splitIntoChunks(arr, Math.ceil(arr.length / 2));
					} else {
						console.log('未查询到任何数据');
					}
				} catch (error) {
					console.error('查询 legal-categories 失败:', error);
				}
			},
			async getLawyers() {
				try {
					const res = await uniCloud.database().collection('lawyers').where({
						is_featured: true
					}).get();
					let arr = res.result.data
					if (arr.length) {
						this.records = arr; // 提取 data 部分
						console.log('查询结果:', this.records);
					} else {
						console.error('查询失败，没有结果:', res);
					}
				} catch (error) {
					console.error('查询 lawyers 数据库失败:', error);
				}
			},
			// 将数据分成两个数组
			splitIntoChunks(data, chunkSize) {
				const result = [];
				for (let i = 0; i < data.length; i += chunkSize) {
					result.push(data.slice(i, i + chunkSize));
				}
				return result;
			},
			jump(e) {
				console.log(e)
				this.fui.href("/pages/law/skeleton/skeleton?index=2&_id=" + e._id)
			},
			hrefTabs() {
				// let url = '/pages/law/vtabs/vtabs';
				let url = '/pages/law/vtabs/vtabs-B';
				this.fui.href(url)
			},
			hrefIndex() {
				let url = '/pages/law/indexList/indexList-A';
				this.fui.href(url)
			},
			vip() {
				const url = "/pages/my/qa/qa?index=2&title=VIP专属内容"
				uni.fui.href(url)
			},
			href(e) {
				console.log(e)
				if (e.cn == '找律师') {
					const url = "/pages/law/indexList/indexList-A"
					uni.fui.href(url)
				} else if (e.cn == '免费咨询') {
					const url = "/pages/law/panel/panel"
					uni.fui.href(url)
				}
			},
			change(e) {
				this.current = e.detail.current;
			},
			change2(e) {
				this.current2 = e.detail.current;
			}
		}
	}
</script>

<style>
	/* 推荐律师 */
	.fui-list {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.fui-list--item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-right: 24rpx;
	}

	.fui-mr--52 {
		margin-right: 52rpx;
	}

	.fui-list--item:last-child {
		margin-right: 0;
	}

	.fui-mtop {
		margin-top: 24rpx;
	}

	/* 推荐案例 */
	.fui-list__item-card {
		width: 100%;
		height: 385rpx;
		position: relative;
		background: #eee;
	}

	.fui-cover {
		width: 100%;
		height: 385rpx;
		display: block;
	}

	.fui-list__title {
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		font-weight: 500;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
	}

	/* 推荐律师 */
	.fui-card__wrap {
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fff;
	}

	.fui-card__header {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}

	.fui-scroll__view {
		flex-direction: row;
		overflow: hidden;
	}


	.fui-cell__list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.fui-list__item {
		width: 160rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		align-items: center;
		padding: 0 16rpx 24rpx;
	}

	/* 每个分栏的标题 */
	.fui-layout__item {
		margin-bottom: 32rpx;
		box-sizing: border-box;
	}

	/* 分类 */
	.fui-page-bd {
		display: flex;
		flex-wrap: wrap;
	}

	.fui-section__title {
		margin-left: 32rpx;
		margin-top: 34rpx;
	}

	.fui-grid__cell {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		font-weight: 400;
	}

	.fui-padding {
		padding: 36rpx 0;
	}

	.fui-icon {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 16rpx;
	}

	.fui-icon__2x {
		width: 64rpx;
		height: 64rpx;
		margin-bottom: 16rpx;
	}

	.fui-flex__column {
		flex: 1;
	}

	/* 咨询 */
	.fui-page-bd {
		display: flex;
		flex-wrap: wrap;
	}

	.fui-template__item {
		width: 50%;
		margin-bottom: 32rpx;
		box-sizing: border-box;
	}

	.fui-template__item:nth-of-type(odd) {
		padding-right: 15rpx;
	}

	.fui-template__item:nth-of-type(even) {
		padding-left: 15rpx;
	}

	.fui-template__item-inner {
		height: 176rpx;
		border-radius: 24rpx;
		overflow: hidden;
		position: relative;
		padding-left: 32rpx;
		box-sizing: border-box;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.fui-icon {
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		right: 32rpx;
		top: 32rpx;
	}

	.fui-name__cn {
		line-height: 32rpx;
		padding-top: 62rpx;
	}

	.fui-name__en {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #B2B2B2;
		padding-top: 16rpx;
	}

	/* #ifndef APP-NVUE */
	page {
		font-weight: normal;
	}

	/* #endif */
	.fui-wrap {
		padding-bottom: 64rpx;
	}

	.fui-align__center {
		flex-direction: row;
	}

	.fui-btn__box {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
	}

	/* 布局内容样式 start */

	.fui-card__swiper {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: 320rpx;
	}

	.fui-cardswiper__box {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		height: 320rpx;
		flex-direction: row;
		justify-content: center;
	}

	.fui-card__swiper-wrap {
		width: 640rpx;
		height: 320rpx;
	}

	.fui-cs__swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.fui-cardswiper__item {
		width: 640rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		transition-timing-function: linear;
		transition-duration: .1s;
		transition-property: transform;
		height: 320rpx;
		background: #f8f8f8;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.fui-cardswiper__img {
		width: 640rpx;
		height: 320rpx;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		border-radius: 24rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-cardswiper__scale {
		transform: scale3d(.9, .9, 1);
	}

	/* #endif */

	/* 布局内容样式 end */
</style><template>
	<view class="fui-wrap">
		<view class="fui-page__bd">
			<!-- 布局内容 start -->
			<!-- app-nvue、字节跳动小程序、飞书小程序不支持 previous-margin、next-margin-->
			<fui-swiper-dot :items="items" :current="current2" :styles="styles">
				<view class="fui-cardswiper__box">
					<swiper class="fui-card__swiper-wrap" @change="change2" circular :indicator-dots="false" autoplay
						:interval="5000" :duration="150">
						<swiper-item v-for="(item,index) in items" :key="index" class="fui-cs__swiper-item">
							<view class="fui-cardswiper__item">
								<image :src="item.src" class="fui-cardswiper__img"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</fui-swiper-dot>
			<!-- 快速咨询 -->
			<view class="fui-section__title">快速咨询</view>
			<view class="fui-page-bd fui-page__spacing fui-layout__item">
				<view class="fui-template__item" @tap="href(item)" v-for="(item,index) in templateData" :key="index">
					<view class="fui-template__item-inner" :style="{background:item.background}">
						<image class="fui-icon" :src="`${resUrl}/template/light/icon_${item.src}_3x.png`"
							mode="widthFix"></image>
						<view class="fui-name__cn">{{item.cn}}</view>
						<view class="fui-name__en">{{item.en}}</view>
					</view>
				</view>
			</view>
			<!-- 咨询类型 -->
			<view class="fui-section__title">咨询类型</view>
			<view >
				<fui-card>
					<fui-grid :square="false" :columns="5">
						<fui-grid-item v-for="(item,index) in nums" :key="index">
							<view class="fui-grid__cell fui-padding">
								<image src="/static/images/common/icon_tabbar_2x.png" class="fui-icon__2x" mode="widthFix">
								</image>
								<text>Grid</text>
							</view>
						</fui-grid-item>
					</fui-grid>
				</fui-card>
			</view>
			<!-- 推荐律师 -->
			<view class="fui-section__title">推荐律师</view>
			<view>
				<fui-card>
					<view class="fui-card__wrap">
						<fui-list-cell background="transparent" arrow :bottomBorder="false" :highlight="false"
							:padding="['24rpx','24rpx','48rpx']">
							<view class="fui-card__header">
								<fui-text text="推荐律师" :size="28" fontWeight="bold"></fui-text>
								<fui-text text="查看全部" :size="26" type="gray" @click="hrefIndex"></fui-text>
							</view>
						</fui-list-cell>
						<scroll-view :scroll-x="true" :show-scrollbar="false" class="fui-scroll__view">
							<view class="fui-cell__list">
								<view class="fui-list__item" v-for="(item,index) in records" :key="index" @click="jump(item)">
									<fui-avatar :src="item.avatar" marginBottom="20"></fui-avatar>
									<fui-overflow-hidden :text="item.name" align="center" :size="26" width="128rpx">
									</fui-overflow-hidden>
								</view>
							</view>
						</scroll-view>
					</view>
				</fui-card>
			</view>
			
			<!-- 推荐案例 -->
			<view class="fui-section__title">推荐案例</view>
			<fui-card :src="src2" imageRadius="50%" title="推荐案例" color="#465CFF" tag="23小时前" :headerLine="false" showBorder>
				<view class="fui-list__item-card" @click="hrefTabs">
					<image class="fui-cover" :src="`${resUrl}/cooperate/light/img_banner_3x.png`" mode="widthFix">
					</image>
					<view class="fui-list__title">客户提供的成功解决方案，涵盖各行业的实际应用和最佳实践。</view>
				</view>
			</fui-card>
			<!-- 布局内容 end -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				current2: 0,
				items: [{
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_1.png'
				}, {
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_2.png'
				}, {
					src: 'https://res.firstui.cn/static/images/component/sc/img_sc_3.png'
				}],
				styles: {
					activeBackground: '#FFB703',
					activeWidth: 30
				},
				resUrl:this.fui.resUrl(),
				nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				arrs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
				templateData:[
					{
						cn: '免费咨询',
						en: 'Consulting',
						src: 'login',
						background: '#FFF7E5',
						page: '/pages/nav/login-nav/login-nav'
					}, {
						cn: '找律师',
						en: 'Find a lawyer',
						src: 'education',
						background: '#FFF4F4',
						page: ''
					},
				],
				records:[{
							avatar: '/static/images/common/logo.png',
							name: '独留清风醉'
						}, {
							avatar: '/static/images/common/img_logo.png',
							name: '醉酒鞭名马'
						}, {
							avatar: '/static/images/help/light/icon_assembly_3x.png',
							name: '久居孤海'
						}, {
							avatar: '/static/images/common/logo.png',
							name: '张大大'
						}, {
							avatar: '/static/images/common/img_logo.png',
							name: '李思思'
						}, {
							avatar: '/static/images/help/light/icon_bug_3x.png',
							name: '邹小小'
						}, {
							avatar: '/static/images/common/logo.png',
							name: '独留清风醉'
						}, {
							avatar: '/static/images/common/img_logo.png',
							name: '醉酒鞭名马'
						}, {
							avatar: '/static/images/help/light/icon_member_relevant_3x.png',
							name: '久居孤海'
						}]
			}
		},
		methods: {
			jump(e){
				console.log(e)
				this.fui.href("/pages/law/skeleton/skeleton?index=2&title="+e.name)
			},
			hrefTabs() {
				let url = '/pages/law/vtabs/vtabs';
				this.fui.href(url)
			},
			hrefIndex() {
				let url = '/pages/law/indexList/indexList-A';
				this.fui.href(url)
			},
			vip() {
				const url = "/pages/my/qa/qa?index=2&title=VIP专属内容"
				uni.fui.href(url)
			},
			href(e) {
				console.log(e)
				if(e.cn=='找律师'){
					const url = "/pages/law/indexList/indexList-A"
					uni.fui.href(url)
				}
			},
			change(e) {
				this.current = e.detail.current;
			},
			change2(e) {
				this.current2 = e.detail.current;
			}
		}
	}
</script>

<style>
	/* 推荐案例 */
	.fui-list__item-card {
		width: 100%;
		height: 385rpx;
		position: relative;
		background: #eee;
	}
	.fui-cover {
		width: 100%;
		height: 385rpx;
		display: block;
	}
	.fui-list__title {
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		font-weight: 500;
		padding: 24rpx 20rpx;
		box-sizing: border-box;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
	}
	/* 推荐律师 */
	.fui-card__wrap {
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fff;
	}
	
	.fui-card__header {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
	}
	
	.fui-scroll__view {
		flex-direction: row;
		overflow: hidden;
	}
	
	
	.fui-cell__list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}
	
	.fui-list__item {
		width: 160rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: column;
		align-items: center;
		padding: 0 16rpx 24rpx;
	}
	/* 每个分栏的标题 */
	.fui-layout__item {
		margin-bottom: 32rpx;
		box-sizing: border-box;
	}
	/* 分类 */
	.fui-page-bd {
		display: flex;
		flex-wrap: wrap;
	}
	.fui-section__title {
		margin-left: 32rpx;
		margin-top: 34rpx;
	}
	
	.fui-grid__cell {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		font-size: 28rpx;
		font-weight: 400;
	}
	
	.fui-padding {
		padding: 36rpx 0;
	}
	
	.fui-icon {
		width: 96rpx;
		height: 96rpx;
		margin-bottom: 16rpx;
	}
	
	.fui-icon__2x {
		width: 64rpx;
		height: 64rpx;
		margin-bottom: 16rpx;
	}
	
	.fui-flex__column {
		flex: 1;
	}
	/* 咨询 */
	.fui-page-bd {
		display: flex;
		flex-wrap: wrap;
	}
	
	.fui-template__item {
		width: 50%;
		margin-bottom: 32rpx;
		box-sizing: border-box;
	}
	
	.fui-template__item:nth-of-type(odd) {
		padding-right: 15rpx;
	}
	
	.fui-template__item:nth-of-type(even) {
		padding-left: 15rpx;
	}
	
	.fui-template__item-inner {
		height: 176rpx;
		border-radius: 24rpx;
		overflow: hidden;
		position: relative;
		padding-left: 32rpx;
		box-sizing: border-box;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	.fui-icon {
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		right: 32rpx;
		top: 32rpx;
	}
	.fui-name__cn {
		line-height: 32rpx;
		padding-top: 62rpx;
	}
	
	.fui-name__en {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #B2B2B2;
		padding-top: 16rpx;
	}
	/* #ifndef APP-NVUE */
	page {
		font-weight: normal;
	}

	/* #endif */
	.fui-wrap {
		padding-bottom: 64rpx;
	}

	.fui-align__center {
		flex-direction: row;
	}

	.fui-btn__box {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
	}

	/* 布局内容样式 start */

	.fui-card__swiper {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: 320rpx;
	}

	.fui-cardswiper__box {
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		height: 320rpx;
		flex-direction: row;
		justify-content: center;
	}

	.fui-card__swiper-wrap {
		width: 640rpx;
		height: 320rpx;
	}

	.fui-cs__swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.fui-cardswiper__item {
		width: 640rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		transition-timing-function: linear;
		transition-duration: .1s;
		transition-property:transform ;
		height: 320rpx;
		background: #f8f8f8;
		align-items: center;
		justify-content: center;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.fui-cardswiper__img {
		width: 640rpx;
		height: 320rpx;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		border-radius: 24rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-cardswiper__scale {
		transform: scale3d(.9, .9, 1);
	}

	/* #endif */

	/* 布局内容样式 end */
	
</style>
