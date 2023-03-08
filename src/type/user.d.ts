interface UserLoginParams {
    username:string,
    password:string
}

interface UserReduxType {
    username:string | null,
    token:string | null
}

interface UserReduxActions {
    type:string,
    playload:UserReduxType
}

interface MenusType {
    icon:JSX.Element,
    key:number | string,
    label:string,
    children?:MenusType[]
}

interface MenuListType {
    authName:string,
    id:number,
    order:number,
    path:string,
    children:MenuListType[]
}