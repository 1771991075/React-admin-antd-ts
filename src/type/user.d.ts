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

//发送用户列表请求的数据类型
interface UsersListParams {
    pagenum:number,
    pagesize:number,
    query?:string
}

//用户列表
interface DataType {
    key: string;
    id: number;
    username: string;
    email: string;
    mobile: string;
    role_name: string;
    mg_state: boolean;
}

//首页面包屑导航
interface Items{
    title:JSX.Element | string,
    href?:string
}

//添加用户类型
interface SetUsersType{
    username:string,
    password:string,
    email?:string,
    mobile?:string | number
}

//修改用户类型
interface UpdateUserType {
    username?:string,
    email?:string,
    mobile?:string
}
