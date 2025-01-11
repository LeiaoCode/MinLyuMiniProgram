<template>
	<view class="fui-wrap">
		<view class="fui-page__bd">
			<fui-avatar class="fui-avatar__wrap" size="large" :src="records.personal_photo.path"></fui-avatar>
			<fui-divider dividerColor="#FFB703" color="#FFB703" :text="records.lawyer_name"></fui-divider>
		</view>
		<view class="fui-page__bd fui-page__spacing">
			<view class="fui-section__title">擅长类型</view>
			<view class="fui-align__center">
				<fui-tag v-for="(specialty, index) in records.specialty" :key="index" :text="specialty" type="success"
					margin-bottom="24" margin-right="24">
				</fui-tag>
			</view>
			<view class="fui-section__title">律师简介</view>
			<fui-alert type="warn" isLeft spacing :title="records.lawyer_intro" size="28rpx" :marginTop="24">
				<fui-icon name="evaluate" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<view class="fui-section__title">律师位置</view>
			<fui-alert type="warn" isLeft spacing :title="getRegionDisplay(records.practice_region)" size="28rpx" :marginTop="24">
				<fui-icon name="location-fill" :size="48" color="#fff"></fui-icon>
			</fui-alert>
			<fui-divider backgroundColor="#fff" dividerColor="#F1F4FA" color="#465CFF" text="联系方式"
				:size="28"></fui-divider>
			<view class="fui-page__bd">
				<view class="fui-contacts__box">
					<view class="fui-contacts__item" @tap="callPhone(records.contact_phone)">
						<image class="fui-icon" src="/static/images/cooperate/light/phon_code_3x.png"></image>
						<view class="fui-title">电话</view>
					</view>

					<view class="fui-contacts__item" @tap="copy($event, records.douyin_account, '抖音')">
						<image class="fui-icon" src="/static/images/cooperate/light/icon_douyin_3x.png"></image>
						<view class="fui-title">抖音号</view>
					</view>

					<view class="fui-contacts__item" @tap="copy($event, records.contact_phone, '微信')">
						<image class="fui-icon" src="/static/images/cooperate/light/icon_weixin_3x.png"></image>
						<view class="fui-title">微信</view>
					</view>

					<view class="fui-contacts__item" @tap="sendMsg(records.contact_phone)">
						<image class="fui-icon" src="/static/images/cooperate/light/icon_email_3x.png"></image>
						<view class="fui-title">短信</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $fui from '@/components/firstui/fui-clipboard';
	import area from '@/area/provinces.json'
	import regionUtils from "@/utils/regionUtils";
	export default {
		data() {
			return {
				show: true,
				records: {},
				legalSpecialtyMap: {},
				contacts: [{
					icon: 'douyin',
					text: '抖音',
					value: '1223213'
				}, {
					icon: 'weixin',
					text: '微信',
					value: 'wx_firstui'
				}, {
					icon: 'qq',
					text: 'QQ',
					value: '3560662983'
				}, {
					icon: 'email',
					text: '邮箱',
					value: 'firstui@126.com'
				}],
				objId: ''
			}
		},
		onReady() {
			setTimeout(() => {
				this.show = false
			}, 2000)
		},
		created() {
			// 页面加载时动态获取映射关系
			this.fetchLegalSpecialtyMap();
			this.getLawyers(this.objId)
		},
		onLoad(e) {
			this.objId = String(e._id) || 0;
		},
		methods: {
			getRegionDisplay(regionCode) {
				return regionUtils.getRegionDisplay(area, regionCode);
			},
			async fetchLegalSpecialtyMap() {
				try {
					const db = uniCloud.database();
					const res = await db.collection("legal-categories").get();
					// 构建映射关系
					this.legalSpecialtyMap = res.result.data.reduce((map, item) => {
						map[item._id] = item.name;
						return map;
					}, {});
					console.log('legalSpecialtyMap', this.legalSpecialtyMap)
				} catch (err) {
					console.error("Error fetching legal specialties:", err);
				}
			},
			// 翻译方法
			translateLegalSpecialty(values) {
				if (!Array.isArray(values)) {
					console.error("Expected an array, but got:", values);
					return ["未知专长"]; // 返回一个数组，默认值为包含“未知专长”的数组
				}

				return values.map(value => this.legalSpecialtyMap[value] || "未知专长");
			},
			async getLawyers(id) {
				try {
					const res = await uniCloud.database().collection('lawyers').where({
						_id: id
					}).get();
					let arr = res.result.data
					console.log('结果：', arr)
					if (arr.length) {
						this.records = arr[0]; // 提取 data 部分
						console.log('查询结果1:', this.records);
						this.records.specialty = this.translateLegalSpecialty(this.records.legal_specialty)
						console.log('查询结果2:', this.records.specialty);
					} else {
						this.records = [];
						console.error('查询失败，没有结果:', res);
					}
				} catch (error) {
					console.error('查询 lawyers 数据库失败:', error);
				}
			},
			callPhone(text) {
				uni.makePhoneCall({
					phoneNumber: text,
					success: function(e) {
						console.log(e)
					},
					fail: function(e) {
						console.log(e)
					}
				})
			},
			copy(e, content, title) {
				console.log('内容：' + content)
				title = title || '链接'
				$fui.getClipboardData(content, res => {
					this.fui.toast(`${title}复制成功`);
				}, e);
			},
			sendMsg(text) {
				uni.sendSms({
					content: "",
					phoneNumber: text,
					success(e) {
						console.log(e)
					},
					fail(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style>
	.fui-avatar__size-large {
		width: 167px !important;
		height: 167px !important;
	}

	.fui-avatar__wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx auto;
		width: 200rpx;
		height: 200rpx;
	}

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