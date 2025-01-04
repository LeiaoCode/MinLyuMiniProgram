<template>
	<view class="fui-wrap">
		<view class="fui-page__bd">
			<view class="fui-sk__wrap fui-round">骨架节点</view>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">擅长类型</view>
			<view class="fui-align__center">
				<fui-tag text="标签一" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签二" type="danger" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签三" type="success" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签四" type="warning" margin-bottom="24" margin-right="24"></fui-tag>
				<fui-tag text="标签五" type="purple" margin-bottom="24"></fui-tag>
			</view>
			<view class="fui-section__title">律师简介</view>
			<fui-alert type="warn" isLeft spacing title="An info alert" size="28rpx" :marginTop="24">
				<fui-icon name="evaluate" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<view class="fui-section__title">律师位置</view>
			<fui-alert type="warn" isLeft spacing title="An info alert" size="28rpx" :marginTop="24">
				<fui-icon name="location-fill" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<fui-divider backgroundColor="#fff" dividerColor="#F1F4FA" color="#465CFF" text="联系方式" :size="28"></fui-divider>
			<view class="fui-page__bd">
				<view class="fui-contacts__box">
					<view class="fui-contacts__item" v-for="(item,index) in contacts" :key="index"
						@tap="copy($event,item.value,item.text)">
						<image class="fui-icon" :src="`/static/images/cooperate/light/icon_${item.icon}_3x.png`"></image>
						<view class="fui-title">{{item.text}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $fui from '@/components/firstui/fui-clipboard';
	export default {
		data() {
			return {
				show: true,
				contacts: [ {
					icon: 'douyin',
					text: '抖音',
					value: '1223213'
				},{
					icon: 'weixin',
					text: '微信',
					value: 'wx_firstui'
				}, {
					icon: 'qq',
					text: 'QQ',
					value: '3560662983'
				},{
					icon: 'email',
					text: '邮箱',
					value: 'firstui@126.com'
				}]
			}
		},
		onReady() {
			setTimeout(() => {
				this.show = false
			}, 2000)
		},
		methods: {
			copy(e, content, title) {
				title = title || '链接'
				$fui.getClipboardData(content, res => {
					this.fui.toast(`${title}复制成功`);
				}, e);
			}
		}
	}
</script>

<style>
	.fui-sk__wrap {
		background: #16AB60;
		color: #fff;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx auto;
	}

	.fui-section__title {
		margin-left: 32rpx;
		margin-top: 34rpx;
	}

	.fui-align__center {
		flex-wrap: wrap;
	}

	.fui-close__icon {
		display: flex;
		align-items: center;
		padding: 6rpx 0 4rpx 24rpx;
	}
	
	/* 联系方式 */
	
	.fui-page__bd {
		background-color: #fff;
	}
	
	.fui-menu__icon {
		width: 96rpx;
		height: 96rpx;
		display: block;
		margin-bottom: 16rpx;
	}
	
	.fui-contacts__box {
		width: 100%;
		padding: 32rpx 32rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	
	.fui-contacts__item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	
	.fui-icon {
		width: 96rpx;
		height: 96rpx;
	}
	
	.fui-title {
		font-size: 28rpx;
		color: #333333;
		padding-top: 16rpx;
	}
	
	.fui-desc {
		font-size: 24rpx;
		font-weight: 400;
		color: #7F7F7F;
		line-height: 48rpx;
		width: 100%;
		padding: 0 64rpx;
		box-sizing: border-box;
		text-align: center;
	}
</style>