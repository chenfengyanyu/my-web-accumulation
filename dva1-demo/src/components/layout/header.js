import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Popover } from 'antd';
import styles from './main.less';
import Menus from './menu';

const SubMenu = Menu.SubMenu;

function Header({ user, logout, quitController, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover }) {
  const handleClickMenu = e => {
    if (e.key === 'logout') {
      logout();
    } else if (e.key === 'back') {
      quitController();
    }
  }
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
  }

  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}

      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu style={{ float: 'right' }} title={<span className={styles.portrait}>{user.nickname} <img alt="user" src={user.baseInfo && user.baseInfo.headUrl ? user.baseInfo.headUrl : 'assets/img/user.png'} width="30" height="30" /></span>}>
          <Menu.Item key="back" style={{ display: (user.controllerUid ? 'block' : 'none') }}> Back to account </Menu.Item>
          <Menu.Item key="logout"><a>Logout</a></Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  quitController: PropTypes.func,
  switchSider: PropTypes.func,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  siderFold: PropTypes.bool,
  navOpenKeys: PropTypes.array,
}

export default Header;
