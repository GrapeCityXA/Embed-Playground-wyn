import { FC } from 'react'
import { SolutionHeader } from '../../../components/solution/SolutionHeader';
import './SolutionWechat.scss';

import solutionMobileSvg from '../../../common/images/sidebar/mobile.svg';

export const SolutionWechat: FC = () => {
  const title = '企业微信嵌入';
  const description = 'Wyn 支持与企业微信嵌入，系统可自动将企业微信中的用户和角色数据无缝同步到 Wyn 中，用户登录企业微信后无需切换应用，直接在企业微信应用中就可以打开Wyn 查看仪表板、报表。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/integration-with-wechat';
  return (
    <div className='solution-wechat'>
      <SolutionHeader img={solutionMobileSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/%E5%B5%8C%E5%85%A5%E5%BC%8F-%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E9%9B%86%E6%88%90.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
