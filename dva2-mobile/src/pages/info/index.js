import React from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import styles from './index.less';

const myImg = src => <img src={src} width="60" height="60" alt="" />;

const ResultExample = () => (<div className={styles.resultExampl}>
  <div className={styles.subTitle}>支付成功</div>
  <Result
    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
    title="支付成功"
    message={<div>998.00元 <del>1098元</del></div>}
  />
  <WhiteSpace />
  <div className={styles.subTitle}>验证成功</div>
  <Result
    img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#1F90E6', width: '60px', height: '60px' }} />}
    title="验证成功"
    message="所提交内容已成功完成验证"
  />
  <WhiteSpace />
  <div className={styles.subTitle}>支付失败</div>
  <Result
    img={<Icon type="cross-circle-o" className={styles.spe} style={{ fill: '#F13642', width: '60px', height: '60px' }} />}
    title="支付失败"
    message="所选银行卡余额不足"
  />
  <WhiteSpace />
  <div className={styles.subTitle}>等待处理</div>
  <Result
    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
    title="等待处理"
    message="已提交申请，等待银行处理"
  />
  <WhiteSpace />
  <div className={styles.subTitle}>操作失败</div>
  <Result
    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
    title="无法完成操作"
    message="未绑定淘宝账户"
  />
  <WhiteSpace size='lg' />
  <WhiteSpace size='lg' />
  <WhiteSpace size='lg' />
</div>);

export default ResultExample;