// 定义路由表类型
interface RouterObject{
    path:string,
    element:JSX.Element,
    author:boolean,
    children?:RouterObject[]
}

interface AuthorProps{
    oldPath:string,
    oldComponent:JSX.Element
}