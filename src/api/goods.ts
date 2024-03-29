import http from "../utils/http";

//获取商品列表
let getGoodsList = (data:GoodsHttpType):Promise<any> =>http(`goods`,'get',data)

//删除商品
let deleteGoods = (id:number):Promise<any> =>http(`goods/${id}`,'delete')

//添加商品
let addGoods = (data:AddGoodsParams):Promise<any> =>http(`goods`,'post',data)

//获取商品分类列表
let getGoodsCateList = () =>http(`categories?type`,'get') 

//获取参数列表
let getAttributesList = (id:number,data:CateParamsSelType) =>http(`categories/${id}/attributes`,'get',data)

//编辑提交标签参数
let updateParams = (id:number,attrId:number,data:ParmasUpdateType)=> http(`categories/${id}/attributes/${attrId}`,'put',data)

//添加动态参数或者静态属性
let setAttribute = (id:number,data:AddAttributeType) =>http(`categories/${id}/attributes`,'post',data)

//删除参数
let delAttribute = (id:number,attrid:number) =>http(`categories/${id}/attributes/${attrid}`,'delete')

//添加分类
let setCate = (data:AddCateType) =>http(`categories`,'post',data)

//编辑提交分类
let updateCate = (id:number,data:UpdateCateType) =>http(`categories/${id}`,'put',data)

//删除分类
let delCate = (id:number) =>http(`categories/${id}`,'delete')

export {
    getGoodsList,
    deleteGoods,
    addGoods,
    getGoodsCateList,
    getAttributesList,
    updateParams,
    setAttribute,
    delAttribute,
    setCate,
    updateCate,
    delCate
}