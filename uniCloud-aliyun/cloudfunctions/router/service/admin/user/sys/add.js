module.exports = {
  /**
   * 添加
   * @url admin/user/sys/add 前端调用的url参数地址
   * data 请求参数 说明
   * @params {String} username    用户名
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始----------------------------------------------------------- 
    let {
      username,
      nickname,
      gender = 0,
      mobile,
      comment
    } = data;
    // 此处应该还需要判断下mobile和username是否已存在等参数校验逻辑和
    let register_date = new Date().getTime();
    res.id = await vk.baseDao.add({
      dbName:"uni-id-users",
      dataJson:{
        username,
        nickname,
        gender,
        mobile,
        comment,
        register_date
      }
    });
    return res;
  }
}