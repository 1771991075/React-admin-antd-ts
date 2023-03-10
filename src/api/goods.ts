import http from "../utils/http";

//获取商品列表
let getGoodsList = (data:GoodsHttpType):Promise<any> =>http(`goods?pagenum=${data.pagenum}&pagesize=${data.pagesize}`,'get')

export {
    getGoodsList
}