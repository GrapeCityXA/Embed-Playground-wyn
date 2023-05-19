import { FC } from 'react'
import { SolutionHeader } from '../../../components/solution/SolutionHeader';
import './SolutionDD.scss'

import solutionMobileSvg from '../../../common/images/sidebar/mobile.svg';

export const SolutionDD: FC = () => {
  const title = '钉钉集成';
  const description = 'Wyn 支持与钉钉集成，系统可自动将钉钉中的用户和角色数据无缝同步到 Wyn 中，用户登录钉钉后无需切换应用，直接在钉钉应用中就可以打开Wyn 查看仪表板、报表。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/dingtalk';
  return (
    <div className='solution-dd'>
      <SolutionHeader img={solutionMobileSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/嵌入式-钉钉集成.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
