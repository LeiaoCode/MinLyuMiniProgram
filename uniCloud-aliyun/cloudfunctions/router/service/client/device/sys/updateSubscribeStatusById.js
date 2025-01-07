module.exports = {
  /**
   * 修改数据,并返回修改后的数据
   * @url client/device/sys/updateById 前端调用的url参数地址
   * data 请求参数 说明
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };		
		let maintenanceTime = vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
		// 业务逻辑开始----------------------------------------------------------- 
		let { _id,status} = data;
			res.info = await vk.baseDao.update({
			  dbName:"vk-subscribe", // 表名
			  whereJson:{ // 条件
				dev_id:data.dev_id,
				status:1
			  },
			  dataJson:{ // 需要修改的数据
				status:0,
				sendtime:maintenanceTime
			  }
			});
			return res;	
		// 业务逻辑结束-----------------------------------------------------------
    //return res;
  }

}