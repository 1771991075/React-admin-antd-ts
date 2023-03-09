import http from "../utils/http";
// 用户登录
let userLogin = (data:UserLoginParams):Promise<any>=> http(`login`,"post",data);

// 获取首页左侧导航栏列表
let getMenus = ():Promise<any>=> http(`menus`,'get')

//请求用户列表
let getUserList = (pagenum:number,pagesize:number,query?:string) =>http(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=`,'get')

//添加用户
let setUsers = (data:SetUsersType):Promise<any> =>http(`users`,'post',data)

//删除单个用户
let delUsers = (id:number|string) =>http(`users/${id}`,'delete')

export {
    userLogin,
    getMenus,
    getUserList,
    setUsers,
    delUsers
}