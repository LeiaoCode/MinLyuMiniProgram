<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：37 8  9）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<!-- 通知 -->
		<view class="fui-card__swiper-wrap">
			<fui-notice-bar :content="dynamicContent" :speed="100" scrollable>
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
			<fui-data-tag :options="options" v-model="val2" width="200" activeColor="#FFB703" borderColor="#FFB703" mark
				markColor="#FFB703"></fui-data-tag>
		</fui-wing-blank>
		<!-- 输入框 -->
		<view class="fui-section__title">详情</view>
		<view class="fui-textarea__box">
			<fui-textarea :radius="24" textareaBorder border-color="#FFB703" background-color="#f8f8f8"
				placeholder="请输入内容"></fui-textarea>
		</view>

		<!-- 上传图片 -->
		<view class="fui-section__title">上传图片</view>
		<view class="fui-page__bd fui-page__spacing">
			<fui-upload :max="5" immediate :url="url" ref="upload" @success="success" @error="error"
				@complete="complete" @preview="preview">
			</fui-upload>
		</view>

		<!-- 联系方式 -->
		<view class="fui-section__title">请留下您的电话或微信（联系方式不会另作他用，请您放心留下，便于律师联系您）</view>
		<fui-input placeholder="请输入手机号">
			<template v-slot:left>
				<view class="fui-left__icon">
					<fui-icon name="mobile" color="#333" :size="48"></fui-icon>
				</view>
			</template>
		</fui-input>
		<fui-input placeholder="请输入姓名">
			<template v-slot:left>
				<view class="fui-left__icon">
					<fui-icon name="my-fill" color="#333" :size="48"></fui-icon>
				</view>
			</template>
		</fui-input>

		<view class="fui-section__title"></view>
		<view>
			<fui-wing-blank>
				<fui-button @click="href(1)" type="success">提交</fui-button>
			</fui-wing-blank>
		</view>


	</view>
</template>

<script>
	import fuiUpload from "@/components/firstui/fui-upload/fui-upload.vue"
	export default {
		data() {
			return {
				panelData: {
					src: '/static/images/common/img_logo.png',
					title: '基础使用',
					desc: 'First UI组件库，是基于uni-app开发的一款轻量、全面可靠的跨平台移动端组件库。'
				},
				panelData2:'',
				dynamicContent: '',
				currentNumber: 68, // 初始数字
				options: ['选项一', '选项二', '选项三', '选项四'],
				val2: '选项三',
				url: 'https://tt00c7767a9fcdf31001-env-p9tj8ovcem.tos-cn-beijing.volces.com',
				//上传状态，用于保存或其他操作时做判断
				status: '',
				//上传的图片地址列表
				urls: [],
				records: []
			}
		},
		components: {
			fuiUpload
		},
		created() {
			this.updateContent();
			this.getLegalCategories();
			this.getLawyers();
			setInterval(this.updateContent, this.getRandomTime());
		},
		methods: {
			async getLawyers() {
				try {
					const res = await uniCloud.database().collection('lawyers').where({
						is_featured: true
					}).get();
					let arr = res.result.data
					if (arr.length) {
						// 随机选择一条数据
						const randomIndex = Math.floor(Math.random() * arr.length);
						const randomLawyer = arr[randomIndex];
						console.log(randomLawyer)
						// 构造 panelData2 数据
						this.panelData2 = {
							head: '快速咨询',
							src: randomLawyer.personal_photo.path ||
								'/static/images/common/logo.png', // 如果没有图片则使用默认图片
							title: randomLawyer.name || '律师姓名', // 律师姓名
							desc: randomLawyer.lawyer_intro || '律师介绍' // 律师介绍
						};
					} else {
						console.error('查询失败，没有结果:', res);
					}
				} catch (error) {
					console.error('查询 lawyers 数据库失败:', error);
				}
			},
			async getLegalCategories() {
				try {
					// 查询 legal-categories 数据库
					const res = await uniCloud.database().collection('legal-categories').get();
					let arr = res.result.data
					if (arr.length > 0) {
						// 将数据分成两个数组
						console.log(arr)
						this.options = arr.map(item => item.name);;
						this.val2 = this.options[0]
					} else {
						console.log('未查询到任何数据');
					}
				} catch (error) {
					console.error('查询 legal-categories 失败:', error);
				}
			},
			updateContent() {
				const min = Math.max(this.currentNumber - 7, 1); // 限制最小值为 1
				const max = Math.min(this.currentNumber + 7, 100); // 限制最大值为 100
				this.currentNumber = Math.floor(Math.random() * (max - min + 1)) + min; // 在范围内生成随机数
				this.dynamicContent = `当前界面咨询人数：${this.currentNumber}`;
			},
			getRandomTime() {
				return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000; // 随机时间1秒到5秒
			},
			href(type) {
				// console.log(type)
				// this.fui.href(`/pages/law/result-eg/result-eg?type=${type}`)
				console.log(type)
				this.fui.href(`/pages/law/upload/upload`)
			},
			itemClick(e) {
				console.log(e)
			},
			vip() {
				this.fui.href("/pages/my/qa/qa?index=2&title=VIP专属内容")
			},
			success(e) {
				console.log(e)
				//上传成功回调，处理服务器返回数据【此处根据实际返回数据进行处理】
				let res = JSON.parse(e.res.data.replace(/\ufeff/g, "") || "{}")
				this.status = e.status
				if (res.data.url) {
					//处理结果返回给组件
					//data.url为上传成功后返回的图片地址
					//e.index为图片索引值
					this.$refs.upload.result(res.data.url, e.index)
				}
			},
			error(e) {
				console.log(e)
				this.status = e.status
			},
			complete(e) {
				console.log(e)
				this.status = e.status
				this.urls = e.urls
				if (this.status === 'success' && e.action === 'upload') {
					this.fui.toast('上传完成！')
					//已上传完成的图片列表 this.urls
					console.log(this.urls)
				}
			},
			preview(e) {
				// #ifdef MP-BAIDU
				this.preUrls = e.urls;
				this.current = e.index;
				setTimeout(() => {
					this.show = true;
				}, 50)
				// #endif
			},
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

	.fui-textarea__box {
		width: 100%;
		padding: 32rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.fui-left__icon {
		padding-right: 24rpx;
	}
</style>