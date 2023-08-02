import { FC, useEffect, useState } from 'react'
import { solutionDivDrillDesigner, dependentPackageLoad, PluginTypes } from '../../../common/utils/utils';
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader } from '../../../components/solution';
import { useSelectedKeys } from '../../index';
import solutionDivSvg from '../../../common/images/sidebar/div.svg';

import './SolutionDrill.scss';

export const SolutionDrill: FC = () => {
  const title = 'DIV集成-仪表板钻取';
  const description = '用户可以使用DIV的原生方式，将仪表板的DIV元素写入业务系统的网页代码中，实现在业务系统中嵌入仪表板，同时通过外部切换钻取路径实现动态查看仪表板内容。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/dashboard';
  const codeText = `<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.default.css"> \
\n<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.vendor.css"> \
\n<script src="../../../js/dashboard/polyfills.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.common.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.sheet.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.chart.js"></script> \
\n<script src="../../../js/dashboard/lite/dashboard.viewerLite.js"></script> \
\n<select id="area" class="solution-control-dropdown"> \
\n	<option value="客户地区">客户地区</option> \
\n	<option value="客户省份">客户省份</option> \
\n	<option value="客户城市">客户城市</option> \
\n</select> \
\n<button class="solution-control-button" id="drillUp1">向上钻取</button> \
\n<button class="solution-control-button" id="drillDown1">向下钻取</button> \
\n<button class="solution-control-button" id="drillReset1">重置钻取</button> \
\n<div id="root"> \
\n	<div id="page-1"></div> \
\n</div> \
\n<script> \
\n	const map = { \
\n		"客户地区": "", \
\n		"客户省份": "", \
\n		"客户城市": "", \
\n	}; \
\n	const ins = WynBi.createViewerLite(solutionDivDrillDesigner); \
\n	ins.initialize({ \
\n		container: document.querySelector("#root"), \
\n	}).then((uiDashboard) => { \
\n		const pageDom = document.querySelector("#page-1"); \
\n		const firstPage = uiDashboard.pages[0]; // UIPage \
\n		firstPage.scenarios.forEach((scenario, i) => { \
\n			const dom = document.createElement("div"); \
\n			dom.className = "scenario-dom"; \
\n			pageDom.appendChild(dom); \
\n			scenario.connect(dom); \
\n		}) \
\n		firstPage.on("mounted", () => { \
\n			isInit = true; \
\n		}); \
\n		firstPage.on("rendered", () => { \
\n			if (!isInit) { \
\n				return; \
\n			} \
\n			isInit = false; \
\n			ins.getDatasets().then((datasets) => { \
\n				const scenarioNameMapDataset = new Map(); \
\n				datasets.forEach(d => { \
\n					const { bindingScenarios } = d; \
\n					bindingScenarios.forEach(name => { \
\n						scenarioNameMapDataset.set(name, d); \
\n					}); \
\n				}); \
\n \
\n				scenarioNameMapDataset.forEach((dataset, scenarioName) => { \
\n					const dimensionList = dataset.entities.flatMap(({ columns }) => columns); \
\n					dimensionList.forEach(({ name, display }) => { \
\n						if (map[display] === "") { \
\n							map[display] = name; \
\n						} \
\n					}) \
\n				}); \
\n			}); \
\n		}); \
\n		firstPage.refresh(); \
\n	}); \
\n	const reset1 = () => { \
\n		ins.executeCommand({ name: "ResetDrill", payload: { target: "区域钻取" } }); \
\n	} \
\n	const drillUp1 = () => { \
\n		const area = document.getElementById("area").value; \
\n		ins.executeCommand({ name: "DrillUp", payload: { target: "区域钻取", drillDimension: map[area] } }); \
\n	} \
\n	const drillDown1 = () => { \
\n		const area = document.getElementById("area").value; \
\n		ins.executeCommand({ name: "DrillDown", payload: { target: "区域钻取", drillDimension: map[area] } }); \
\n	} \
\n	const drillReset1 = () => { \
\n		ins.executeCommand({ name: "ResetDrill", payload: { target: "区域钻取" } }); \
\n	} \
\n	document.getElementById("area").addEventListener("change", reset1); \
\n	document.getElementById("drillUp1").addEventListener("click", drillUp1); \
\n	document.getElementById("drillDown1").addEventListener("click", drillDown1); \
\n	document.getElementById("drillReset1").addEventListener("click", drillReset1); \
\n<script />`;

  const map: any = {
    "客户地区": "",
    "客户省份": "",
    "客户城市": "",
    "实际日期(年)": "",
    "实际日期(季度)": "",
    "实际日期(月)": "",
  };
  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  const createInstance = () => {
    const ins = WynBi.createViewerLite(solutionDivDrillDesigner);
    ins.initialize({
      container: document.querySelector('#root'),
    }).then((uiDashboard: any) => {
      const pageDom: any = document.querySelector('#page-1');
      const firstPage = uiDashboard.pages[0]; // UIPage
      firstPage.scenarios.forEach((scenario: any, i: number) => {
        const dom = document.createElement('div');
        dom.className = 'scenario-dom';
        pageDom.appendChild(dom);
        scenario.connect(dom);
      })
      let isInit = false;
      firstPage.on('mounted', () => {
        isInit = true;
      });
      firstPage.on('rendered', () => {
        if (!isInit) {
          return;
        }
        isInit = false;
        ins.getDatasets().then((datasets: any) => {
          const scenarioNameMapDataset = new Map();
          datasets.forEach((d: any) => {
            const { bindingScenarios } = d;
            bindingScenarios.forEach((name: any) => {
              scenarioNameMapDataset.set(name, d);
            });
          });

          scenarioNameMapDataset.forEach((dataset, scenarioName) => {
            const dimensionList = dataset.entities.flatMap(({ columns }: any) => columns);
            dimensionList.forEach(({ name, display }: any) => {
              if (map[display] === "") {
                map[display] = name;
              }
            })
          });
        });
      });
      firstPage.refresh();
    });

    const reset1 = () => {
      ins.executeCommand({ name: 'ResetDrill', payload: { target: "区域钻取" } });
    }
    const reset2 = () => {
      ins.executeCommand({ name: 'ResetDrill', payload: { target: "时间钻取" } });
    }


    const drillUp1 = () => {
      const area = (document.getElementById("area") as any).value;
      ins.executeCommand({ name: 'DrillUp', payload: { target: "区域钻取", drillDimension: map[area] } });
    }
    const drillDown1 = () => {
      const area = (document.getElementById("area") as any).value;
      ins.executeCommand({ name: 'DrillDown', payload: { target: "区域钻取", drillDimension: map[area] } });
    }
    const drillReset1 = () => {
      ins.executeCommand({ name: 'ResetDrill', payload: { target: "区域钻取" } });
    }


    const drillUp2 = () => {
      const time = (document.getElementById("time") as any).value;
      ins.executeCommand({ name: 'DrillUp', payload: { target: "时间钻取", drillDimension: map[time] } });
    }
    const drillDown2 = () => {
      const time = (document.getElementById("time") as any).value;
      ins.executeCommand({ name: 'DrillDown', payload: { target: "时间钻取", drillDimension: map[time] } });
    }
    const drillReset2 = () => {
      ins.executeCommand({ name: 'ResetDrill', payload: { target: "时间钻取" } });
    }

    (document.getElementById("area") as any).addEventListener("change", reset1);
    (document.getElementById("time") as any).addEventListener("change", reset2);

    (document.getElementById("drillUp1") as any).addEventListener("click", drillUp1);
    (document.getElementById("drillDown1") as any).addEventListener("click", drillDown1);
    (document.getElementById("drillReset1") as any).addEventListener("click", drillReset1);

    (document.getElementById("drillUp2") as any).addEventListener("click", drillUp2);
    (document.getElementById("drillDown2") as any).addEventListener("click", drillDown2);
    (document.getElementById("drillReset2") as any).addEventListener("click", drillReset2);
  }

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '仪表板钻取') {
      return;
    }
    createInstance();
  }, [isPackageLoaded, selectedKeys])
  return (
    <div className='solution-drill'>
      <SolutionHeader img={solutionDivSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-drill-content">
        <SolutionToggleHeader>
          <div id="solution-control" className="solution-drill-control">
            请点击钻取:
            <div className="solution-control-list">
              <div className="solution-control-item">
                <select id="area" className="solution-control-dropdown">
                  <option value="客户地区">客户地区</option>
                  <option value="客户省份">客户省份</option>
                  <option value="客户城市">客户城市</option>
                </select>
                <button className="solution-control-button" id="drillUp1">向上钻取</button>
                <button className="solution-control-button" id="drillDown1">向下钻取</button>
                <button className="solution-control-button" id="drillReset1">重置钻取</button>
              </div>
              <div className="solution-control-item">
                <select id="time" className="solution-control-dropdown">
                  <option value="实际日期(年)">实际日期(年)</option>
                  <option value="实际日期(季度)">实际日期(季度)</option>
                  <option value="实际日期(月)">实际日期(月)</option>
                </select>
                <button className="solution-control-button" id="drillUp2">向上钻取</button>
                <button className="solution-control-button" id="drillDown2">向下钻取</button>
                <button className="solution-control-button" id="drillReset2">重置钻取</button>
              </div>
            </div>
          </div>
        </SolutionToggleHeader>
        <div className="drill-content-dashboard">
          <div id="drill-root">
            <div id="page-1"></div>
          </div>
        </div>
        <ShowCodeBottom codeText={codeText} title='仪表板钻取' />
      </div>
    </div>
  )
}
