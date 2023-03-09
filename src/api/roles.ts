import http from "../utils/http";

// 获取用户权限列表
let getRolesList = () =>http(`roles`,'get')

export {
    getRolesList
}