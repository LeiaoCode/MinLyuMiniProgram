module.exports = {
  /**
   * 修改数据,并返回修改后的数据
   * @url client/device/kh/updateById 前端调用的url参数地址
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
		let result = { code : 1, msg : '没有内容需要更新' };
		let maintenanceTime = vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
		// 业务逻辑开始----------------------------------------------------------- 
		let { _id,status,brand,model,sn,principal,address,register_ip,comment,typename,organ} = data;	
			res.info = await vk.baseDao.updateById({
				dbName:"vk-device",
				id: data._id,
				dataJson:{
					status:"故障",					
					maintenanceTime:maintenanceTime
				},
				getUpdateData:true
			});
			return res;		
		// 业务逻辑结束-----------------------------------------------------------
    //return res;
  }

}