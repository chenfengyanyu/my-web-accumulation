import { NavBar, Icon } from 'antd-mobile';

function Header({ location }) {
  return (
    <NavBar
      mode="dark"
      leftContent="< 返回"
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >页头</NavBar>
  );
}

export default Header;