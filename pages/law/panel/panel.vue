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
			<fui-data-tag :options="options" v-model="info.type" width="200" activeColor="#FFB703" borderColor="#FFB703"
				mark markColor="#FFB703"></fui-data-tag>
		</fui-wing-blank>
		<!-- 输入框 -->
		<view class="fui-section__title">详情</view>
		<view class="fui-textarea__box">
			<fui-textarea v-model="info.infoText" :radius="24" textareaBorder border-color="#FFB703"
				background-color="#f8f8f8" placeholder="请输入内容"></fui-textarea>
		</view>

		<!-- 上传图片 -->
		<view class="fui-section__title">上传图片</view>
		<view class="fui-page__bd fui-page__spacing">
			<uni-file-picker limit="9" @input="input" title="最多选择9张图片" fileMediatype="image" mode="grid"
				@select="select" @progress="progress" @success="success" @fail="fail" :image-styles="imageStyles" />
		</view>

		<!-- 联系方式 -->
		<view class="fui-section__title">请留下您的电话或微信（联系方式不会另作他用，请您放心留下，便于律师联系您）</view>
		<fui-input placeholder="请输入手机号" v-model="info.phone">
			<template v-slot:left>
				<view class="fui-left__icon">
					<fui-icon name="mobile" color="#333" :size="48"></fui-icon>
				</view>
			</template>
		</fui-input>
		<fui-input placeholder="请输入姓名" v-model="info.name">
			<template v-slot:left>
				<view class="fui-left__icon">
					<fui-icon name="my-fill" color="#333" :size="48"></fui-icon>
				</view>
			</template>
		</fui-input>

		<view class="fui-section__title"></view>
		<view>
			<fui-wing-blank>
				<fui-button @click="submitForm" type="success">提交</fui-button>
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
				panelData2: '',
				dynamicContent: '',
				currentNumber: 68, // 初始数字
				options: ['选项一', '选项二', '选项三', '选项四'],
				val2: '选项三',
				// url: 'https://tt00c7767a9fcdf31001-env-p9tj8ovcem.tos-cn-beijing.volces.com',
				url: 'https://file-uniwmohuct-mp-189b8f7a-3099-4991-b41d-eceff1b9d040.oss-cn-zhangjiakou.aliyuncs.com',
				//上传状态，用于保存或其他操作时做判断
				status: '',
				//上传的图片地址列表
				urls: [],
				records: [],
				type: null,
				imageStyles: {
					width: '100px', // 图片宽度
					height: '100px', // 图片高度
					border: {
						color: "#007AFF", // 边框颜色
						width: 2, // 边框宽度
						style: 'dashed', // 边框样式 (可选 solid, dotted, dashed)
						radius: '8px' // 圆角半径
					},
					shadow: {
						color: "rgba(0, 0, 0, 0.1)", // 阴影颜色
						x: 0, // 水平偏移
						y: 2, // 垂直偏移
						blur: 8, // 模糊半径
					},
					background: "#f9f9f9" // 背景色
				},
				imageValue: [],
				info: {
					type: '',
					infoText: '',
					imageValue: [],
					userName: '',
					name: '',
					userId: '',
					phone: '',
				},
				randomLawyer: {}
			}
		},
		components: {
			fuiUpload
		},
		onLoad(e) {
			this.type = String(e.name) || 0;
			console.log(this.type === 'undefined')
		},
		created() {
			this.updateContent();
			this.getLegalCategories();
			this.getLawyers();
			setInterval(this.updateContent, this.getRandomTime());
		},
		methods: {
			input(e) {
				this.info.imageValue = e.map(file => file.fileID);
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			async getLawyers() {
				try {
					const res = await uniCloud.database().collection('lawyers').where({
						is_featured: true
					}).get();
					let arr = res.result.data
					if (arr.length) {
						// 随机选择一条数据
						const randomIndex = Math.floor(Math.random() * arr.length);
						this.randomLawyer = arr[randomIndex];
						console.log(this.randomLawyer)
						this.info.userId = this.randomLawyer._id
						this.info.userName = this.randomLawyer.lawyer_name
						// 构造 panelData2 数据
						this.panelData2 = {
							head: '快速咨询',
							src: this.randomLawyer.personal_photo.path ||
								'/static/images/common/logo.png', // 如果没有图片则使用默认图片
							title: this.randomLawyer.lawyer_name || '律师姓名', // 律师姓名
							desc: this.randomLawyer.lawyer_intro || '律师介绍' // 律师介绍
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
						console.log('将数据分成两个数组')
						this.options = arr.map(item => item.name);
						// 修改为更复杂的判断条件
						if (this.type !== 'undefined' && this.type !== null) {
							this.info.type = this.type;
						} else if (this.options.length > 0) {
							this.info.type = this.options[0];
						} else {
							this.info.type = "刑事案件"; // 如果 options 为空，使用默认值
						}
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
				console.log(this.imageValue)
				console.log(this.info)
				this.submitForm()
				// console.log(type)
				// this.fui.href(`/pages/law/result-eg/result-eg?type=${type}`)
			},
			itemClick(e) {
				console.log(e)
			},
			vip() {
				this.fui.href("/pages/my/qa/qa?index=2&title=VIP专属内容")
			},
			async submitForm() {
				console.log('sumbit')
				try {
					const db = uniCloud.database();
					const collection = db.collection('userInfo');
					// 插入数据库
					const res = await collection.add(this.info);
					console.log(res)
					if (res.result.code == 0) {
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
						this.fui.href('/pages/law/result-eg/result-eg?type=1')
					} else {
						throw new Error('提交失败');
					}
				} catch (err) {
					console.error('上传失败：', err);
					uni.showToast({
						title: '提交失败',
						icon: 'none'
					});
				}
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