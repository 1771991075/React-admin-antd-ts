interface goodsListType {
    goods_id:number,
    goods_name:string,
    goods_price:number,
    goods_number:number,
    goods_weight:number,
    goods_state:null,
    add_time:number,
    upd_time:number,
    hot_mumber:number,
    is_promote:boolean
}


interface GoodsHttpType {
    pagenum:number | string,
    pagesize:number | string,
}