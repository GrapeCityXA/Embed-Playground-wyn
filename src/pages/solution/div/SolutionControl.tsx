import { FC, useEffect, useRef, useState } from 'react'
import { solutionDivInitDesigner, dependentPackageLoad, PluginTypes } from '../../../common/utils/utils';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import solutionDivSvg from '../../../common/images/sidebar/div.svg';
import { useSelectedKeys } from '../../index';
import './SolutionControl.scss';

let designer: any = undefined;

export const SolutionControl: FC = () => {
  const title = 'DIV嵌入-设计器初始化控制';
  const description = '用户可以通过DIV的原生方式，将仪表板设计器直接嵌入业务系统，并初始化部分设计器元素，实现快速创建仪表板。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/dashboard-designer';
  const codeText = `<link rel="stylesheet" href="../../../styles/dashboard/standard/dashboard.vendor.css"> \
\n<link rel="stylesheet" href="../../../styles/dashboard/standard/dashboard.app.css"> \
\n<script src="../../../js/dashboard/polyfills.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.common.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.sheet.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.chart.js"></script> \
\n<script src="../../../js/dashboard/standard/dashboard.app.js"></script> \
\n<script src="../../../js/dashboard/standard/dashboard.libs.extension.js"></script> \
\n<div id="dashboard"></div> \
\n<script> \
\n  const designer = WynBi.create("DashboardDesigner", { \
\n    lng: "zh", \
\n    baseUrl: { baseUrl }, \
\n    token: { token }, \
\n    datasetId: { datasetId }, \
\n  }); \
\n  designer.initialize({ \
\n    container: document.querySelector("#dashboard"), \
\n  }); \
\n<script />`;

  const controlRef = useRef(null);
  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  const createDesigner = () => {
    if (!designer) {
      designer = WynBi.create("DashboardDesigner", solutionDivInitDesigner);
    }
    designer.initialize({
      container: controlRef.current,
    });
  };

  useEffect(() => {
    return () => {
      if (designer) {
        designer.destroy();
      }
    }
  }, []);

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '设计器初始化控制') {
      return;
    }
    createDesigner();
  }, [isPackageLoaded, selectedKeys])

  return (
    <div className='solution-control-dashboard'>
      <SolutionHeader img={solutionDivSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-control-content">
        <div id='control-content-dashboard' className="control-content-dashboard" ref={controlRef}></div>
        <ShowCodeBottom codeText={codeText} title='设计器初始化控制' />
      </div>
    </div>
  )
}
