"use strict";
const iconv = require("iconv-lite");
const crypto = require("crypto");
const {
	mpWeiXinConfig,
	mpAlipayConfig,
	mpTouTiaoConfig
} = require("./config.json")
const ALIPAY_ALGORITHM_MAPPING = {
	RSA: 'RSA-SHA1',
	RSA2: 'RSA-SHA256',
};
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
			"00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
class MpAlipay {
	config(config) {
		if (!config.app_id) {
			throw Error('config.app_id is required');
		}
		if (!config.private_key) {
			throw Error('config.private_key is required');
		}
		const privateKeyType = config.keyType === 'PKCS8' ? 'PRIVATE KEY' : 'RSA PRIVATE KEY';
		config.privateKey = this.formatKey(config.private_key, privateKeyType);
		if (config.alipayPublicKey) {
			config.alipayPublicKey = this.formatKey(config.alipay_public_key, 'PUBLIC KEY');
		}
		this.config = Object.assign({
			gateway: 'https://openapi.alipay.com/gateway.do',
			timeout: 5000,
			sign_type: 'RSA2',
			charset: 'utf-8',
			version: '1.0',
		}, config);

	}
	formatKey(key, type) {
		const item = key.split('\n').map(val => val.trim());
		if (item[0].includes(type)) {
			item.shift();
		}
		if (item[item.length - 1].includes(type)) {
			item.pop();
		}
		return `-----BEGIN ${type}-----\n${item.join('')}\n-----END ${type}-----`;
	}
	formatUrl(url, params) {
		let requestUrl = url;
		const urlArgs = [
			'app_id', 'method', 'format', 'charset',
			'sign_type', 'sign', 'timestamp', 'version',
			'notify_url', 'return_url', 'auth_token', 'app_auth_token',
			'appCertSn', 'alipayRootCertSn',
			'ws_service_url',
		];
		for (const key in params) {
			if (urlArgs.indexOf(key) > -1) {
				const val = encodeURIComponent(params[key]);
				requestUrl = `${requestUrl}${requestUrl.includes('?') ? '&' : '?'}${key}=${val}`;
				delete params[key];
			}
		}
		return {
			execParams: params,
			url: requestUrl
		};
	}


	/**
	 * 执行请求
	 * @param {string} method 调用接口方法名，比如 alipay.system.oauth.token
	 * @param {object} params 请求参数
	 * @param {Boolean} option 选项
	 * @return {Promise} 请求执行结果
	 */
	exec(method, params = {}, option = {}) {
		const config = this.config;
		let signParams = Object.assign({
			method,
			app_id: config.app_id,
			charset: config.charset,
			version: config.version,
			sign_type: config.sign_type,
			timestamp: new Date().format('yyyy-MM-dd hh:mm:ss'), //todo进行替换
		}, params);
		const sign1 = this.getSign(signParams, config);
		const postParams = Object.assign(signParams, {
			sign: sign1
		})
		console.log("postParams: ", postParams);
		const {
			url,
			execParams
		} = this.formatUrl(config.gateway, postParams);
		console.log(' MpAlipay.exec, url: ', url)
		console.log(' MpAlipay.exec, method: ', method)
		console.log('MpAlipay.exec, execParams: ', JSON.stringify(execParams))
		return new Promise((resolve, reject) => {
			uniCloud.httpclient.request(url, {
					method: 'POST',
					data: execParams,
					dataType: 'text',
					timeout: config.timeout
				})
				.then((ret) => {
					if (ret.status === 200) {
						const result = JSON.parse(ret.data);
						const responseKey = `${method.replace(/\./g, '_')}_response`;
						let data = result[responseKey];
						if (data) {
							if (params.needEncrypt) {
								// data = util_1.aesDecrypt(data, config.encryptKey);
							}
							// 按字符串验签
							const validateSuccess = option.validateSign ? this.checkResponseSign(ret
								.data, responseKey) : true;
							if (validateSuccess) {
								resolve(data);
							} else {
								reject({
									serverResult: ret,
									errorMessage: '[AlipaySdk]验签失败'
								});
							}
						}
						reject({
							serverResult: ret,
							errorMessage: '[AlipaySdk]HTTP 请求错误'
						});
					}
					reject({
						serverResult: ret,
						errorMessage: '[AlipaySdk]HTTP 请求错误'
					});
				})
				.catch((err) => {
					err.message = '[AlipaySdk]exec error';
					errorLog && errorLog(err);
					reject(err);
				});
		});
	}

	getSign(params = {}, config) {
		const signStr = Object.keys(params).sort().map((key) => {

			let data = params[key];
			if (Array.prototype.toString.call(data) !== '[object String]') {
				data = JSON.stringify(data);
			}
			return `${key}=${iconv.encode(data, config.charset)}`;

		}).join('&');
		const sign1 = this.sign(signStr, config.privateKey, config.sign_type);
		return sign1;
	}
	sign(signStr, privateKey, signType) {
		const sign = crypto.createSign(ALIPAY_ALGORITHM_MAPPING[signType])
			.update(signStr, 'utf8').sign(privateKey, 'base64');
		return sign
	}
}
const mpWeiXin = async options => {
	const {
		code,
		encryptedData,
		iv
	} = options;
	const {
		app_id,
		private_key
	} = mpWeiXinConfig;

	let url = 'https://api.weixin.qq.com/sns/jscode2session';
	url += '?appid=' + app_id;
	url += '&secret=' + private_key;
	url += '&js_code=' + code + '&grant_type=authorization_code';
	const res = await uniCloud.httpclient.request(url, {
		method: 'GET',
		dataType: 'json'
	})
	const data = res.res.data;
	if (data.errcode) {
		return {
			code: 1001,
			msg: 'appid错误',
			data,
			app_id
		}
	}
	if (!data.session_key) {
		return {
			status: 1002,
			msg: '获取微信授权失败',
			data
		}
	}
	if (!encryptedData || !iv) {
		return {
			code: 0,
			openId: data.openid,
			session_key: data.session_key
		}
	}
	const userInfo = decrypt({
		sessionKey: data.session_key,
		encryptedData,
		iv
	})
	return {
		code: 0,
		session_key: data.session_key,
		userInfo
	}
}
/**
 * 微信小程序授权登录获取session_key
 * @param {Object} options
 * @param {String} options.code 小程序code
 * @param {String} options.encryptedData 可选，存在encryptedData和iv时返回用户信息（包含unionid）
 * @param {String} options.iv 可选
 */
const mpTouTiao = async options => {
	const {
		code,
		encryptedData,
		iv
	} = options;
	const {
		app_id,
		private_key
	} = mpTouTiaoConfig;
	//获取会话信息
	let url = 'https://developer.toutiao.com/api/apps/jscode2session';
	url += '?appid=' + app_id;
	url += '&secret=' + private_key;
	url += '&code=' + code 
	//+ '&grant_type=client_credential';
	const res = await uniCloud.httpclient.request(url, {
		method: 'GET',
		dataType: 'json'
	})
	console.log("jscode2session res: ",res);
	const data = res.res.data;
	if (data.errcode) {
		return {
			code: 1001,
			msg: 'appid错误',
			data,
			app_id
		}
	}
	if (!data.session_key) {
		return {
			status: 1002,
			msg: '获取微信授权失败',
			data
		}
	}
	//返回openid
	if (!encryptedData || !iv) {
		return {
			code: 0,
			openId: data.openid,
			session_key: data.session_key
		}
	}
	//解密数据encryptedData
	const userInfo = decrypt({
		sessionKey: data.session_key,
		encryptedData,
		iv
	})
	return {
		code: 0,
		session_key: data.session_key,
		userInfo
	}
}
const decrypt = options => {
	console.log("decrypt options: ", options);
	const appId = wxConfig.appId;
	let {
		sessionKey,
		encryptedData,
		iv
	} = options;
	sessionKey = new Buffer(sessionKey, 'base64')
	encryptedData = new Buffer(encryptedData, 'base64')
	iv = new Buffer(iv, 'base64')

	let decoded;
	try {
		// 解密
		let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
		decipher.setAutoPadding(true)
		decoded = decipher.update(encryptedData, 'binary', 'utf8')
		decoded += decipher.final('utf8')
		decoded = JSON.parse(decoded)
	} catch (err) {
		throw new Error('Illegal Buffer')
	}
	if (decoded.watermark.appid !== appId) {
		throw new Error('Illegal Buffer')
	}
	return decoded
}

var mpAlipay = new MpAlipay();
mpAlipay.config({
	app_id: mpAlipayConfig.app_id,
	private_key: mpAlipayConfig.private_key
})
module.exports = {
	mpAlipay,
	mpWeiXin,
	mpTouTiao
}
