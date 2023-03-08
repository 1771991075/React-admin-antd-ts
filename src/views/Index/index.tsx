import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import kun from '../../assets/kunkun.jpg';
import { useSelector } from 'react-redux';
import './index.css'
//引入自定义hooks
import useMenus from './hooks/useMenus';
const { Header, Sider, Content } = Layout;

const Index: React.FC = () => {
  //左侧导航栏显示隐藏
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //从仓库中拿到username
  let username = useSelector((state: StateType) => {
    return state.userReducer.username
  })

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
          defaultSelectedKeys={['1']}
          items={items}
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;