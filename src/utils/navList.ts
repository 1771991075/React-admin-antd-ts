interface NavListType {
    [key:string]:string[]
}

let navList:NavListType = {
    "users":["用户管理","用户列表"],
    "roles":["权限管理","角色列表"],
    "rights":["权限管理","权限列表"],
    "goods":["商品管理","商品列表"],
    "params":["商品管理","分类参数"],
    "categories":["商品管理","商品分类"],
    "orders":["订单管理","订单列表"],
    "reports":["数据统计","数据报表"],
}


export default navList;