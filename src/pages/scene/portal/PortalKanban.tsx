import { FC } from 'react'
import { useKanban } from './index';

import './PortalKanban.scss';

export const PortalKanban: FC = () => {
  const { kanban } = useKanban();

  return (
    <div className="portal-dashboard-panel">
      <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
        src={`${WYN.WYN_HOST}/dashboards/view/${kanban}?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN`}></iframe>
    </div>
  )
}
