import { FC, useState } from 'react';

import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';

import './Dashboard.scss';


const menu = [
  {
    value: '01130402-b444-4373-9098-a2a351422417',
    label: '省电力公司电网资产监管中心',
  },
  {
    value: '5f2de284-68ba-4753-bc95-6d2b65a54443',
    label: '制造业综合管理',
  },
  {
    value: 'a847e7c2-9c15-416e-a01f-5f0b429faa4c',
    label: '生产设备监控中心',
  },
]

export const Dashboard: FC = () => {
  const [dashboardId, setDashboardId] = useState<string>('01130402-b444-4373-9098-a2a351422417');

  const onSelectChange = (newDashboardId: string) => {
    setDashboardId(newDashboardId);
  }

  return (
    <div className='scene-content'>
      <SceneHeader options={menu} defaultValue={dashboardId} onSelectChange={onSelectChange} />
      <iframe id="scene-iframe" className="scene-iframe" title='scene-iframe'
        src={`${WYN.WYN_HOST}/dashboards/view/${dashboardId}?theme=Playground&token=${WYN.WYN_TOKEN}`}></iframe>
    </div>
  );
};
