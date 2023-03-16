import http from "../utils/http";

//获取订单列表
let getOrderList = (data:GetOrderList) =>http(`orders`,'get',data)


export {
    getOrderList
}