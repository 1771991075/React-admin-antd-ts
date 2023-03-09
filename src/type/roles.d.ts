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