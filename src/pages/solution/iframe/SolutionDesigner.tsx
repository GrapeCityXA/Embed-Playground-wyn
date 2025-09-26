import { FC } from 'react';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import './SolutionDesigner.scss';

import solutionDesignerSvg from '../../../common/images/sidebar/iframe.svg';

export const SolutionDesigner: FC = () => {
  const title = 'iframe嵌入-设计器';
  const description = '用户可以在其 Web 应用程序的 iFrame 中指定仪表板设计器对应的URL来实现嵌入仪表板设计器，用户可以在门户中直接设计并预览仪表板，嵌入结果如下。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/url-integration/dashboard-report-designer';
  const codeText = '<iframe src="{basic_src}/dashboards/edit/{dashboardId}?token={token}"></iframe>';

  return (
    <div className='solution-designer'>
      <SolutionHeader img={solutionDesignerSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="designer-content">
        <div className="designer-content-iframe">
          <iframe id="designer-iframe" title='designer-iframe' className="designer-iframe iframe-no-border" src={`${WYN.WYN_HOST}/dashboards/edit/0bead052-d56a-4fac-897b-a2984c0208e3?theme=playground&lng=zh&token=${WYN.WYN_TOKEN}`}></iframe>
        </div>
        <ShowCodeBottom codeText={codeText} title='设计器' />
      </div>
    </div>
  )
}
