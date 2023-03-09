import React, { useEffect, useState ,useMemo} from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined ,HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Modal, Breadcrumb } from 'antd';
import kun from '../../assets/kunkun.jpg';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation ,NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import navList from '../../utils/navList';
import './index.css';
//引入自定义hooks
import useMenus from './hooks/useMenus';
const { Header, Sider, Content } = Layout;

const Index: React.FC = () => {
  let location = useLocation()
  let navigate = useNavigate()
  //左侧导航栏显示隐藏
  const [collapsed, setCollapsed] = useState(false);
  //定义默认展开的一级菜单key列表
  let [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>();
  // 定义默认选中的二级菜单key列表
  let [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>();
  // 获取navList状态
  let navlist = useSelector((state:StateType)=>{
    return state.navReducer.navList
  })
  // useMemo 处理navList
  let Items = useMemo(()=>{
    let list:Items[] = [{
      title: <NavLink to='home'><HomeOutlined /></NavLink>,
    }]
    if(navlist === undefined){
      navlist = []
    }
    navlist.forEach(item=>{
      let obj = {
        href:'',
        title:item
      }
      list.push(obj)
    })
    return list
  },[navlist])
  // 退出对话框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => { setIsModalOpen(true) };
  //退出登录
  const handleOk = () => {
    localStorage.removeItem('token')
    setIsModalOpen(false)
    navigate('/login')
  };
  //取消退出登录
  const handleCancel = () => {
    setIsModalOpen(false)
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 从仓库中拿到username
  let username = useSelector((state: StateType) => {
    return state.userReducer.username
  })
  // 退出登录
  let exit = () => {
    showModal()
  }

  useEffect(() => {
    // 获取当前二级路由路径
    let pathName = location.pathname.split('/')[2]
    setDefaultSelectedKeys([pathName])
    // 根据当前路由获取对应navList

    // 根据二级路由路径更新默认展开菜单
    switch (pathName) {
      case 'users':
        setDefaultOpenKeys(["125"])
        break;
      case 'roles':
        setDefaultOpenKeys(["103"])
        break
      case 'rights':
        setDefaultOpenKeys(["103"])
        break
      case 'orders':
        setDefaultOpenKeys(["102"])
        break;
      case 'reports':
        setDefaultOpenKeys(["145"])
        break;
      case 'home':
        setDefaultOpenKeys([])
        break;
      default:
        setDefaultOpenKeys(["101"])
    }
  }, [location])

  // 调用自定义hooks获取 items
  let items = useMenus()
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={kun} alt="" />
          <p>{username}管理员</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={defaultOpenKeys}
          selectedKeys={defaultSelectedKeys}
          items={items}
          onClick={(item) => {
            console.log(item);
            // 跳转对应页面
            navigate(item.key)
            // 更新当前选中的二级菜单
            setDefaultSelectedKeys([item.key])
            // 更新当前展开的一级菜单
            setDefaultOpenKeys([item.keyPath[1]])
            // 根据当前路由获取对应navlist

          }}
          // 展开一级菜单时调用
          onOpenChange = {(openKeys)=>{
            if(openKeys.length === 1){
              setDefaultOpenKeys(openKeys)
              return
            }
            setDefaultOpenKeys([openKeys[1]])
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: '0 20px', background: colorBgContainer }}>
          {
            collapsed && <MenuUnfoldOutlined style={{ fontSize: '20px' }} onClick={() => setCollapsed(!collapsed)} />
          }
          {
            !collapsed && <MenuFoldOutlined style={{ fontSize: '20px' }} onClick={() => setCollapsed(!collapsed)} />
          }
          <Button type="primary" onClick={exit}>退出</Button>
          <Modal title="提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'确认'} cancelText={'取消'}>
            <p>是否退出登录?</p>
          </Modal>
        </Header>
        <Breadcrumb style={{padding:'10px 20px'}} items={Items} />
        <Content
          style={{
            margin: '0px 16px 24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;