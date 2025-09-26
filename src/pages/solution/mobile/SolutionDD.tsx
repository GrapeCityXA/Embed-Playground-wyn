import { FC } from 'react'
import { SolutionHeader } from '../../../components/solution/SolutionHeader';
import './SolutionDD.scss'

import solutionMobileSvg from '../../../common/images/sidebar/mobile.svg';

export const SolutionDD: FC = () => {
  const title = '钉钉嵌入';
  const description = 'Wyn 支持与钉钉嵌入，系统可自动将钉钉中的用户和角色数据无缝同步到 Wyn 中，用户登录钉钉后无需切换应用，直接在钉钉应用中就可以打开Wyn 查看仪表板、报表。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/dingtalk';
  return (
    <div className='solution-dd'>
      <SolutionHeader img={solutionMobileSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/%E5%B5%8C%E5%85%A5%E5%BC%8F-%E9%92%89%E9%92%89%E9%9B%86%E6%88%90.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
