import { FC, useEffect, useState } from 'react'
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader } from '../../../components/solution';
import solutionDivSvg from '../../../common/images/sidebar/div.svg';
import { dependentPackageLoad, PluginTypes, isLoaded } from '../../../common/utils/utils';
import { useSelectedKeys } from '../../index';
import './SolutionFilter.scss';

export const SolutionFilter: FC = () => {
  const title = 'DIV集成-仪表板过滤';
  const description = '用户可以使用DIV的原生方式，将仪表板的DIV元素写入业务系统的网页代码中，实现在业务系统中嵌入仪表板，同时通过外部筛选实现动态过滤仪表板内容。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/dashboard';
  const codeText = '<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.default.css"> \n\
<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.vendor.css"> \n\
<script src="../../../js/dashboard/polyfills.js"></script> \n\
<script src="../../../js/dashboard/dashboard.libs.common.js"></script> \n\
<script src="../../../js/dashboard/dashboard.libs.sheet.js"></script> \n\
<script src="../../../js/dashboard/dashboard.libs.chart.js"></script> \n\
<script src="../../../js/dashboard/lite/dashboard.viewerLite.js"></script> \n\
<input id="alipay" type="checkbox" value="支付宝" name="pay" /> <label for="alipay">支付宝</label> \n\
<input id="wechat" type="checkbox" value="微信" name="pay" /> <label for="wechat">微信</label> \n\
<div id="page-1" class="layout1"></div> \n\
<script> \n\
  const paySet = new Set(); \n\
  \n\
  const defaultWynBi = { \n\
    lng: "zh", \n\
    baseUrl: { baseUrl }, \n\
    token: { token }, \n\
    dashboardId: { dashboardId }, \n\
  } \n\
  \n\
  const refreshDashboard = () => { \n\
    const container = document.getElementById("page-1"); \n\
    container.innerHTML = ""; \n\
    let bi = { ...defaultWynBi }; \n\
    if (paySet.size) { \n\
      bi.dp = `{"paymenttype":[${Array.from(paySet).map(name => `"${name}"`).join(",")}]}` \n\
    } \n\
    const ins = WynBi.createViewerLite(bi); \n\
    ins.initialize({ \n\
      container: container, \n\
    }).then((uiDashboard) => { \n\
      const page = uiDashboard.pages[0]; // UIPage \n\
      const dom = document.createElement("div"); \n\
      dom.className = "page-dom"; \n\
      container.appendChild(dom); \n\
      page.connect(dom); \n\
      page.refresh(); \n\
    }); \n\
  } \n\
  \n\
  const selectPay = (e) => { \n\
    if (e.target.checked) { \n\
      paySet.add(e.target.value); \n\
      refreshDashboard(); \n\
    } else { \n\
      paySet.remove(e.target.value); \n\
      refreshDashboard(); \n\
    } \n\
  } \n\
\n\
  const elements = document.getElementsByName("pay"); \n\
  console.log(elements) \n\
  for (let i = 0; i < elements.length; i++) { \n\
    elements[i].addEventListener("click", selectPay); \n\
  } \n\
  \n\
  refreshDashboard(); \n\
<script />';

  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  const paySet: any = new Set();
  const defaultWynBi = {
    lng: 'zh',
    baseUrl: WYN.WYN_HOST,
    token: WYN.WYN_TOKEN,
    dashboardId: 'f2a3f074-dbaa-47f4-8bb6-d1d0591f67ec',
  }

  useEffect(() => {
    const refreshDashboard = () => {

      dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
        setIsPackageLoaded(true);
      });
    }

    const selectPay = (e: any) => {
      if (e.target.checked) {
        paySet.add(e.target.value);
        refreshDashboard();
      } else {
        paySet.remove(e.target.value);
        refreshDashboard();
      }
    }

    const elements = document.getElementsByName("pay");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", selectPay);
    }

    refreshDashboard();
  });

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '仪表板过滤') {
      return;
    }
    const container: any = document.getElementById("page-1");
    container.innerHTML = "";
    let bi: any = { ...defaultWynBi };
    if (paySet.size) {
      bi.dp = `{"paymenttype":[${Array.from(paySet).map(name => `"${name}"`).join(",")}]}`
    }
    const ins = WynBi.createViewerLite(bi);
    ins.initialize({
      container: container,
    }).then((uiDashboard: any) => {
      const page = uiDashboard.pages[0]; // UIPage
      const dom = document.createElement('div');
      dom.className = 'page-dom';
      container.appendChild(dom);
      page.connect(dom);
      page.refresh();
    });
  }, [isPackageLoaded, selectedKeys])

  return (
    <div className='solution-filter'>
      <SolutionHeader img={solutionDivSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-filter-content">
        <SolutionToggleHeader>
          <div id="solution-control" className="solution-control">
            请选择缴费方式：
            <div className="solution-control-list">
              <div className="solution-control-item">
                <input id="alipay" type="checkbox" value="支付宝" name="pay" /> <label htmlFor="alipay">支付宝</label>
              </div>
              <div className="solution-control-item">
                <input id="wechat" type="checkbox" value="微信" name="pay" /> <label htmlFor="wechat">微信</label>
              </div>
              <div className="solution-control-item">
                <input id="card" type="checkbox" value="银行卡" name="pay" /> <label htmlFor="card">银行卡</label>
              </div>
              <div className="solution-control-item">
                <input id="cash" type="checkbox" value="现金" name="pay" /> <label htmlFor="cash">现金</label>
              </div>
              <div className="solution-control-item">
                <input id="other" type="checkbox" value="其他" name="pay" /> <label htmlFor="other">其他</label>
              </div>
            </div>
          </div>
        </SolutionToggleHeader>
        <div id="solution-content" className="solution-content">
          <div id="page-1" className="layout1"></div>
        </div>
        <ShowCodeBottom codeText={codeText} title='仪表板过滤' />
      </div>
    </div>
  )
}
