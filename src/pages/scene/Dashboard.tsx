import { FC, useState } from 'react';

import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';

import './Dashboard.scss';


const menu = [
  {
    value: '0f452a45-b9ee-4abe-9b0f-72b1de8a6e01',
    label: '营销管理智慧中心',
  },
  {
    value: '36216337-ba1b-44b5-a219-0f93a54119ed',
    label: '新零售看板',
  },
  {
    value: '31fd1d3a-597a-4c72-a0f5-1ccfa9972a95',
    label: '供应链管理指挥中心',
  },
]

export const Dashboard: FC = () => {
  const [dashboardId, setDashboardId] = useState<string>('0f452a45-b9ee-4abe-9b0f-72b1de8a6e01');

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
