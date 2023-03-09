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

//用户列表
interface DataType {
    key: string;
    id: number;
    username: string;
    email: string;
    mobile: number;
    role_name: string;
    mg_state: boolean;
}

//首页面包屑导航
interface Items{
    title:JSX.Element | string,
    href?:string
}