import { FC } from 'react';
import './PortalStatisticsPanelItem.scss';

interface PortalStatisticsPanelItemProps {
  portalStatisticsPanelItemInfo: {
    title: string,
    count: number,
    icon: any,
  }
}

export const PortalStatisticsPanelItem: FC<PortalStatisticsPanelItemProps> = (props) => {
  const { portalStatisticsPanelItemInfo } = props;
  return (
    <div className='statistics-panel-item'>
      <div className='statistics-panel-item-icon'>
        {portalStatisticsPanelItemInfo.icon}
      </div>
      <div className='statistics-panel-item-content'>
        <div className='statistics-panel-item-content-title'>{portalStatisticsPanelItemInfo.title}</div>
        <div className='statistics-panel-item-content-count'><span>{portalStatisticsPanelItemInfo.count}</span>个</div>
      </div>
    </div>
  )
}
