import http from "../utils/http";

//获取订单列表
let getOrderList = (data:GetOrderList) =>http(`orders`,'get',data)

//修改订单
let updateOrder = (id:number,data:UpdateOrderType) =>http(`orders/${id}`,'put',data)

//获取物流信息
let getTimer = (id:number) =>http(`/kuaidi/${id}`,'get')

export {
    getOrderList,
    updateOrder,
    getTimer
}