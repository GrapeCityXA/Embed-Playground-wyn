import { FC } from 'react'
import { SolutionHeader } from '../../../components/solution/SolutionHeader';
import './SolutionInstall.scss';

import solutionOEMSvg from '../../../common/images/sidebar/oem.svg';
import OEMPng from '../../../common/images/OEM.png';

export const SolutionInstall: FC = () => {
  const title = 'OEM安装包';
  const description = 'Wyn支持完全自定义安装包，通过替换产品Logo、公司名称、登录界面等将Wyn的安装包OEM，然后导出定制信息再以静默的方式嵌入到业务系统的产品安装包中，用户最终在使用产品时，完全感受不到 Wyn的存在。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/back-stage/system-settings/appearance/login-page-setting';
  return (
    <div className='solution-install'>
      <SolutionHeader img={solutionOEMSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="img-content">
        <img className="image" alt="" src={OEMPng} />
      </div>
    </div>
  )
}
