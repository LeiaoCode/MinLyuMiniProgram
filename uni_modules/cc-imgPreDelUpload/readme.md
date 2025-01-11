# cc-imgPreDelUpload 

##uniapp专属精品组件页面模板（由前端组件开发出品）精品组件页面模板

###●组件模板规划：
由前端组件开发出品的精品组件页面模板，将陆续发布，预计高达约几百种供您使用，是快速快发项目、创业的必备精品。

合集地址： uni-app模板合集地址：(https://ext.dcloud.net.cn/publisher?id=274945) 如查看全部页面模板，请前往上述uniapp插件市场合集地址；

###●组件模板效果图：
可下载项目后预览，效果图见右侧图片；

###●组件模板费用：
学习：免费下载，进行学习，无费用；

使用/商用：本页面地址赞赏10元后，可终身商用；

###●组件模板使用版权/商用：
本组件模板免费下载可供学习，如需使用及商用，请在本组件页面模板进行赞赏10元

（仅需10元获取精品页面模板代码-物有所值，1个组件页面市场价100元 ）

赞赏10后（当前项目产生赞赏订单可追溯）即可终身商用当前本地址下载的页面模版代码，不同下载地址需进行不同的赞赏。（不赞赏就进行商用使用者，面临侵权！保留追究知识产权法律责任！后果自负！）

### 我的技术微信公众号

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)


#### 注意组件实现代码 
```组件实现代码
<!-- 注意此处需要设置与服务端保持统一 -->	
// name：服务端文件接受key  filePath: 需与服务端文件接收字段保持一致（如服务端此处设置为imageUrl则为imageUrl字段）
						let tmpdict = {
							'name': 'image',
							'filePath': res.tempFilePaths[j]
						};					


```

#### 使用方法 
```使用方法
<!-- count： 最大上传数量  imageList: 图片上传选择数组-->
<cc-imgPreDelUpload :count="6" :imageList="imgList"></cc-imgPreDelUpload>

<!-- 上传请求事件 -->
goUploadClick() {

                if (this.imgList.length < 1) {

                    uni.showModal({
                        title: '温馨提示',
                        content: '请上传图片'
                    })
                    return;
                }
                console.log('图片上传数组 = ' + JSON.stringify(this.imgList));

                // 服务器地址上传地址 仅为示例，非真实的接口地址
                let baseUrl = "http://gzcc.com/cc//appSc/up"

                uni.showLoading({
                    title: '上传中'
                })
                const uploadTask = uni.uploadFile({
                    url: baseUrl, //仅为示例，非真实的接口地址
                    files: this.imgList, //请求图片数组
                    formData: {}, //请求参数
                    success: (uploadFileRes) => {

                        uni.hideLoading();
                        console.log('上传成功 = ' + uploadFileRes.data);
                    }
                });
                uploadTask.Update((res) => {

                    if (typeof(res.progress) != String) {
                        res.progress = '0';
                    }
                    // 此处为了模拟上传进度
                    uni.showLoading({
                        title: '上传进度: ' + res.progress + '%'
                    })
                    console.log('上传进度' + res.progress);
                    console.log('已经上传的数据长度' + res.totalBytesSent);
                    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

                });
            }
        }	
					
```

#### HTML代码实现部分
```html

<template>
    <view class="content">

        <!-- count： 最大上传数量  imageList: 图片上传选择数组-->
        <cc-imgPreDelUpload :count="6" :imageList="imgList"></cc-imgPreDelUpload>

        <button style="width: 120px;background-color: antiquewhite; margin-top: 60px;" @click="goUploadClick"> 上传
        </button>

    </view>
</template>

<script>
    export default {

        data() {
            return {
                imgList: []
            }
        },

        methods: {

            goUploadClick() {

                if (this.imgList.length < 1) {

                    uni.showModal({
                        title: '温馨提示',
                        content: '请上传图片'
                    })
                    return;
                }
                console.log('图片上传数组 = ' + JSON.stringify(this.imgList));

                // 服务器地址上传地址 仅为示例，非真实的接口地址
                let baseUrl = "http://gzcc.com/cc//appSc/up"

                uni.showLoading({
                    title: '上传中'
                })
                const uploadTask = uni.uploadFile({
                    url: baseUrl, //仅为示例，非真实的接口地址
                    files: this.imgList, //请求图片数组
                    formData: {}, //请求参数
                    success: (uploadFileRes) => {

                        uni.hideLoading();
                        console.log('上传成功 = ' + uploadFileRes.data);
                    }
                });
                uploadTask.Update((res) => {

                    if (typeof(res.progress) != String) {
                        res.progress = '0';
                    }
                    // 此处为了模拟上传进度
                    uni.showLoading({
                        title: '上传进度: ' + res.progress + '%'
                    })
                    console.log('上传进度' + res.progress);
                    console.log('已经上传的数据长度' + res.totalBytesSent);
                    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

                });
            }
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;

    }
</style>

```


