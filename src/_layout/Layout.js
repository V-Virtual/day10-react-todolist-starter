import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, NavLink } from 'react-router';

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: '1',
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: '2',
    label: <NavLink to="/todos">Todos</NavLink>,
  },
  {
    key: '3',
    label: <NavLink to="/about">About</NavLink>,
  }
];

const DefaultLayout = () => {
  const {
          token: { colorBgContainer, borderRadiusLG },
        } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'Todo App' }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Todo App ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
