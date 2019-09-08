import React from 'react'
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd'
import styles from './main.less'
import { menu } from '../../utils'

const pathSet = [];
function getPathSet(menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.forEach(item => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    }
    if (item.child) {
      getPathSet(item.child, `${parentPath}${item.key}/`)
    }
  })
}
getPathSet(menu)

function Bread({ location }) {
  const pathNames = [];
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump())
    } else {
      pathNames.push((`-${item}`).hyphenToHump())
    }
  })
  const breads = pathNames.map((item, key) => {
    if (!(item in pathSet)) {
      item = 'Tracker';
    }
    return (
      <Breadcrumb.Item key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : { href: `#${pathSet[item].path}` }}>
        {pathSet[item].icon
          ? <svg className="icon" aria-hidden="true"><use xlinkHref={`#anticon-${pathSet[item].icon}`}></use></svg>
          : ''}
        <span>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item href="/"><Icon style={{ fontSize: 14 }} type="home" />
          <span>Home</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object,
}

export default Bread
