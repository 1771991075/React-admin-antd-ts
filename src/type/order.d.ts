//请求订单列表数据类型
interface GetOrderList {
    pagenum:number,
    pagesize:number,
    query?:string,
    user_id?:number,
    pay_status?:string,
    is_send?:string,
    order_fapiao_title?:string[],
    order_fapiao_company?:string,
    order_fapiao_content?:string,
    consignee_addr?:string
}

//订单详情
interface OrderInfoType {
    order_id:number,
    user_id:number,
    order_number:string,
    order_price:number,
    order_pay:string,
    is_send:string,
    trade_no?:string,
    order_fapiao_title:string,
    order_fapiao_company?:string,
    order_fapiao_content:string,
    consignee_addr:string,
    pay_status:string,
    create_time:number,
    update_time:number
}

//修改订单
interface UpdateOrderType {
    is_send:string,
    order_pay:string,
    order_price:number,
    order_number:string,
    pay_status:string
}

//物流信息
interface TimerType {
    time:string,
    ftime:string,
    context:string,
    location:string
}