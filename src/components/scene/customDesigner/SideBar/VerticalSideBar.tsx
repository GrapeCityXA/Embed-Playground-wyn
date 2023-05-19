import { FC } from 'react';
import { Layout, Collapse, Row, Col } from 'antd';

import './VerticalSideBar.scss';

const { Sider } = Layout;
const { Panel } = Collapse;

interface VerticalSideBarProps {
  sideBarItems: {
    icon: any,
    label: string,
    children: Array<any>,
  }[],
  collapsed: boolean,
  addVisual: Function,
  collapseActiveKey: string[],
  handleCollapsedKey: Function,
}


export const VerticalSideBar: FC<VerticalSideBarProps> = (verticalSideBarProps) => {
  const { sideBarItems, collapsed, addVisual, collapseActiveKey, handleCollapsedKey } = verticalSideBarProps;

  const onCollapseChange = (key: string | string[]) => { handleCollapsedKey(key); };

  return (
    <Sider
      width={275}
      className='custom-designer-main-sidebar'
      theme='light'
      collapsed={collapsed}
      collapsedWidth={50}
    >
      <Collapse
        ghost
        expandIconPosition='end'
        collapsible={collapsed ? 'disabled' : undefined}
        activeKey={collapseActiveKey}
        onChange={onCollapseChange}
      >
        {sideBarItems.map((item, index: number) => {
          return (
            <Panel
              header={
                <div className='header-title'>
                  {item.icon}
                  <span className='header-title-text'>{item.label}</span>
                </div>
              }
              key={`header-${index}`}
            >
              <Row gutter={[40, 40]}>
                {item.children.map((child, childIndex) => {
                  return (
                    <Col span={6} key={`header-child-${childIndex}`} className='custom-designer-vertical-menu-item' onClick={() => addVisual(child.label)}>
                      {child.icon}
                    </Col>
                  )
                })}
              </Row>
            </Panel>
          )
        })}
      </Collapse>
    </Sider>
  );
}
