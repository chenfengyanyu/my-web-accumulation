import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Switch } from 'antd';
import styles from './main.less';
import { config } from '../../utils';

import Menus from './menu';

function Sider({ siderFold, darkTheme, location }) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
  }
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logoSrc} /> {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
}

export default Sider;
