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


interface GoodsHttpType {
    pagenum:number,
    pagesize:number,
    query:string
}