import React from 'react';
import styles from './index.less';
import Header from './_header';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Layout);