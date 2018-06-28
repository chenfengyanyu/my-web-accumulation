import { SegmentedControl, WhiteSpace } from 'antd-mobile';
import styles from './index.less';

export default () => {
  return (
    <div>
      <WhiteSpace />
      <SegmentedControl selectedIndex={1} values={['Segment1', 'Segment2', 'Segment3']} />
      <div className={styles.test}>数学</div>
    </div>
  )
}