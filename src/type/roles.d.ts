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
//修改后的数据类型
interface ListType {
    id:number,
    authName:string,
    path:string,
    list?:ListType[]
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
// 列表行数据类型
interface RolesTableItem {
    id:number,
    list?:ListType[],
    roleDesc:string,
    roleName:string
}

interface RolesRowPropType {
    record:RolesTableItem,
    over(res:ResponsType):void
}

interface RightsType{
    id:number,
    authName:string,
    path:string,
    pid:number,
    children?:RightsType[]
}
interface RightsProps{
    rigthsList:RightsType[]
}
interface SetRightsParams {
    rids:string
}
