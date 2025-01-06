<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3 7  89）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<fui-index-list isSrc :listData="lists" @init="init" @click="itemClick">
		<fui-search-bar @search="search"></fui-search-bar>
		<template v-slot:footer>
			<fui-loadmore v-if="!show"></fui-loadmore>
			<fui-divider text="66个朋友及联系人" v-if="show"></fui-divider>
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
				user:{}
			}
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.show = true;
			// }, 500)
		},
		methods: {
			init() {
				this.show = true;
			},
			search(e) {
				this.fui.toast(`搜索：${e.detail.value}`)
				//相关逻辑自行处理
				// ...
			},
			itemClick(e) {
				this.user=e;
				this.tips = '';
				this.isCancel = true;
				this.itemList = ['查看', '收藏']
				this.theme = 'dark'
				setTimeout(() => {
					this.showAc = true
				}, 50)
				console.log(e)
			},
			itemAcClick(e) {
				console.log(e)
				if (e.text == '查看') {
					console.log(this.user.text)
					this.fui.href("/pages/law/skeleton/skeleton?index=2&title=" + e.text)
				} else {
					this.fui.toast('收藏成功')
				}
				this.cancel()
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