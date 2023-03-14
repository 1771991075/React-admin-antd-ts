import http from "../utils/http";

// 获取用户权限列表
let getRolesList = ():Promise<any> =>http(`roles`,'get')

//添加角色
let setRoles = (data:RolesFormType):Promise<any> =>http(`roles`,'post',data)

//删除角色
let delRoles = (id:number):Promise<any> =>http(`roles/${id}`,'delete')

//获取权限列表
let getRightsList = ():Promise<any> =>http(`rights/list`,'get')

//更改用户角色
let updateRoles = (id:number,data:object) =>http(`users/${id}/role`,'put',data)

//编辑角色
let changeRoles = (id:number,data:RolesFormType) =>http(`roles/${id}`,'put',data)

//删除指定权限
let deleteRoles = (roleId:number,rightId:number)=>http(`roles/${roleId}/rights/${rightId}`,'delete');

//获取权限列表right
let getRights = ( type:string)=>http(`rights/${type}`,'get');

// 分配权限
let setRights = (roleId :number,data:SetRightsParams) =>http(`roles/${roleId}/rights`,'post',data);

export {
    getRolesList,
    setRoles,
    delRoles,
    getRightsList,
    updateRoles,
    changeRoles,
    deleteRoles,
    getRights,
    setRights
}