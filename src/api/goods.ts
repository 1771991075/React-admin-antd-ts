import http from "../utils/http";

//获取商品列表
let getGoodsList = (data:GoodsHttpType):Promise<any> =>http(`goods`,'get',data)

//删除商品
let deleteGoods = (id:number):Promise<any> =>http(`goods/${id}`,'delete')

//添加商品
let addGoods = (data:AddGoodsType):Promise<any> =>http(`goods`,'post',data)

//获取商品分类列表
let getGoodsCateList = () =>http(`categories?type`,'get') 

//获取参数列表静态
let getAttributesList = (id:number,data:any) =>http(`categories/${id}/attributes`,'get',data)

export {
    getGoodsList,
    deleteGoods,
    addGoods,
    getGoodsCateList,
    getAttributesList
}