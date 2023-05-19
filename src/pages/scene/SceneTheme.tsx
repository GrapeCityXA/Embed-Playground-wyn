import { FC, useState } from 'react';
import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';

const menu = [
  {
    value: 'playground',
    label: '默认主题',
  },
  {
    value: 'blue',
    label: '蓝色主题',
  },
  {
    value: 'red',
    label: '红色主题',
  },
]

export const SceneTheme: FC = () => {
  const [dashboardTheme, setDashboardTheme] = useState<string>('playground');

  const onSelectChange = (newDashboardTheme: string) => {
    setDashboardTheme(newDashboardTheme);
  }

  return (
    <div className='scene-content'>
      <SceneHeader  options={menu} defaultValue={dashboardTheme} onSelectChange={onSelectChange} />
      <iframe id="scene-iframe" className="scene-iframe" title='scene-iframe'
        src={`${WYN.WYN_HOST}/dashboards/view/f3dd8756-908c-4158-8153-2bbb3eb51ab7?toolbar=show&lite=false&theme=${dashboardTheme}&lng=zh&token=${WYN.WYN_TOKEN}`}></iframe>
    </div>
  )
}
