//获取的商品列表类型
interface goodsListType {
    goods_id:number,
    goods_name:string,
    goods_price:number,
    goods_number:number,
    goods_weight:number,
    goods_state:null | number,
    add_time:number,
    upd_time:number,
    hot_mumber:number,
    is_promote:boolean,
    upd_time?:number,
    cat_id?:null | number,
    cat_one_id?:null | number,
    cat_three_id?:null | number,
    cat_two_id?:null | number
}

//表格内商品列表类型
interface TableGoodsType {
    goods_id:number,
    goods_name:string,
    goods_price:number,
    goods_weight:number,
    add_time:number,
}

//发送请求获取商品列表类型
interface GoodsHttpType {
    pagenum:number,
    pagesize:number,
    query:string
}

//添加商品类型
interface AddGoodsType {
    goods_name:string,
    goods_cat:string | Array,
    goods_price:number,
    goods_number:nunmber,
    goods_weight:number,
    goods_introduce?:string,
    pics?:Array<object>,
    attrs?:AttrsType[]
}
interface AttrsType{
    goods_id:number,
    attr_id:number,
    attr_value?:string,
    add_price?:number | null,
    attr_name?:string,
    attr_sel?:string,
    attr_write?:string,
    attr_vals?:string
}
//发送请求获得商品分类类型
interface GetgoodsCate {
    cat_deleted: boolean,
    cat_id: number,
    cat_level: number,
    cat_name: string,
    cat_pid: number,
    children?:GetgoodsCate[]
}


//修改后商品分类列表类型
interface GoodsCateTypeOption {
    value: string | number;
    label: string;
    children?: GoodsCateTypeOption[];
}

//参数类型
interface AttrsType1 {
    attr_id:number,
    attr_name:string,
    attr_sel:string,
    attr_vals:string[] | string,
    attr_write:string,
    cat_id:number,
    delete_time:number | null
}

//商品详情
interface GoodInfoType {
    cat_id:number[],
    goods_name:string,
    goods_number:number,
    goods_price:number,
    goods_weight:number
}

interface GoodsCateType {
    type:number[]
}


interface Attrs{
    attr_id:number,
    attr_value:string
}
//添加商品类型
interface AddGoodsParams{
    goods_name:string,
    goods_cat:string,
    goods_price:number,
    goods_number:number,
    goods_weight:number,
    goods_introduce:string,
    attrs:Attrs[]
}

//更新商品属性类型
interface ParmasUpdateType {
    attr_name:string,
    attr_sel:"only" | "many",
    attr_vals?:string
}

//请求动态或静态参数
interface CateParamsSelType{
    sel:"only" | "many"
}

//添加动态参数或者静态属性
interface AddAttributeType {
    attr_name:string,
    attr_sel:'only' | 'many',
    attr_vals?:string
}