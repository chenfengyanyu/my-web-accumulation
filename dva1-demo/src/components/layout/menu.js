import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { menu } from '../../utils';
const _ = require('lodash');

const topMenus = menu.map(item => item.key);
function getMenus(menuArray, siderFold, parentPath = '/') {
  return menuArray.map(item => {
    const linkTo = parentPath + item.key;
    if (item.child) {
      return (
        <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <svg className="icon" style={{ fontSize: 14 }} aria-hidden="true"><use xlinkHref={`#anticon-${item.icon}`}></use></svg> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
        {getMenus(item.child, siderFold, `${linkTo}/`)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={linkTo}>
        <Link to={linkTo}>
          {item.icon ? <svg className="icon" aria-hidden="true"><use xlinkHref={`#anticon-${item.icon}`}></use></svg> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    )
  })
}

function Menus({ dispatch, siderFold, app, darkTheme, location, handleClickNavMenu }) {
  const { navOpenKeys } = app;
  let newMenu = menu;
  if (app.user.roles === 'business') {
    newMenu = _.filter(menu, item => item.name !== 'Account Management');
  }
  const menuItems = getMenus(newMenu, siderFold);
  const getAncestorKeys = (key) => {
    const map = {
      '/navigation/navigation2': ['/navigation'],
    }
    return map[key] || [];
  }
  const changeOpenKeys = (openKeys) => {
    localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
    dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
  }
  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1));
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  const menuProps = !siderFold
    ? {
      onOpenChange,
      openKeys: navOpenKeys,
    }
    : {}
  return (
    <Menu {...menuProps} mode={siderFold ? 'vertical' : 'inline'} theme={darkTheme ? 'dark' : 'light'} onClick={handleClickNavMenu} selectedKeys={[location.pathname !== '/' ? location.pathname : '/tracker']}>
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
}

// export default Menus;
function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(Menus);
