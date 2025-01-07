module.exports = {
  /**
   * 删除
   * @url admin/user/sys/delete 前端调用的url参数地址
   * data 请求参数 说明
   * @params {String} _id    用户ID
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始----------------------------------------------------------- 
    let { _id } = data;
    if (vk.pubfn.isNullOne(_id)) {
      return { code: -1, msg: '_id不能为空' };
    }
    if (uid === _id) {
      return { code: -1, msg: '请勿删除当前登录账户!' };
    }
    // 执行数据库API请求
    res.num = await vk.baseDao.deleteById({
      dbName: "uni-id-users",
      id:_id
    });
    return res;
  }
}