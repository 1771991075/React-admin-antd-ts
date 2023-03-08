import { useEffect, useState } from "react";
import { getMenus } from "../../../api/user";
import { UserOutlined, ShopOutlined, TagOutlined, FileDoneOutlined, BarChartOutlined, AppstoreOutlined } from '@ant-design/icons';
let useMenus = () => {
    let [items, setItems] = useState<MenusType[]>()
    //获取菜单栏权限
    let getMenusList = async () => {
        let res = await getMenus()
        if (res.data.meta.status !== 200) {
            return
        }
        //处理数据
        let newItems: MenusType[] = []
        let menusList: Array<MenuListType> = res.data.data
        menusList.forEach((item: MenuListType) => {
            let icon: JSX.Element;
            switch (item.id) {
                case 125:
                    icon = <UserOutlined />
                    break;
                case 101:
                    icon = <ShopOutlined />
                    break;
                case 103:
                    icon = <TagOutlined />
                    break
                case 102:
                    icon = <FileDoneOutlined />
                    break
                default:
                    icon = <BarChartOutlined />
            }
            let obj: MenusType = {
                key: item.id,
                label: item.authName,
                children: [],
                icon: icon
            }
            //遍历二级菜单
            item.children.forEach((two: MenuListType) => {
                let twoObj: MenusType = {
                    key: two.path,
                    label: two.authName,
                    icon: <AppstoreOutlined />
                }
                //类型断言
                let children = (obj.children) as MenusType[]
                children.push(twoObj)
            })
            newItems.push(obj)
        })
        setItems(newItems)
    }

    useEffect(() => {
        getMenusList()
    }, [])
    return items
}

export default useMenus;