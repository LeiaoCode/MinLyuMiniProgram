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
		let result = { code : 1, msg : '没有内容需要更新' };
		let maintenanceTime = vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
		// 业务逻辑开始----------------------------------------------------------- 
		let { _id,status,brand,model,sn,principal,address,register_ip,comment,typename,organ} = data;		 result.item = await vk.baseDao.findById({
			dbName:"vk-device",
			id:data._id,
			fieldJson:{

			}
		});
		if(result.item.status == data.status&&result.item.brand == data.brand&&result.item.model == data.model&&result.item.sn == data.sn&&result.item.principal == data.principal&&result.item.address == data.address&&result.item.register_ip == data.register_ip&&result.item.comment == data.comment&&result.item.typename == data.typename&&result.item.organ == data.organ) 
		{			
			return result;
		}else{
			res.info = await vk.baseDao.updateById({
				dbName:"vk-device",
				id: data._id,
				dataJson:{
					status:data.status,
					brand:data.brand,
					model:data.model,
					sn:data.sn,
					principal:data.principal,
					address:data.address,
					register_ip:data.register_ip,
					comment:data.comment,
					typename:data.typename,
					organ:data.organ,
					maintenanceTime:maintenanceTime
				},
				getUpdateData:true
			});
			return res;
		}		
		// 业务逻辑结束-----------------------------------------------------------
    //return res;
  }

}