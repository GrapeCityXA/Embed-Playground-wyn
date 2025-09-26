import { FC, useEffect, useState } from 'react';
import { Layout, Collapse, Row, Col } from 'antd';

import './VerticalSideBar.scss';
import { getVizTemplate } from './HorizontalSideBar';
import { VizTemplateIcon } from '../../../../common/icons';

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
  const [vizList, setVizList] = useState<{id:string, thumbnail: string, title: string}[]>([]);
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
        {
          <Panel
          header={
            <div className='header-title'>
              <VizTemplateIcon />
              <span className='header-title-text'>{'组件模板'}</span>
            </div>
          }
          key={'header-viz'}
        >
          <Row gutter={[0, 40]}>
            {vizList.map((child, childIndex) => {
              return (
                <Col span={12} key={child.id} title={child.title} className='custom-designer-vertical-menu-item' onClick={() => addVisual(undefined, child.id)}>
                  <div style={{
                    backgroundSize: "100% 100%",
                    backgroundImage: `url("${WYN.WYN_HOST}/${(child as any)?.thumbnail || 'images/thumbnails/viz-template.png'}?token=${WYN.WYN_TOKEN}")`,
                    height: 70,
                    width: 100,
                    cursor: 'pointer'
                  }}>
                  </div>
                </Col>
              )
            })}
          </Row>
          </Panel>
        }
      </Collapse>
    </Sider>
  );
}
