import { FC } from 'react'
import { SolutionHeader } from '../../components/solution/SolutionHeader';
import './SolutionUser.scss';

import solutionUserSvg from '../../common/images/user.svg';

export const SolutionUser: FC = () => {
  const title = '用户身份嵌入';
  const description = '用户可使用单点登录的方式与其他业务系统集成，一次登录即可安全、方便的访问系统仪表板、报表资源，如下是泛微OA的用户身份集成示例。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/user-identity-integration#strong%E5%8D%95%E7%82%B9%E7%99%BB%E5%BD%95%E9%9B%86%E6%88%90strong';
  return (
    <div className='solution-user'>
      <SolutionHeader img={solutionUserSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E9%9B%86%E6%88%90.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
