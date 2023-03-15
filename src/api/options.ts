import http from "../utils/http";

//获取数据报表
let getDataReports = () =>http(`reports/type/1`,'get')

export {
    getDataReports
}