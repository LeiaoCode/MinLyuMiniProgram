module.exports = {
  /**
   * 批量添加数据
   * @url client/order/sys/adds 前端调用的url参数地址
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
		let checkyear = vk.pubfn.timeFormat(new Date(),"yyyy");		
    // 业务逻辑开始----------------------------------------------------------- 
		let dbName = "vk-check";		
		// 承载所有读操作的 promise 的数组		
		let dataArr = data.datajson;
		let kvlist = []  //用来存放组装后新的数组对象
		let one = {}    //添加的对象
		for(var i in dataArr) {
		  one = dataArr[i]
		  one['device_id'] = dataArr[i]['_id']
		  one['checkyear'] = checkyear
		  one['status'] = 1		  
		  kvlist.push(one)		  
		}		
		//return kvlist;
		await vk.baseDao.adds({
			dbName:dbName,
			dataJson:kvlist			
		});		
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}