import { FC, useEffect } from 'react'
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader, } from '../../../components/solution';
import { sceneCharts } from '../../../common/utils/utils';
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
  const title = 'iframe集成-图表';
  const description = '用户可以在其 Web 应用程序的 iFrame 中指定图表对应的URL来实现嵌入图表，同时嵌入的图表可与其他图表联动分析，嵌入结果如下。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/url-integration/single-component';
  const codeText = `<iframe src="{baseUrl}/dashboards/view/{dashboardId}?token=\${token}&scenario=line&size=fittoscreen&actions=clearselection%2Cfocus%2Cannotation%2Cexport%2Cfilter%2Cclearruntimefilter%2Csort%2Crank%2Cmodelparameters%2Cconvertvisual%2Coptions.property.conditionalformat%2Coptions.property.referenceline%2Coptions.property.trendlines%2Coptions.property.expand%2Cshowdata%2Canalysispath&openfulldashboardmode=newwindow"></iframe>`;

  useEffect(() => {

    const leftContainer: any = document.getElementById("solution-control-list-left");
    const rightContainer: any = document.getElementById("solution-control-list-right");
    const chart1: any = document.getElementById("solution-chart1");
    const chart2: any = document.getElementById("solution-chart2");

    let selectedLeft = 0;
    let selectedRight = 0;
    let srcLeft = sceneCharts.left[selectedLeft].url;
    let srcRight = sceneCharts.right[selectedRight].url;

    chart1.src = srcLeft;
    chart2.src = srcRight;

    const select = document.createElement("select");
    select.className = "solution-control-dropdown";
    sceneCharts.left.forEach((chart, index) => {
      const option = document.createElement("option");
      option.value = chart.url;
      option.text = chart.name;
      select.appendChild(option);
    });

    leftContainer.appendChild(select);

    select.addEventListener("change", (e: any) => {
      const current = e.target.selectedIndex;
      if (current === selectedLeft) return;
      selectedLeft = current;
      srcLeft = sceneCharts.left[selectedLeft].url;
      chart1.src = srcLeft;
    });

    const select2 = document.createElement("select");
    select2.className = "solution-control-dropdown";
    sceneCharts.right.forEach((chart, index) => {
      const option = document.createElement("option");
      option.value = chart.url;
      option.text = chart.name;
      select2.appendChild(option);
    });

    rightContainer.appendChild(select2);

    select2.addEventListener("change", (e: any) => {
      const current = e.target.selectedIndex;
      if (current === selectedRight) return;
      selectedRight = current;
      srcRight = sceneCharts.right[selectedRight].url;
      chart2.src = srcRight;
    });
  });

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
                </div>
                <div id="solution-control-list-right" className="solution-control-list-right solution-control-item">
                  <div className="control-item-title">（右侧图表）</div>
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
              <iframe id="solution-chart2" className=" solution-iframe reality-chart" title='solution-chart2'></iframe>
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
              <iframe id="solution-chart1" className=" solution-iframe reality-chart" title='solution-chart1'></iframe>
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
