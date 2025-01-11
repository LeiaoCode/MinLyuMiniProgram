module.exports = {
  /**
   * 修改
   * @url admin/user/sys/update 前端调用的url参数地址
   * data 请求参数 说明
   * @params {String} _id    用户ID
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始----------------------------------------------------------- 
    let {
      _id,
      nickname,
      gender = 0,
      mobile,
      comment,
    } = data;
    if (vk.pubfn.isNullOne(_id)) {
      return { code: -1, msg: '_id不能为空' };
    }
    // 此处还应该还需要判断下mobile和username是否已存在等参数校验逻辑和
    // 执行数据库API请求
    res.id = await vk.baseDao.updateById({
      dbName:"uni-id-users",
      id:_id,
      dataJson:{
        nickname,
        gender,
        mobile,
        comment
      }
    });
    return res;
  }
}