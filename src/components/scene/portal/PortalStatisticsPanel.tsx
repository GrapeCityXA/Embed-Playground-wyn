import { FC } from 'react'
import { PortalStatisticsPanelItem } from './PortalStatisticsPanelItem';
import {
  PortalDashboardIcon,
  PortalReportIcon,
  PortalDataModelIcon,
  PortalDatasetIcon,
  PortalDataSourceIcon,
} from '../../../common/icons';
import './PortalStatisticsPanel.scss';

interface PortalStatisticsPanelProps {
  documentTypeCount: {
    dashboard: number;
    report: number;
    dataModel: number;
    dataset: number;
    dataSource: number;
  }
}

export const PortalStatisticsPanel: FC<PortalStatisticsPanelProps> = (props) => {
  const { documentTypeCount } = props;

  const statisticsPanelItems = [
    {
      title: '仪表板',
      count: documentTypeCount.dashboard,
      icon: <PortalDashboardIcon />,
    },
    {
      title: '报表',
      count: documentTypeCount.report,
      icon: <PortalReportIcon />,
    },
    {
      title: '数据模型',
      count: documentTypeCount.dataModel,
      icon: <PortalDataModelIcon />,
    },
    {
      title: '数据集',
      count: documentTypeCount.dataset,
      icon: <PortalDatasetIcon />,
    },
    {
      title: '数据源',
      count: documentTypeCount.dataSource,
      icon: <PortalDataSourceIcon />,
    },
  ];

  return (
    <div className='statistics-panel'>
      {statisticsPanelItems.map((statisticsPanelItem) => <PortalStatisticsPanelItem portalStatisticsPanelItemInfo={statisticsPanelItem} key={statisticsPanelItem.title} />)}
    </div>
  )
}
