//角色列表类型
interface RolesDataType {
    id:number,
    roleName:string,
    roleDesc:string,
    children?:RplesDataChildType[]
}

interface RplesDataChildType {
    id:number,
    authName:string,
    path:string,
    children?:RplesDataChildType[]
}

//提交添加角色表单类型
interface RolesFormType {
    roleName:string,
    roleDesc?:string
}

//角色权限列表
interface RightsDataType {
    id:number,
    authName:string,
    level:string,
    pid:number,
    path:string | null
}

//权限列表类型
interface RolesType {
    value:number,
    label:string
}
