// utils/regionUtils.js
export default {
    /**
     * 递归查找地区完整路径
     * @param {Array} regionMap - 地区数据树
     * @param {String} regionCode - 地区编码
     * @param {Array} path - 路径数组（递归使用）
     * @returns {Array|null} - 地区完整路径数组
     */
    findRegionPath(regionMap, regionCode, path = []) {
        for (const region of regionMap) {
            if (region.value === regionCode) {
                path.push(region.text);
                return path;
            }
            if (region.children && region.children.length > 0) {
                const result = this.findRegionPath(region.children, regionCode, [...path, region.text]);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    },

    /**
     * 获取地区的完整路径
     * @param {Array} regionMap - 地区数据树
     * @param {String} regionCode - 地区编码
     * @returns {String} - 完整路径字符串
     */
    getRegionDisplay(regionMap, regionCode) {
        const pathArray = this.findRegionPath(regionMap, regionCode);
        return pathArray ? pathArray.join(" - ") : "未知地区";
    }
};
