import http from "../utils/http";

//获取商品列表
let getGoodsList = (data:GoodsHttpType):Promise<any> =>http(`goods`,'get',data)

//删除商品
let deleteGoods = (id:number) =>http(`goods/${id}`,'delete')

export {
    getGoodsList,
    deleteGoods
}