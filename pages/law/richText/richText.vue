<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3 7 8 9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<view class="fui-page__hd">
			<view class="fui-page__title fui-align__center">{{text.title}}
			</view>
			<view class="fui-page__desc">{{ text.excerpt }}</view>
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
			<fui-divider text="没有更多了"></fui-divider>
		</view>
	</view>
</template>

<script>
	import {
		QuillDeltaToHtmlConverter
	} from 'quill-delta-to-html';
	import richtext from './index.js'
	export default {
		data() {
			return {
				// html: richtext.html,
				html: '',
				// md: richtext.md
				md: '',
				text: ''
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
			async fetchDataById(id) {
				try {
					const db = uniCloud.database();
					// 使用 where 方法查询特定 ID 的数据
					const res = await db.collection('uni-cms-articles')
						.where({
							_id: id
						})
						.get();
					const data = res.result.data;
					if (data.length > 0) {
						this.text = data[0]
						const delta = data[0].content.ops
						const converter = new QuillDeltaToHtmlConverter(delta, {});
						// 转换为 HTML
						this.html = converter.convert();
					} else {
						console.warn('未找到对应 ID 的数据:', id);
						return null;
					}
				} catch (error) {
					console.error('获取数据失败:', error);
				}
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