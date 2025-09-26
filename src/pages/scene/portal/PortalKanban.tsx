import { FC } from 'react'
import { useKanban } from './index';

import './PortalKanban.scss';

export const PortalKanban: FC = () => {
  const { kanban } = useKanban();
  switch (kanban) {
    case 'integration':
      return (
        <div className="portal-dashboard-panel">
          <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
            src={`${WYN.WYN_HOST}/integration/?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN`}></iframe>
        </div>
      )
    case 'admin':
      return (
        <div className="portal-dashboard-panel">
          <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
            src={`${WYN.WYN_HOST}/admin/?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN`}></iframe>
        </div>
      )
    case 'hidePrimaryNav':
      return (
        <div className="portal-dashboard-panel">
          <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
            src={`${WYN.WYN_HOST}/integration/documenttypes/dbd/documents/?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN&hidePrimaryNav=true`}></iframe>
        </div>
      )
    case 'hideNav':
      return (
        <div className="portal-dashboard-panel">
          <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
            src={`${WYN.WYN_HOST}/integration/documenttypes/dbd/documents/?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN&hideNav=true`}></iframe>
        </div>
      )
    default:
      return (
        <div className="portal-dashboard-panel">
          <iframe id="portal-dashboard-iframe" className="portal-dashboard-iframe" title='portal-dashboard-iframe'
            src={`${WYN.WYN_HOST}/dashboards/view/${kanban}?theme=Playground&token=${WYN.WYN_TOKEN}&lng=zh-CN`}></iframe>
        </div>
      )
  }
  
}

