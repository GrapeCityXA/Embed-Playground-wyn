import { FC, useEffect } from 'react';
import { Dropdown, Row, Col, ConfigProvider } from 'antd';
import { DownOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Tabs } from 'antd';
import { CustomDesignerInspectorIcon, CustomDesignerDataBindingIcon } from '../../../../common/icons'

import './HorizontalSideBar.scss';

interface HorizontalSideBarProps {
  sideBarItems: {
    icon: any,
    label: string,
    children: Array<any>,
  }[],
  addVisual: Function,
  toggleInspectorVisible: Function,
  toggleDataBindingVisible: Function,
  isShow: boolean,
  activeKey: string,
}

export const HorizontalSideBar: FC<HorizontalSideBarProps> = (horizontalSideBarProps) => {
  const { sideBarItems, addVisual, toggleInspectorVisible, toggleDataBindingVisible, isShow, activeKey } = horizontalSideBarProps;

  useEffect(() => {
  });

  const onTabChange = (newActiveKey: string) => {
    if (newActiveKey === 'Inspector' && activeKey !== 'Inspector') {
      toggleInspectorVisible();
    }
    if (newActiveKey === 'DataBinding') {
      
      
      toggleDataBindingVisible();
    }
  };

  const handleTabsClick = (e: any) => {
    if (e.target.innerText === '数据绑定') {
      toggleDataBindingVisible();
    }
  };

  const menuItems = sideBarItems.map((sideBarItem, index) => {
    const menuItem: MenuProps['items'] = sideBarItem.children.map((child, childIndex) => (
      {
        key: `chart-${sideBarItem.label}-${childIndex}`,
        label: child,
      }
    )
    );
    const dropdownItemSpan = sideBarItem.children.length >= 4 ? 6 : (24 / sideBarItem.children.length);
    return (<Dropdown
      menu={{ items: menuItem } as MenuProps}
      dropdownRender={(menu) => (
        <Row gutter={[0, 30]} className='custom-designer-horizontal-dropdown'>
          {sideBarItem.children.map((child, childIndex) => {
            return (
              <Col span={dropdownItemSpan} key={`header-child-${childIndex}`} className='custom-designer-horizontal-dropdown-item' onClick={() => {
                addVisual(child.label);
              }}>
                {child.icon}
              </Col>
            )
          })}
        </Row>
      )}
      key={`header-${index}`}
      placement='bottomLeft'
      trigger={['hover']}
      overlayClassName='dropdown-style'
      overlayStyle={{ top: -4 }}
    >
      <div className='header-title'>
        {sideBarItem.icon}
        <span className='header-title-label'>{sideBarItem.label}</span>
        <DownOutlined />
      </div>
    </Dropdown>);
  });
  const tabItems = [
    {
      label: (
        <span>
          <CustomDesignerInspectorIcon />
          属性设置
        </span>
      ),
      key: 'Inspector',
    },
    {
      label: (
        <span>
          <CustomDesignerDataBindingIcon />
          数据绑定
        </span>
      ),
      key: 'DataBinding',
    }
  ]
  return (
    <div className='custom-designer-main-horizontal-sidebar'>
      <div className="sidebar-dropdowns">
        {menuItems}
      </div>
      <div className="sidebar-tabs">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#150C92',
            }
          }}
        >
          {isShow ? <Tabs
            items={tabItems}
            centered
            onChange={onTabChange}
            activeKey={activeKey}
            onClick={handleTabsClick}
          /> : undefined}

        </ConfigProvider>
      </div>
    </div>

  );
}
