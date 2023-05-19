import { FC } from 'react'
import { SolutionHeader } from '../../../components/solution/SolutionHeader';
import './SolutionCustom.scss';

import solutionCustomSvg from '../../../common/images/sidebar/oem.svg';

export const SolutionCustom: FC = () => {
  const title = '门户自定义';
  const description = 'Wyn支持用户自定义系统门户外观相关属性、系统Logo、登录画面等外观元素，快速自定义自己的BI产品。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/back-stage/system-settings/appearance/login-page-setting';
  return (
    <div className='solution-custom'>
      <SolutionHeader img={solutionCustomSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/门户自定义设置.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
