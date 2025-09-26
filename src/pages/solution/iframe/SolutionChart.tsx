import { FC, useEffect, useRef, useState } from 'react'
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader, } from '../../../components/solution';
import { PluginTypes, dependentPackageLoad, sceneCharts, solutionDivChart1, solutionDivChart2 } from '../../../common/utils/utils';
import solutionChartSvg from '../../../common/images/sidebar/iframe.svg';
import 人力资源60_svg from '../../../common/images/scene/chart/人力资源60.svg';
import 内部流程60_svg from '../../../common/images/scene/chart/内部流程60.svg';
import 常用工具16_svg from '../../../common/images/scene/chart/常用工具16.svg';
import 新闻公告16_svg from '../../../common/images/scene/chart/新闻公告16.svg';
import 日程管理60_svg from '../../../common/images/scene/chart/日程管理60.svg';
import 流程中心16_svg from '../../../common/images/scene/chart/流程中心16.svg';
import 组织学习60_svg from '../../../common/images/scene/chart/组织学习60.svg';
import 财务系统60_svg from '../../../common/images/scene/chart/财务系统60.svg';
import 销售系统60_svg from '../../../common/images/scene/chart/销售系统60.svg';

import './SolutionChart.scss';

export const SolutionChart: FC = () => {
  const title = 'DIV嵌入-图表';
  const description = '用户可以在其 Web 应用程序的 iFrame 中指定图表对应的URL来实现嵌入图表，同时嵌入的图表可与其他图表联动分析，嵌入结果如下。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/single-component';
  const codeText = `<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.default.css"> \
\n<link rel="stylesheet" href="../../../styles/dashboard/lite/dashboard.viewerLite.vendor.css"> \
\n<script src="../../../js/dashboard/polyfills.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.common.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.sheet.js"></script> \
\n<script src="../../../js/dashboard/dashboard.libs.chart.js"></script> \
\n<script src="../../../js/dashboard/lite/dashboard.viewerLite.js"></script> \
\n<div id="root"> \
\n</div> \
\n<script> \
\n	const ins = WynBi.createViewerLite({ \
\n	  lng: 'zh', \
\n	  baseUrl: WYN.WYN_INTERFACE_HOST, \
\n	  token: WYN.WYN_INTERFACE_TOKEN, \
\n	  dashboardId: "51fea2f5-3607-4c66-83ca-cd621c572811", \
\n	  scenario: "column" \
\n	}); \
\n	ins.initialize({ \
\n		container: document.querySelector("#root"), \
\n	}).then((uiDashboard) => { \
\n	  uiDashboard.connect(document.querySelector("#root")); \
\n	}); \
\n<script />`;
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);
  const chart1Ins = useRef<any>();
  const chart2Ins = useRef<any>();
  const [leftValue, setLeftValue] = useState<string>(sceneCharts.left[0].scenario);
  const [rightValue, setRightValue] = useState<string>(sceneCharts.right[0].scenario);
  useEffect(() => {
    chart1Ins.current?.destroy();
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      if (chart1Ref && chart1Ref.current) {
        chart1Ins.current = WynBi.createViewerLite({
          ...solutionDivChart1,
          scenario: leftValue
        });
        chart1Ins.current.initialize({
          container: chart1Ref.current,
        }).then((uiDashboard: any) => {
          if (!chart1Ref?.current) {
            return
          }
          uiDashboard.connect(chart1Ref.current);
          uiDashboard.refresh();
        })
      }
    });
  }, [leftValue]);
  useEffect(() => {
    chart2Ins.current?.destroy();
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      if (chart2Ref && chart2Ref.current) {
        chart2Ins.current = WynBi.createViewerLite({
          ...solutionDivChart2,
          scenario: rightValue
        });
        chart2Ins.current.initialize({
          container: chart2Ref.current,
        }).then((uiDashboard: any) => {
          if (!chart2Ref?.current) {
            return
          }
          uiDashboard.connect(chart2Ref.current);
          uiDashboard.refresh();
        })
      }
    });
  }, [rightValue]);

  const onLeftChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLeftValue(e.target.value);
  }
  const onRightChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setRightValue(e.target.value);
  }
  return (
    <div className='solution-chart'>
      <SolutionHeader img={solutionChartSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-content">
        <SolutionToggleHeader>
          <div className='solution-chart-toggle-header'>
            <div className="solution-control solution-chart-control-panel">
              <span>点击切换图表：</span>
              <div className="solution-control-list solution-chart-control-list">
                <div id="solution-control-list-left" className="solution-control-list-left solution-control-item">
                  <div className="control-item-title">（左侧图表）</div>
                  <select name="" id="" className='solution-control-dropdown' onChange={onLeftChange}>
                    {sceneCharts.left.map(item=><option value={item.scenario} key={item.scenario}>{item.name}</option>)}
                  </select>
                </div>
                <div id="solution-control-list-right" className="solution-control-list-right solution-control-item">
                  <div className="control-item-title">（右侧图表）</div>
                  <select name="" id="" className='solution-control-dropdown' onChange={onRightChange}>
                    {sceneCharts.right.map(item=><option value={item.scenario} key={item.scenario}>{item.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </SolutionToggleHeader>
        <div className="solution-chart-content">
          <div className="solution-chart-row">
            <div className="solution-chart virtual-chart1">
              <div className="solution-chart-header">
                <img src={流程中心16_svg} alt='' />
                流程中心
              </div>
              <div className="solution-chart-content">
                <div className="chart-tab">
                  <div className="chart-tab-item selected">待办</div>
                  <div className="chart-tab-item">已办</div>
                </div>
                <div className="chart">
                  <div className="chart-row">滨江地块改造物资设备采购合同</div>
                  <div className="chart-row">集团内部签报-XXX-2022-06-21</div>
                  <div className="chart-row">滨江地块投资改造项目资产入库申请</div>
                  <div className="chart-row">信息中心改造工程设备入库申请</div>
                  <div className="chart-row">世博大厦小修项目设备入库申请</div>
                  <div className="chart-row">新办公大楼资产入库申请</div>
                  <div className="chart-row">会议通知：资本运作融资专题会议 时间:2020-07-01 10:00(GMT+08:00) 地点:108 (前台后面大会议室)</div>
                  <div className="chart-row">会议通知：资产板块信息化规划专题会议 时间:2020-07-15 09:00(GMT+08:00) 地点:317 (中庭后侧)</div>
                </div>
              </div>
            </div>
            <div className="solution-chart reality-chart-div reality-chart-div1">
              {/* <iframe id="solution-chart2" className=" solution-iframe reality-chart" title='solution-chart2'></iframe> */}
              <div id="solution-chart2" ref={chart2Ref} className="solution-iframe reality-chart" />
            </div>
          </div>
          <div className="solution-chart-row">
            <div className="solution-chart virtual-chart2">
              <div className="solution-chart-header">
                <img src={新闻公告16_svg} alt='' />
                新闻公告
              </div>
              <div className="solution-chart-content">
                <div className="chart-row">XXXX召开2022年度股东周年大会</div>
                <div className="chart-row">XXXX生活召开2022年度股东周年大会</div>
                <div className="chart-row">福布斯发布2022全球企业2000强，XXXX位列第216位</div>
                <div className="chart-row">XXXX召开2021年度总结表彰会</div>
                <div className="chart-row">XXXX表彰2021年度优秀员工</div>
                <div className="chart-row">XXXX发布2021年全年业绩 实现净利润324亿元</div>
              </div>
            </div>
            <div className="solution-chart reality-chart-div reality-chart-div2">
              {/* <iframe id="solution-chart1" className=" solution-iframe reality-chart" title='solution-chart1'></iframe> */}
              <div id="solution-chart1" className=" solution-iframe reality-chart" ref={chart1Ref}/>
            </div>
            <div className="solution-chart virtual-chart3">
              <div className="solution-chart-header">
                <img src={常用工具16_svg} alt='' />
                常用工具
              </div>
              <div className="solution-chart-content">
                <div className="icon-button">
                  <img src={组织学习60_svg} alt='' />
                  <div className="text">组织学习</div>
                </div>
                <div className="icon-button">
                  <img src={日程管理60_svg} alt='' />
                  <div className="text">日程管理</div>
                </div>
                <div className="icon-button">
                  <img src={人力资源60_svg} alt='' />
                  <div className="text">人力资源</div>
                </div>
                <div className="icon-button">
                  <img src={财务系统60_svg} alt='' />
                  <div className="text">财务系统</div>
                </div>
                <div className="icon-button">
                  <img src={销售系统60_svg} alt='' />
                  <div className="text">销售系统</div>
                </div>
                <div className="icon-button">
                  <img src={内部流程60_svg} alt='' />
                  <div className="text">内部流程</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShowCodeBottom codeText={codeText} title='图表' />
      </div>
    </div>
  )
}
