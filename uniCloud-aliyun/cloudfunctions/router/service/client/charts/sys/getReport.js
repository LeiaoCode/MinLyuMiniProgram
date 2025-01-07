module.exports = {
  /**
   * 查询多条记录 分页
   * @url client/charts/sys/getReport 前端调用的url参数地址
   * data 请求参数 说明
	 * @params {String} tableName 	表名
   * @params {String} addTime 		搜索开始时间
   * @params {String} endTime 		搜索截止时间
	 * @params {String} searchvalue 搜索指定内容
	 * @params {Number} pageIndex 	当前页码
	 * @params {Number} pageSize 		每页显示数量
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		let checkyear = vk.pubfn.timeFormat(new Date(),"yyyy");	
    // 业务逻辑开始----------------------------------------------------------- 
		// 可写与数据库的交互逻辑等等
		let { pageIndex, pageSize, searchvalue, timeArr = [], addTimeLong, endTimeLong, sortRule } = data;
		let dbName = "vk-check";
		let fieldJson = {};
		let whereJson = {};
		let sortArr = [];
		// 排序规则开始-----------------------------------------------------------
			
		// 这里可以写必须满足的查询条件，如whereJson["user_id"] = uid;代表只查自己的记录
		// whereJson["user_id"] = uid;
		// 查询条件结束-----------------------------------------------------------
		res = await vk.baseDao.selects({
			  dbName: dbName,
			  pageIndex: 1,
			  pageSize: 10000,
			  // where条件
			  whereJson: {
				  checkyear:checkyear
			  },
			  groupJson: {
				_id: "$status", // _id是分组id， $ 后面接字段名，如按date_str字段进行分组(date_str字段是2021-08-19这样的字符串)
				count: _.$.addToSet("$typename"), // $ 后面接字段名，如把user_id原样输出（去重）
			  },
			  //sortArr: [{ name: "_id",type: "desc" }], // 对分组后的结果进行排序
			  addFields:{
				count: _.$.size("$count")
			  }
		});
    // 业务逻辑结束-----------------------------------------------------------
		
    return res;
  }

}