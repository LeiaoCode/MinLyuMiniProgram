<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：3 7  89）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<fui-index-list isSrc :listData="lists" @init="init" @click="itemClick">
		<fui-search-bar @search="search"></fui-search-bar>
		<template v-slot:footer>
			<fui-loadmore v-if="!show"></fui-loadmore>
			<fui-divider text="66个朋友及联系人" v-if="show"></fui-divider>
		</template>
	</fui-index-list>
</template>

<script>
	import lists from './index.list.js'
	export default {
		data() {
			return {
				//如果是请求数据返回，返回后直接整体赋值给lists（注意数据格式正确）
				lists: lists,
				show: false
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
				console.log(e)
				this.fui.href("/pages/law/skeleton/skeleton?index=2&title="+e.text)
			}
		}
	}
</script>

<style>
	page {
		font-weight: normal;
	}
</style>