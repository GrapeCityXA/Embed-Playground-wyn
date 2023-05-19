import { FC, useEffect } from 'react'
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader, } from '../../../components/solution';
import solutionDashboardSvg from '../../../common/images/sidebar/iframe.svg';
import './SolutionDashboard.scss';

export const SolutionDashboard: FC = () => {
  const title = 'iframe集成-仪表板';
  const description = '用户可以在其 Web 应用程序的 iFrame 中指定仪表板对应的URL来实现嵌入仪表板，同时可以通过外部参数传入来控制其交互行为，嵌入结果如下。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/url-integration/dashboard-report-designer';
  const codeText = '<iframe src="{basic_src}/dashboards/view/{dashboardId}?token={token}&toolbar=${toolbar}&size=${size}"></iframe>';

  useEffect(() => {
    const iframe: any = document.getElementById("solution-dashboard-iframe");
    let toolbar = "show";
    let size = "fitscreen";
    const getURL = () => {
      return `${WYN.WYN_HOST}/dashboards/view/f3dd8756-908c-4158-8153-2bbb3eb51ab7?lite=false&theme=red&token=${WYN.WYN_TOKEN}&toolbar=${toolbar}&size=${size}`;
    }
    iframe.src = getURL();

    const changeToolbar = (e: any) => {
      toolbar = e.target.value;
      iframe.src = getURL();
    }
    const changeSize = (e: any) => {
      size = e.target.value;
      iframe.src = getURL();
    }
    (document.getElementById('show-toolbar') as any).addEventListener('change', changeToolbar, false);
    (document.getElementById('set-size') as any).addEventListener('change', changeSize, false);
  });

  return (
    <div className='solution-dashboard'>
      <SolutionHeader img={solutionDashboardSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-dashboard-content">
        <SolutionToggleHeader>
          <div className="solution-control">
            <span>请选择参数：</span>
            <div className="solution-control-list solution-dashboard-control-list">
              <div className="solution-control-item">
                <span className="select-text">工具栏</span>
                <select className="solution-control-dropdown" id="show-toolbar">
                  <option value="show" selected>显示</option>
                  <option value="hide">隐藏</option>
                  <option value="auto">自动</option>
                </select>
              </div>
              <div className="solution-control-item">
                <span className="select-text">尺寸</span>
                <select className="solution-control-dropdown" id="set-size">
                  <option value="fitscreen" selected>适应屏幕</option>
                  <option value="fitheight">高度自适应</option>
                  <option value="fitwidth">宽度自适应</option>
                  <option value="auto">等比缩放</option>
                </select>
              </div>
            </div>
          </div>
        </SolutionToggleHeader>
        <div className="solution-content-iframe">
          <iframe id="solution-dashboard-iframe" className="solution-iframe iframe-no-border" title='solution-dashboard-iframe'></iframe>
        </div>
        <ShowCodeBottom codeText={codeText} title='仪表板' />
      </div>
    </div>
  )
}
