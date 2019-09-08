import React from 'react';
import styles from './index.less';
import Header from './_header';
import Footer from './_footer';
import withRouter from 'umi/withRouter';

function Layout({ children, location }) {
  // if (location.pathname === '/') {
  //   return <div>test</div>
  // }
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(Layout);