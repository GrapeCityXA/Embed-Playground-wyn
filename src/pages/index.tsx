import { createHashRouter, useOutletContext } from 'react-router-dom';

import App from '../App';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { Home } from './home/Home';
import { Dashboard, CustomDesigner, Designer, SceneLayout, SceneTheme, SceneView, SceneChart, Portal, PortalDataCenter, PortalKanban, ReportDesigner, CustomReportDesigner,SceneAi } from './scene';
import {
  SolutionUser,
  SolutionControl,
  SolutionDrill,
  SolutionDynamic,
  SolutionFilter,
  SolutionReport,
  SolutionChart,
  SolutionDashboard,
  SolutionDesigner,
  SolutionCreateUser,
  SolutionDataSource,
  SolutionDataset,
  SolutionDocument,
  SolutionOrganization,
  SolutionRename,
  SolutionDD,
  SolutionWechat,
  SolutionCustom,
  SolutionInstall,
} from './solution';
import { ExpandLanguage, ExpandPlugin } from './expand';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'scene/dashboard',
            element: <Dashboard />,
          },
          {
            path: 'scene/chart',
            element: <SceneChart />,
          },
          {
            path: 'scene/ai-analysis',
            element: <SceneAi />,
          },
          {
            path: 'scene/designer-dashboard/standard',
            element: <Designer />,
          },
          {
            path: 'scene/designer-dashboard/custom',
            element: <CustomDesigner />,
          },
          {
            path: 'scene/designer-report/standard',
            element: <ReportDesigner />,
          },
          {
            path: 'scene/designer-report/custom',
            element: <CustomReportDesigner />,
          },
          {
            path: 'scene/portal',
            element: <Portal />,
            children: [
              {
                index: true,
                element: <PortalDataCenter />,
              },
              // {
              //   path: 'integration',
              //   element: <PortalKanban />,
              // },
              // {
              //   path: 'admin',
              //   element: <PortalKanban />,
              // },
              // {
              //   path: 'hidePrimaryNav',
              //   element: <PortalKanban />,
              // },
              // {
              //   path: 'hideNav',
              //   element: <PortalKanban />,
              // },
              {
                path: 'kanban-logistics',
                element: <PortalKanban />,
              },
              {
                path: 'kanban-multiple',
                element: <PortalKanban />,
              },
              {
                path: 'kanban-market',
                element: <PortalKanban />,
              },
              {
                path: 'kanban-product',
                element: <PortalKanban />,
              },
              {
                path: 'data-center',
                element: <PortalDataCenter />,
              },
            ],
          },
          {
            path: 'solution/layout',
            element: <SceneLayout />,
          },
          {
            path: 'solution/theme',
            element: <SceneTheme />,
          },
          {
            path: 'solution/view',
            element: <SceneView />,
          },
          {
            path: 'solution/user',
            element: <SolutionUser />,
          },
          {
            path: 'solution/control',
            element: <SolutionControl />
          },
          {
            path: 'solution/drill',
            element: <SolutionDrill />
          },
          {
            path: 'solution/dynamic',
            element: <SolutionDynamic />
          },
          {
            path: 'solution/filter',
            element: <SolutionFilter />
          },
          {
            path: 'solution/report',
            element: <SolutionReport />
          },
          {
            path: 'solution/chart',
            element: <SolutionChart />
          },
          {
            path: 'solution/dashboard',
            element: <SolutionDashboard />
          },
          {
            path: 'solution/designer',
            element: <SolutionDesigner />
          },
          {
            path: 'solution/createUser',
            element: <SolutionCreateUser />
          },
          {
            path: 'solution/dataSource',
            element: <SolutionDataSource />
          },
          {
            path: 'solution/dataset',
            element: <SolutionDataset />
          },
          {
            path: 'solution/document',
            element: <SolutionDocument />
          },
          {
            path: 'solution/organization',
            element: <SolutionOrganization />
          },
          {
            path: 'solution/rename',
            element: <SolutionRename />
          },
          {
            path: 'solution/DD',
            element: <SolutionDD />
          },
          {
            path: 'solution/wechat',
            element: <SolutionWechat />
          },
          {
            path: 'solution/custom',
            element: <SolutionCustom />
          },
          {
            path: 'solution/install',
            element: <SolutionInstall />
          },
          {
            path: 'expand/language',
            element: <ExpandLanguage />
          },
          {
            path: 'expand/plugin',
            element: <ExpandPlugin />
          },
        ],
      },
    ]
  }
]);

export default router;

export const routerPathMap: any = {
  '/': '主页',
  '/scene/dashboard': '仪表板嵌入',
  '/scene/chart': '图表嵌入',
  '/scene/ai-analysis': 'AI对话分析嵌入',
  '/scene/designer-dashboard/standard': '原生仪表板设计器嵌入',
  '/scene/designer-dashboard/custom': '自定义仪表板设计器嵌入',
  '/scene/designer-report/standard': '原生报表设计器嵌入',
  '/scene/designer-report/custom': '自定义报表设计器嵌入',
  '/scene/portal': '自定义门户嵌入',
  '/scene/portal/data-center': '自定义门户嵌入',
  '/scene/portal/kanban-logistics': '自定义门户嵌入',
  '/scene/portal/kanban-multiple': '自定义门户嵌入',
  '/scene/portal/kanban-market': '自定义门户嵌入',
  '/scene/portal/kanban-product': '自定义门户嵌入',
  // '/scene/portal/integration': '自定义门户嵌入',
  // '/scene/portal/admin': '自定义门户嵌入',
  // '/scene/portal/hidePrimaryNav': '自定义门户嵌入',
  // '/scene/portal/hideNav': '自定义门户嵌入',
  '/solution/layout': '仪表板重新布局',
  '/solution/theme': '切换主题',
  '/solution/view': '切换展示视图',
  '/solution/user': '用户身份嵌入',
  '/solution/control': '设计器初始化控制',
  '/solution/drill': '仪表板钻取',
  '/solution/dynamic': '动态图表',
  '/solution/filter': '仪表板过滤',
  '/solution/report': '报表集成',
  '/solution/chart': '图表集成',
  '/solution/dashboard': '仪表板集成',
  '/solution/designer': '设计器集成',
  '/solution/createUser': '创建用户',
  '/solution/dataSource': '创建数据源',
  '/solution/dataset': '创建数据集',
  '/solution/document': '查看我的文档',
  '/solution/organization': '创建子组织',
  '/solution/rename': '文档重命名',
  '/solution/DD': '钉钉嵌入',
  '/solution/wechat': '企业微信嵌入',
  '/solution/custom': '门户自定义',
  '/solution/install': 'OEM安装包',
  '/expand/language': '国际化',
  '/expand/plugin': '插件开发',
}

export const portalRouterPathMap: any = {
  '/scene/portal': '数据中心',
  '/scene/portal/data-center': '数据中心',
  // '/scene/portal/integration': '文档门户',
  // '/scene/portal/admin': '系统管理',
  // '/scene/portal/hidePrimaryNav': '我的分析',
  // '/scene/portal/hideNav': '文档列表',
  '/scene/portal/kanban-logistics': '物流看板',
  '/scene/portal/kanban-multiple': '综合看板',
  '/scene/portal/kanban-market': '营销看板',
  '/scene/portal/kanban-product': '生产看板',
};

export const routerPathSubmenuMap: any = {
  '/': [],
  '/scene/dashboard': [],
  '/scene/chart': [],
  '/scene/ai-analysis': [],
  '/scene/designer-dashboard/standard': ['仪表板设计器嵌入'],
  '/scene/designer-dashboard/custom': ['仪表板设计器嵌入'],
  '/scene/designer-report/standard': ['报表设计器嵌入'],
  '/scene/designer-report/custom': ['报表设计器嵌入'],
  '/scene/portal': [],
  '/scene/portal/data-center': [],
  '/scene/portal/kanban-logistics': [],
  '/scene/portal/kanban-multiple': [],
  '/scene/portal/kanban-market': [],
  '/scene/portal/kanban-product': [],
  // '/scene/portal/integration': [],
  // '/scene/portal/admin': [],
  // '/scene/portal/hidePrimaryNav': [],
  // '/scene/portal/hideNav': [],
  '/solution/layout': [],
  '/solution/theme': [],
  '/solution/view': [],
  '/solution/user': [],
  '/solution/control': ['DIV嵌入'],
  '/solution/drill': ['DIV嵌入'],
  '/solution/dynamic': ['DIV嵌入'],
  '/solution/filter': ['DIV嵌入'],
  '/solution/report': ['DIV嵌入'],
  '/solution/chart': ['DIV嵌入'],
  '/solution/dashboard': ['iFrame嵌入'],
  '/solution/designer': ['iFrame嵌入'],
  '/solution/createUser': ['REST API'],
  '/solution/dataSource': ['REST API'],
  '/solution/dataset': ['REST API'],
  '/solution/document': ['REST API'],
  '/solution/organization': ['REST API'],
  '/solution/rename': ['REST API'],
  '/solution/DD': ['移动端嵌入'],
  '/solution/wechat': ['移动端嵌入'],
  '/solution/custom': ['OEM白标嵌入'],
  '/solution/install': ['OEM白标嵌入'],
  '/expand/language': [],
  '/expand/plugin': [],
}

export function useSelectedKeys() {
  return useOutletContext<{ selectedKeys: string[] }>();
}