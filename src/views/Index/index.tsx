import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Modal } from 'antd';
import kun from '../../assets/kunkun.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './index.css';
//引入自定义hooks
import useMenus from './hooks/useMenus';
const { Header, Sider, Content } = Layout;

const Index: React.FC = () => {
  let navigate = useNavigate()
  //左侧导航栏显示隐藏
  const [collapsed, setCollapsed] = useState(false);
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
          onSelect={(keyPath) => { navigate(`/index/${keyPath.key}`) }}
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;