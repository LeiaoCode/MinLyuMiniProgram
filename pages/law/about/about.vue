<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：   3789）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<view class="fui-logo__box">
			<image src="/static/images/law/logo.jpg" class="fui-logo" mode="widthFix"></image>
			<view class="fui-title">民律在线</view>
			<view class="fui-version">Version 5.2.1</view>
		</view>

		<view class="fui-page__bd">
			<view class="fui-desc">
				<text class="fui-mr">民律在线</text> 是一款专注于法律咨询的高效小程序，致力于为用户提供便捷、专业的法律服务。无论是日常法律问题，还是专业的法律诉讼问题，民律在线 都能为您提供及时、准确的解答。通过集成的法律知识库和专家在线服务，用户可以快速获得法律咨询，避免复杂的法律程序，提升问题解决效率。
			</view>
<!-- 			<fui-list-cell topBorder arrow @click="getLink">
				去STAR
			</fui-list-cell>
			<fui-list-cell arrow @click="href('../updated/updated')">
				功能介绍
			</fui-list-cell>
			<fui-list-cell bottomLeft="0" arrow @click="href('../vip/vip')">
				会员介绍
			</fui-list-cell> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import $fui from '@/components/firstui/fui-clipboard';
	export default {
		computed: mapState(['version','status']),
		data() {
			return {

			}
		},
		methods: {
			getLink(e) {
				// #ifdef MP-BAIDU
				 if(this.status==0){
					 this.fui.toast('暂不支持此功能~')
					 return;
				 }
				// #endif
				$fui.getClipboardData('https://github.com/FirstUI/FirstUI', res => {
					this.fui.toast('GitHub地址复制成功');
				}, e);
			},
			href(page){
				this.fui.href(page)
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
		font-weight: normal;
	}

	.fui-logo__box {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding-top: 64rpx;
		padding-bottom: 64rpx;
	}

	.fui-logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 24rpx;
	}

	.fui-title {
		font-size: 36rpx;
		padding-top: 24rpx;
	}

	.fui-version {
		padding-top: 8rpx;
		font-size: 24rpx;
		font-weight: 400;
	}
	.fui-desc {
		font-size: 28rpx;
		line-height: 56rpx;
		padding: 0 32rpx;
		margin-bottom: 64rpx;
		box-sizing: border-box;
		font-weight: 400;
	}

	.fui-mr {
		margin-right: 8rpx;
	}
</style>