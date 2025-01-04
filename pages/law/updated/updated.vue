<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3  78 9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap fui-page__bd">
		<fui-swipeaction-group>
			<fui-swipe-action :autoClose="false" :buttons="buttons" @click="onClick">
				<fui-list-cell :padding="['36rpx','32rpx']" :highlight="false" @click="onTap">
					<view class="fui-align__center">
						<view class="fui-item__img-box">
							<image class="fui-item__img" src="/static/images/common/icon_tabbar_3x.png" mode="widthFix">
							</image>
							<fui-badge absolute type="danger"></fui-badge>
						</view>
						<view>
							<view>联系人名称</view>
							<text class="fui-page__desc">摘要信息</text>
						</view>
					</view>
				</fui-list-cell>
			</fui-swipe-action>
			<fui-swipe-action :autoClose="false" :buttons="buttons" @click="onClick">
				<fui-list-cell :padding="['36rpx','32rpx']" :highlight="false" @click="onTap">
					<view class="fui-align__center">
						<view class="fui-item__img-box">
							<image class="fui-item__img" src="/static/images/common/icon_tabbar_3x.png" mode="widthFix">
							</image>
							<fui-badge absolute type="danger"></fui-badge>
						</view>
						<view>
							<view>联系人名称</view>
							<text class="fui-page__desc">摘要信息</text>
						</view>
					</view>
				</fui-list-cell>
			</fui-swipe-action>
		</fui-swipeaction-group>
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
					text: '取消收藏',
					background: '#FF2B2B'
				}]
			}
		},
		methods: {
			onClick(e) {
				console.log(e)
				this.fui.toast('取消收藏成功!')
			},
			onTap() {
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
</style>