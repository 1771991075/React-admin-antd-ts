import http from "../utils/http";
// 用户登录
let userLogin = (data:UserLoginParams):Promise<any>=> http(`login`,"post",data);

// 获取首页左侧导航栏列表
let getMenus = ():Promise<any>=> http(`menus`,'get')

export {
    userLogin,
    getMenus
}