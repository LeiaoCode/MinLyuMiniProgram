module.exports = {
  /**
   * 修改数据,并返回修改后的数据
   * @url client/type/sys/updateById 前端调用的url参数地址
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
		// 业务逻辑开始----------------------------------------------------------- 
		let { _id,status} = data;
		if(data.status==0){
			res.info = await vk.baseDao.updateById({
				dbName:"vk-devtype",
				id:_id,
				dataJson:{
					status:1
				},
				getUpdateData:true
			});
		}else{
			res.info = await vk.baseDao.updateById({
				dbName:"vk-devtype",
				id:_id,
				dataJson:{
					status:0
				},
				getUpdateData:true
			});
		}
		
		// 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}