<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：37 8  9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<!-- 通知 -->
		<view class="fui-card__swiper-wrap">
			<fui-notice-bar :content="content" :speed="200" scrollable>
				<view class="fui-icon__box">
					<fui-icon name="notice" :size="36" color="#FF2B2B"></fui-icon>
				</view>
			</fui-notice-bar>
		</view>

		<view class="fui-card__swiper-wrap">
			<fui-card>
				<!-- 律师介绍 -->
				<view class="fui-page__bd">
					<fui-panel row-reverse :panelData="panelData2" :marginTop="24" :size="34"
						:descSize="26"></fui-panel>
				</view>
			</fui-card>
		</view>

		<!-- 法律类型 -->
		<view class="fui-section__title">法律类型</view>
		<fui-wing-blank>
			<fui-data-tag :options="options" v-model="val2" width="150" activeColor="#FFB703" borderColor="#FFB703" mark
				markColor="#FFB703"></fui-data-tag>
		</fui-wing-blank>
		<!-- 输入框 -->
		<view class="fui-section__title">详情</view>
		<view class="fui-page__spacing">
			<fui-input :marginTop="24" :radius="24" border-color="#FFB703" inputBorder placeholder="请输入文本"></fui-input>
		</view>

		<view class="fui-section__title"></view>
		<view>
			<fui-wing-blank>
				<fui-button type="success">提交</fui-button>
			</fui-wing-blank>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				panelData: {
					src: '/static/images/common/img_logo.png',
					title: '基础使用',
					desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。'
				},
				panelData2: {
					head: '快速咨询',
					src: '/static/images/common/logo.png',
					title: '律师姓名',
					desc: '律师介绍'
				},
				panelData3: {
					head: 'First UI介绍',
					list: [{
						src: '/static/images/common/logo.png',
						title: 'First UI组件库',
						desc: 'First UI 是一套基于uni-app开发的组件化、可复用、易扩展、低耦合的跨平台移动端UI 组件库。'
					}, {
						src: '/static/images/common/logo.png',
						title: 'First UI跨平台UI组件库',
						desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。'
					}]
				},
				panelData4: {
					head: '设置图片大小',
					list: [{
						src: '/static/images/common/img_logo.png',
						title: 'First UI组件库'
					}, {
						src: '/static/images/common/img_logo.png',
						title: 'First UI跨平台UI组件库'
					}]
				},
				panelData5: {
					head: '附加信息',
					list: [{
						title: 'First UI组件库',
						desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。',
						source: '开源中国',
						time: '2021-08-09'
					}, {
						title: 'First UI跨平台UI组件库',
						desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。',
						source: 'GitHub',
						time: '2021-08-09',
						extra: 'Apache License 2.0'
					}]
				},
				content: '当前界面咨询人数：68',
				options: ['选项一', '选项二', '选项三', '选项四'],
				val2: '选项三',
			}
		},
		methods: {
			itemClick(e) {
				console.log(e)
			},
			vip() {
				this.fui.href("/pages/my/qa/qa?index=2&title=VIP专属内容")
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}

	.fui-wrap {
		padding-bottom: 64rpx;
	}

	.fui-card__swiper-wrap {
		margin-top: 34rpx;
	}

	.fui-text__link {
		color: #465CFF;
		font-size: 32rpx;
	}

	.fui-icon__box {
		padding-left: 24rpx;
		padding-right: 12rpx;
	}

	.fui-section__title {
		margin-left: 32rpx;
		margin-top: 34rpx;
	}
</style>