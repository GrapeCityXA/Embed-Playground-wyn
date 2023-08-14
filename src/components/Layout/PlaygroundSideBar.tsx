import type { MenuProps } from 'antd';
import { Divider, Layout, Menu } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
  ApiIcon, ChartIcon, DashboardIcon, DashboardDesignerIcon, ReportDesignerIcon, DivIcon, HomeIcon, IframeIcon, LanguageIcon, LayoutIcon,
  MobileIcon, OemIcon, PluginIcon, PortalIcon, ThemeIcon, UserIcon, ViewIcon,
} from '../../common/icons/index';

import './PlaygroundSideBar.scss';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type,
} as MenuItem);

const menuList: MenuProps['items'] = [
  getItem(<NavLink to="/">主页</NavLink>, '主页', <HomeIcon />),

  getItem(<Divider orientation="left" orientationMargin="0">嵌入式场景体验</Divider>, '嵌入式场景体验', null, [], 'group'),
  getItem(<NavLink to="/scene/dashboard">仪表板嵌入</NavLink>, '仪表板嵌入', <DashboardIcon />),
  getItem(<NavLink to="/scene/chart">图表嵌入</NavLink>, '图表嵌入', <ChartIcon />),
  getItem('仪表板设计器嵌入', '仪表板设计器嵌入', <DashboardDesignerIcon />, [
    getItem(<NavLink to="/scene/designer-dashboard/custom">自定义设计器嵌入</NavLink>, '自定义仪表板设计器嵌入'),
    getItem(<NavLink to="/scene/designer-dashboard/standard">原生设计器嵌入</NavLink>, '原生仪表板设计器嵌入'),
  ]),
  getItem('报表设计器嵌入', '报表设计器嵌入', <ReportDesignerIcon />, [
    getItem(<NavLink to="/scene/designer-report/custom">自定义设计器嵌入</NavLink>, '自定义报表设计器嵌入'),
    getItem(<NavLink to="/scene/designer-report/standard">原生设计器嵌入</NavLink>, '原生报表设计器嵌入'),
  ]),
  getItem(<NavLink to="/scene/portal">自定义门户嵌入</NavLink>, '自定义门户嵌入', <PortalIcon />),
  getItem(<NavLink to="/scene/layout">仪表板重新布局</NavLink>, '仪表板重新布局', <LayoutIcon />),
  getItem(<NavLink to="/scene/theme">切换主题</NavLink>, '切换主题', <ThemeIcon />),
  getItem(<NavLink to="/scene/view">切换展示视图</NavLink>, '切换展示视图', <ViewIcon />),

  getItem(<Divider orientation="left" orientationMargin="0">嵌入式技术方案</Divider>, '嵌入式技术方案', null, [], 'group'),
  getItem('iFrame集成', 'iFrame集成', <IframeIcon />, [
    getItem(<NavLink to="/solution/dashboard">仪表板集成</NavLink>, '仪表板集成'),
    getItem(<NavLink to="/solution/chart">图表集成</NavLink>, '图表集成'),
    getItem(<NavLink to="/solution/designer">设计器集成</NavLink>, '设计器集成'),
  ]),
  getItem('DIV集成', 'DIV集成', <DivIcon />, [
    getItem(<NavLink to="/solution/control">设计器初始化控制</NavLink>, '设计器初始化控制'),
    getItem(<NavLink to="/solution/drill">仪表板钻取</NavLink>, '仪表板钻取'),
    getItem(<NavLink to="/solution/report">报表集成</NavLink>, '报表集成'),
    getItem(<NavLink to="/solution/dynamic">动态图表</NavLink>, '动态图表'),
    getItem(<NavLink to="/solution/filter">仪表板过滤</NavLink>, '仪表板过滤'),
  ]),
  getItem('REST API集成', 'REST API集成', <ApiIcon />, [
    getItem(<NavLink to="/solution/document">查看我的文档</NavLink>, '查看我的文档'),
    getItem(<NavLink to="/solution/rename">文档重命名</NavLink>, '文档重命名'),
    getItem(<NavLink to="/solution/organization">创建子组织</NavLink>, '创建子组织'),
    getItem(<NavLink to="/solution/createUser">创建用户</NavLink>, '创建用户'),
    getItem(<NavLink to="/solution/dataSource">创建数据源</NavLink>, '创建数据源'),
    getItem(<NavLink to="/solution/dataset">创建数据集</NavLink>, '创建数据集'),
  ]),
  getItem(<NavLink to="/solution/user">用户身份集成</NavLink>, '用户身份集成', <UserIcon />),
  getItem('移动端集成', '移动端集成', <MobileIcon />, [
    getItem(<NavLink to="/solution/wechat">企业微信集成</NavLink>, '企业微信集成'),
    getItem(<NavLink to="/solution/DD">钉钉集成</NavLink>, '钉钉集成'),
  ]),
  getItem('OEM白标集成', 'OEM白标集成', <OemIcon />, [
    getItem(<NavLink to="/solution/custom">门户自定义</NavLink>, '门户自定义'),
    getItem(<NavLink to="/solution/install">OEM安装包</NavLink>, 'OEM安装包'),
  ]),
  getItem(<Divider orientation="left" orientationMargin="0">自定义系统扩展</Divider>, '自定义系统扩展', null, [], 'group'),

  getItem(<NavLink to="/expand/language">国际化</NavLink>, '国际化', <LanguageIcon />),
  getItem(<NavLink to="/expand/plugin">插件开发</NavLink>, '插件开发', <PluginIcon />),
];

interface PlaygroundSidebarProps {
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: any;
  changeSelectedKeys: Function;
}

export const PlaygroundSidebar: FC<PlaygroundSidebarProps> = (props) => {
  const {
    selectedKeys,
    openKeys,
    onOpenChange,
    changeSelectedKeys,
  } = props;

  const onMenuItemSelected = ({ selectedKeys }: any) => {
    changeSelectedKeys(selectedKeys);
    localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys));
  };

  return (
    <Sider width={230} className="main-sidebar">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        style={{ height: '100%', borderRight: 0 }}
        items={menuList}
        className="sidebar-menu"
        onOpenChange={onOpenChange}
        onSelect={onMenuItemSelected}
      />
    </Sider>
  );
}
