<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3 7 8 9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title fui-align__center" @tap="vip">Parse <image
					src="/static/images/index/light/icon_member_3x.png"></image>
			</view>
			<view class="fui-page__desc">Parse 富文本解析，支持 html 或 markdown 解析。</view>
		</view>
		<view class="fui-page__bd">
			<!-- html 解析 -->
			<fui-parse-group @preview="preview" @atap="atap">
				<fui-parse :nodes="html"></fui-parse>
			</fui-parse-group>

			<!-- markdown 解析 -->
			<fui-parse-group :thBgcolor="false" @preview="preview">
				<fui-parse :nodes="md" language="md"></fui-parse>
			</fui-parse-group>
		</view>
	</view>
</template>

<script>
	import richtext from './index.js'
	export default {
		data() {
			return {
				html: richtext.html,
				md: richtext.md
			}
		},
		onLoad(options) {
			// options 中包含传递的参数
			console.log('传递的参数:', options);

			// 获取具体的参数值
			const id = options._id;
			console.log('获取的 _id 参数:', id);

			// 可以根据参数执行相关操作
			this.fetchDataById(id);
		},
		methods: {
			fetchDataById(id) {
				// 根据 id 执行逻辑，例如获取数据
				console.log('根据 ID 获取数据:', id);
			},
			vip() {
				this.fui.href("/pages/my/qa/qa?index=2&title=VIP专属内容")
			},
			preview(e) {
				console.log(e)
			},
			atap(e) {
				console.log(e)
				this.fui.toast(e)
			}
		}
	}
</script>

<style>
	.fui-page__bd {
		width: 100%;
		padding: 0 32rpx 96rpx;
		box-sizing: border-box;
	}
</style>