<template>
	<!--本文件由FirstUI授权予向*磊（会员ID：  3 789）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-wrap">
		<view v-if="type==='custom'">
			<fui-result :type="type" :title="title" :descr="descr">
				<template v-slot:icon>
					<fui-icon name="warning" color="#FF2B2B" :size="128"></fui-icon>
				</template>
				<fui-button btn-size="medium" text="返回首页" :type="btnType" bold :margin="['48rpx','0','24rpx']">
				</fui-button>
				<fui-button btn-size="medium" text="次要操作" type="gray" :color="color" bold></fui-button>
			</fui-result>
		</view>
		<view v-else>
			<fui-result :type="type" :title="title" :descr="descr">
				<fui-button @click="href" btn-size="medium" text="返回首页" :type="btnType" bold
					:margin="['48rpx','0','24rpx']">
				</fui-button>
				<fui-button style="display: none;" btn-size="medium" text="次要操作" type="gray" :color="color"
					bold></fui-button>
			</fui-result>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'success',
				btnType: 'success',
				color: '#09BE4F',
				title: '提交成功',
				descr: '信息提交成功，待审核后联系您，请注意接听电话'
			}
		},
		onLoad(e) {
			let type = Number(e.type || 1)
			this.title = ['提交成功', '操作失败', '操作失败', '正在审核', '操作标题'][type - 1]
			this.type = ['success', 'warning', 'fail', 'waiting', 'custom'][type - 1]
			this.btnType = ['success', 'warning', 'primary', 'primary', 'danger'][type - 1]
			this.color = ['#09BE4F', '#FFB703', '#465CFF', '#465CFF', '#FF2B2B'][type - 1]
		},
		methods: {
			href() {
				this.fui.href('/pages/tabbar/law/home/index',true)
			}

		}
	}
</script>

<style>

</style>