import { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { UserOutlined, CheckSquareOutlined, HomeOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {logout} from "../../redux/uiSlice";
import {useDispatch} from 'react-redux';
const { Header } = Layout;

const MenuBar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  };

  // Menu items configuration
  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      path: '/me'
    },
    {
      key: 'todos',
      icon: <CheckSquareOutlined />,
      label: 'Todo List',
      path: '/todolist'
    },
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      path: '/settings'
    }
  ];

  return (
    <Layout className="layout">
      <Header style={{ padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%'
        }}>
          {/* Logo */}
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
            TodoApp
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Only Navigation */}
            <div className="hidden md:block">
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ background: 'transparent', border: 'none' }}
                items={menuItems.map(item => ({
                  key: item.key,
                  icon: item.icon,
                  label: <a href={item.path}>{item.label}</a>
                }))}
              />
            </div>

            {/* Desktop Only Logout Button */}
            <Button
              type="primary"
              onClick={handleLogout}
              style={{ marginLeft: '15px' }}
              className="hidden md:block"
            >
              Logout
            </Button>

            {/* Mobile menu button */}
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: 'white', fontSize: '20px' }} />}
              onClick={showDrawer}
              className="block md:hidden"
            />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          open={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="vertical"
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <a href={item.path}>{item.label}</a>
            }))}
          />
          <div style={{ padding: '12px 24px' }}>
            <Button type="primary" danger block onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default MenuBar;