import http from "../utils/http";

// 获取用户权限列表
let getRolesList = ():Promise<any> =>http(`roles`,'get')

//添加角色
let setRoles = (data:RolesFormType):Promise<any> =>http(`roles`,'post',data)

//删除角色
let delRoles = (id:number):Promise<any> =>http(`roles/${id}`,'delete')

//获取权限列表
let getRightsList = ():Promise<any> =>http(`rights/list`,'get')

export {
    getRolesList,
    setRoles,
    delRoles,
    getRightsList
}