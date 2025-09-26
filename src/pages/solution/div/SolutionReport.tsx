import { FC, useEffect, useState } from 'react'
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import { dependentPackageLoad, PluginTypes } from '../../../common/utils/utils';
import { useSelectedKeys } from '../../index';

import solutionDivSvg from '../../../common/images/sidebar/div.svg';
import './SolutionReport.scss';

let viewer: any | undefined;

export const SolutionReport: FC = () => {
  const title = 'DIV嵌入-报表嵌入';
  const description = '用户可以使用DIV的原生方式，将报表的DIV元素写入业务系统的网页代码中，实现在业务系统中嵌入报表。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/dashboard';
  const codeText = `<link href="../../../plugin/report/viewer-app.blue.css" rel="stylesheet"> \
\n<link href="../../../plugin/report/viewer-app.chart.css" rel="stylesheet"> \
\n<script type="text/javascript" src="../../../plugin/report/viewer-app.js"></script> \
\n<script type="text/javascript" src="../../../plugin/report/viewer-app.chart.js"></script> \
\n<div id="report-viewer-app"></div> \
\n<script> \
\n  const prevDocumentTitle = document.title; \
\n  const reportViewerAppId = "report-viewer-app"; \
\n  const viewer = window.GrapeCity.WynReports.Viewer.create({ \
\n    element:"report-viewer-app", \
\n    portalUrl: {baseUrl}, \
\n    referenceToken: {token}, \
\n    locale: "en", \
\n  }); \
\n  viewer.openReport({reportId}); \
\n<script />`;

  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Report).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    // if (selectedKeys[0] !== '报表集成') {
    //   return;
    // }
    viewer = (window as any).GrapeCity.WynReports.Viewer.create({
      element: 'report-viewer-app-1',
      portalUrl: WYN.WYN_HOST,
      referenceToken: WYN.WYN_TOKEN,
    });
    viewer.openReport('e0899bb7-827c-4a33-a9d9-12dd720ed220');

    return () => {
      if (viewer) {
        viewer.destroy();
        viewer = undefined;
      }
    };
  }, [isPackageLoaded, selectedKeys])

  return (
    <div className='solution-report'>
      {/* <SolutionHeader img={solutionDivSvg} title={title} description={description} helpDocUrl={helpDocUrl} /> */}
      <div className="report-content">
        <div id='report-viewer-app-1' className="report-viewer-app"></div>
        {/* <ShowCodeBottom codeText={codeText} title='报表集成' /> */}
      </div>
    </div>
  )
}
