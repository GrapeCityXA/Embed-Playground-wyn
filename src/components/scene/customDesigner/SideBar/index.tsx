import { FC } from 'react';

import {
  AdvancedChartIcon,
  BasicChartIcon,
  FilterChartIcon,
  ContainerChartIcon,
  ColumnChartIcon,
  LineChartIcon,
  StackedAreaChartIcon,
  FilledRadarChartIcon,
  BarChartIcon,
  BarInPolarChartIcon,
  PieChartIcon,
  BubbleChartIcon,
  PivotTableIcon,
  TreeMapChartIcon,
  ThreeDBarChartIcon,
  ThreeDPieChartIcon,
  ThreeDColumnChartIcon,
  ThreeDEarthMapChartIcon,
  ThreeDFunnelChartIcon,
  ThreeDPyramidChartIcon,
  ThreeDWorldCloudChartIcon,
  ThreeDBaiduMapChartIcon,
  MultiDimensionalSlicerIcon,
  DateRangeSlicerIcon,
  MultiDimensionalDropdownSlicerIcon,
  ContainerIcon,
  TabContainerIcon,
} from '../../../../common/icons';

import { HorizontalSideBar } from './HorizontalSideBar';
import { VerticalSideBar } from './VerticalSideBar';

interface SideBarItems {
  icon: any,
  label: string,
  children: Array<any>
}

const sideBarItems: Array<SideBarItems> = [
  {
    icon: <BasicChartIcon />,
    label: '基础图表',
    children: [
      {
        label: 'column',
        icon: <ColumnChartIcon />,
      },
      {
        label: 'line',
        icon: <LineChartIcon />,
      },
      {
        label: 'stackedArea',
        icon: <StackedAreaChartIcon />,
      },
      {
        label: 'filledRadar',
        icon: <FilledRadarChartIcon />,
      },
      {
        label: 'stackedBar',
        icon: <BarChartIcon />,
      },
      {
        label: 'barInPolar',
        icon: <BarInPolarChartIcon />,
      },
      {
        label: 'pie',
        icon: <PieChartIcon />,
      },
      {
        label: 'bubble',
        icon: <BubbleChartIcon />,
      },
      {
        label: 'pivotTable',
        icon: <PivotTableIcon />,
      },
      {
        label: 'treeMap',
        icon: <TreeMapChartIcon />,
      },
    ]
  },
  {
    icon: <AdvancedChartIcon />,
    label: '高级图表',
    children: [
      {
        label: '对比条形图',
        icon: <ThreeDBarChartIcon />
      },
      {
        label: '3D饼图',
        icon: <ThreeDPieChartIcon />
      },
      {
        label: '扩展柱状图',
        icon: <ThreeDColumnChartIcon />
      },
      {
        label: '3D地球',
        icon: <ThreeDEarthMapChartIcon />
      },
      {
        label: '3D漏斗图',
        icon: <ThreeDFunnelChartIcon />
      },
      {
        label: '3D四棱锥',
        icon: <ThreeDPyramidChartIcon />
      },
      {
        label: 'wordCloud3D',
        icon: <ThreeDWorldCloudChartIcon />
      },
      {
        label: '百度地图',
        icon: <ThreeDBaiduMapChartIcon />
      },
    ]
  },
  {
    icon: <FilterChartIcon />,
    label: '筛选器',
    children: [
      {
        label: 'treeSlicer',
        icon: <MultiDimensionalSlicerIcon />,
      },
      {
        label: 'dateRangeSlicer',
        icon: <DateRangeSlicerIcon />
      },
      {
        label: 'comboBoxSlicer',
        icon: <MultiDimensionalDropdownSlicerIcon />
      },
    ]
  },
  {
    icon: <ContainerChartIcon></ContainerChartIcon>,
    label: '容器&组件',
    children: [
      {
        label: 'container',
        icon: <ContainerIcon />,
      },
      {
        label: 'tabContainer',
        icon: <TabContainerIcon />,
      }
    ]
  },
]

interface CustomDesignerHorizontalSideBarProps {
  addVisual: Function,
  toggleInspectorVisible: Function,
  toggleDataBindingVisible: Function,
  isShow: boolean,
  activeKey: string,
}

export const CustomDesignerHorizontalSideBar: FC<CustomDesignerHorizontalSideBarProps> = (props) => {
  const { addVisual, toggleInspectorVisible, toggleDataBindingVisible, isShow, activeKey } = props;
  return <HorizontalSideBar
    sideBarItems={sideBarItems}
    addVisual={addVisual}
    toggleInspectorVisible={toggleInspectorVisible}
    toggleDataBindingVisible={toggleDataBindingVisible}
    isShow={isShow}
    activeKey={activeKey}
  />;
}

interface CustomDesignerVerticalSideBarProps {
  collapsed: boolean,
  addVisual: Function,
  collapseActiveKey: string[],
  handleCollapsedKey: Function,
}

export const CustomDesignerVerticalSideBar: FC<CustomDesignerVerticalSideBarProps> = (props) => {
  const { collapsed, addVisual, collapseActiveKey, handleCollapsedKey } = props;
  return <VerticalSideBar
    sideBarItems={sideBarItems}
    collapsed={collapsed}
    addVisual={addVisual}
    collapseActiveKey={collapseActiveKey}
    handleCollapsedKey={handleCollapsedKey}
  />;
}
