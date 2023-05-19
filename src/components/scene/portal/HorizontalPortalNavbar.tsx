import { FC } from 'react';
import { Menu } from 'antd';
import './HorizontalPortalNavbar.scss';
interface HorizontalPortalNavbarProps {
  portalMenuItems: any;
  portalSelectedKeys: string[];
}

export const HorizontalPortalNavbar: FC<HorizontalPortalNavbarProps> = (props) => {
  const { portalMenuItems, portalSelectedKeys } = props;
  
  return (
    <div className='portal-navbar-container'>
      <Menu
        defaultSelectedKeys={['数据中心']}
        mode="inline"
        items={portalMenuItems}
        className='portal-navbar'
        selectedKeys={portalSelectedKeys}
      />
    </div>
  );
};