# 概述

本云函数插件可通过前端uniCloud.callFunction的形式调用，完成抖音小程序的登陆，云函数会返回token信息，首次登陆会自动注册，注册信息会保存到uni-id-users表内。

# 准备工作

1、自行在抖音开放平台注册小程序后获取appid、appsecret备用。

2、在目录uniCloud/cloudfunctions/common/uni-config-center下新建uni-id目录(有则忽略)，新建config.json配置文件(有则忽略)。建议使用官方文档提供的模板
   地址为：[](https://uniapp.dcloud.net.cn/uniCloud/uni-id-summary.html#config)
   
3、在config.json里添加如下配置：

	"mp-tiktok": {
		"tokenExpiresIn": 259200,
		"tokenExpiresThreshold": 86400,
		"oauth": {
			"tiktok": {
				"appid": "",//自己的appid
				"appsecret": "",//自己的appsecret
			}
		}
	}
	
4、确保云数据库里已有表uni-id-users,该表官方已提供。

5、复制user-tiktok整个云函数目录到uniCloud/cloudfunctions目录下，右键user-tiktok，点击管理公共模块或拓展库依赖，
   拓展库uni-cloud-jql勾选；公共模块uni-config-center和uni-id-common勾选

6、上传部署

# 前端调用
uniCloud.callFunction调用user-tiktok云函数即可， params参数携带uni.login获取的code，将云函数返回的token信息缓存即可。
使用方式：

	uniCloud.callFunction({
		name:'user-tiktok',
		data:{
			action:'login',
			params:params
		}
	})