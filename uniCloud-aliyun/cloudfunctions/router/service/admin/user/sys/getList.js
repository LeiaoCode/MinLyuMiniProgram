module.exports = {
  /**
   * 查询多条记录 分页
   * @url admin/kong/sys/getList 前端调用的url参数地址
   * data 请求参数 说明
   * @params {Number}         pageIndex 当前页码
   * @params {Number}         pageSize  每页显示数量
   * @params {Array<Object>}  sortRule  排序规则
   * @params {object}         formData  查询条件数据源
   * @params {Array<Object>}  columns   查询条件规则
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
    let { uid } = data;
    let res = { code : 0, msg : '' };
    // 业务逻辑开始-----------------------------------------------------------
    let dbName = "uni-id-users";
    res = await vk.baseDao.getTableData({
      dbName,
      data
    });
    return res;
  }

}