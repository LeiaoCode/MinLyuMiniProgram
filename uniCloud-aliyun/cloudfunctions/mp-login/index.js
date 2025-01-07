'use strict';
const {
	mpWeiXin,
	mpAlipay,
	mpTouTiao
} = require('mplogin')

const db = uniCloud.database();
const collection = db.collection('user')
exports.main = async (event, context) => {
	const {
		action,
		params
	} = event;
	switch (action) {
		case 'loginByWeixin': {
			let {
				nickName: nickname,
				gender,
				avatarUrl
			}=params.userInfo
			const res = await mpWeiXin(params)
			let {
				openId
			} = res;
			console.log("res: ", res);
			const {
				data: [user]
			} = await collection.where({
				wx_openid: openId
			}).get()
			console.log("user", user)
			let id = null;
			if (user) {
				id = user._id;
				nickname = user.nickname;
				gender = user.gender;
				avatarUrl = user.avatarUrl
			} else {
				const r = await collection.add({
					nickname,
					gender,
					avatarUrl,
					wx_openid: openId
				})
				id = r.id
			}
			return {
				data: {
					code: 0,
					userInfo: {
						id,
						nickname,
						gender,
						avatarUrl
					}
				}
			}
		}
		case 'loginByAlipay': {
			var code = event.params.code;
			let orderuserInfo = event.params.userInfo;
			var result = await mpAlipay.exec('alipay.system.oauth.token', {
				grant_type: 'authorization_code',
				code,
				refresh_token: '4c7a5d708ad64ca2b198b9446321RD76'
			}, {
				validateSign: false
			})
				const {
					alipay_user_id,
					userInfo
				} = result
				let {
					nickName: nickname,
					gender,
					avatar: avatar
				} = orderuserInfo;
				// 通过openid查库里的数据
				let openid = result.alipay_user_id
				const resultData = await collection.where({
					openid
				}).get()
				let id = null;
				// 如果已经有了，则更新库里的信息
				if (resultData.data.length > 0) {
					let user = resultData.data[0]
					id = user._id;
					nickname = user.nickname;
					gender = user.gender;
					avatar = user.avatar
				} else {
					// 若没有，则插入该用户数据
					const r = await collection.add({
						nickname,
						gender,
						avatar,
						openid,
					})
					id = r.id
				}
				return {
					data: {
						code:0,
						userInfo: {
							openid,
							id,
							nickname,
							gender,
							avatar,
						}
					}
				}
		}
		case 'loginByTouTiao' : {
			var nickname=params.userInfo.nickName,
			 gender=params.userInfo.gender,
			 avatar=params.userInfo.avatarUrl
			const res = await mpTouTiao(params)
			let {
				openId
			} = res;
			const {
				data: [user]
			} = await collection.where({
				tt_openid: openId
			}).get()
			let id = null;
			if (user) {
				id = user._id;
				nickname = user.nickname;
				gender = user.gender;
				avatar = user.avatar
			} else {
				// 若没有，则插入该用户数据
				const r = await collection.add({
					nickname,
					gender,
					avatar,
					tt_openid: openId
				})
				id = r.id
			}
			return {
				data: {
					code: 0,
					userInfo: {
						id,
						nickname,
						gender,
						avatar
					}
				}
			}
		
		}
		default:
			return {
				data: {
					code: 1000,
					msg: '获取用户失败'
				}
			}
	}
}
