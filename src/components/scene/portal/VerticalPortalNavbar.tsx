import { FC } from 'react';
import { Menu, ConfigProvider } from 'antd';
import './VerticalPortalNavbar.scss';

interface VerticalPortalNavbarProps {
  portalMenuItems: any;
  portalSelectedKeys: string[];
}

export const VerticalPortalNavbar: FC<VerticalPortalNavbarProps> = (props) => {
  const { portalMenuItems, portalSelectedKeys } = props;

  return (
    <div className='vertical-portal-navbar'>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#150C92',
        }
      }}>
        <Menu
          defaultSelectedKeys={['数据中心']}
          items={portalMenuItems}
          className='portal-navbar'
          mode='horizontal'
          selectedKeys={portalSelectedKeys}
          overflowedIndicator={undefined}
        />
      </ConfigProvider>
    </div>
  );
};
