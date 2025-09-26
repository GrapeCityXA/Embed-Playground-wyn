import { FC, useEffect, useState } from 'react';
import { Dropdown, Row, Col, ConfigProvider } from 'antd';
import { DownOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Tabs } from 'antd';
import { CustomDesignerInspectorIcon, CustomDesignerDataBindingIcon, VizTemplateIcon } from '../../../../common/icons'
import { api } from '../../../../common/utils/utils';
import { sendRequest } from '../../../../common/utils/api-service';


import './HorizontalSideBar.scss';

export const getVizTemplate = async () => {
  const res: any = await sendRequest({
    ...api.getV2AllDocuments,
    body: api.getV2AllDocuments.getBody("viz-template")
  });
  return res.data || [];
}

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

const VizMenu = (props: {
  vizList: {
    title: string;
    thumbnail: string;
    id: string
  }[],
  addVisual: (id?:string, templateId?: string) => any
}) => {
  const menuItem: MenuProps['items'] = props.vizList.map((child) => ({
    key: child.id,
    label: child.title,
    thumbnail: child.thumbnail,
    id: child.id,
  }));
  return (
    <Dropdown menu={{ items: menuItem } as MenuProps}
      dropdownRender={(menu) => (
        <Row gutter={6} className='custom-designer-horizontal-dropdown' style={{width: 320, maxHeight: 490, overflow: 'auto'}}>
          {menuItem.map((child, childIndex) => {
            return (
              <Col title={(child as any).label} span={12} key={`header-child-${childIndex}`} className='custom-designer-horizontal-dropdown-item' onClick={() => {
                props.addVisual(undefined, (child as any).id);
              }}>
                <div style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("${WYN.WYN_HOST}/${(child as any)?.thumbnail || 'images/thumbnails/viz-template.png'}?token=${WYN.WYN_TOKEN}")`,
                  height: 70,
                  width: 140,
                  cursor: 'pointer'
                }}>
                </div>
              </Col>
            )
          })}
        </Row>
      )}
      key={'header-viz'}
      placement='bottomLeft'
      trigger={['hover']}
      overlayClassName='dropdown-style'
      overlayStyle={{ top: -4 }}
      >
      <div className='header-title'>
        <VizTemplateIcon />
        <span className='header-title-label'>{'组件模板'}</span>
        <DownOutlined />
      </div>
    </Dropdown>
  )
}

export const HorizontalSideBar: FC<HorizontalSideBarProps> = (horizontalSideBarProps) => {
  const { sideBarItems, addVisual, toggleInspectorVisible, toggleDataBindingVisible, isShow, activeKey } = horizontalSideBarProps;
  const [vizList, setVizList] = useState([]);
  useEffect(() => {
    const getVitListReq = async () => {
      try {
        const list = await getVizTemplate();
        setVizList(list)
      } catch(e) {

      }
    }
    getVitListReq();
  }, []);

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
        <VizMenu vizList={vizList} addVisual={addVisual as any}/>
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
