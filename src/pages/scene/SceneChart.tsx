import { FC, useEffect } from 'react'
import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';
import { sceneCharts } from '../../common/utils/utils';

import 人力资源60_svg from '../../common/images/scene/chart/人力资源60.svg';
import 内部流程60_svg from '../../common/images/scene/chart/内部流程60.svg';
import 常用工具16_svg from '../../common/images/scene/chart/常用工具16.svg';
import 新闻公告16_svg from '../../common/images/scene/chart/新闻公告16.svg';
import 日程管理60_svg from '../../common/images/scene/chart/日程管理60.svg';
import 流程中心16_svg from '../../common/images/scene/chart/流程中心16.svg';
import 组织学习60_svg from '../../common/images/scene/chart/组织学习60.svg';
import 财务系统60_svg from '../../common/images/scene/chart/财务系统60.svg';
import 销售系统60_svg from '../../common/images/scene/chart/销售系统60.svg';

import './SceneChart.scss';

export const SceneChart: FC = () => {
  useEffect(() => {
    const chartList1: any = document.getElementById("reality-chart1-header");
    const iframe1: any = document.getElementById("reality-chart1");
    let chart1Selected = sceneCharts.left.length > 0 ? 0 : -1;
    sceneCharts.left.forEach((chart, index) => {
      const button = document.createElement("input");
      button.type = "button";
      button.className = `reality-chart1-header-button${chart1Selected === index ? " selected" : ""}`;
      button.value = chart.name;
      button.title = chart.name;
      button.onclick = (e) => {
        if (chart1Selected === index) return;
        chart1Selected = index;
        const elements = document.getElementsByClassName("reality-chart1-header-button");
        for (let i = 0; i < elements.length; i++) {
          if (index === i) {
            elements[i].classList.add("selected");
          } else {
            elements[i].classList.remove("selected")
          }
        }
        iframe1.src = chart.url;
      }
      chartList1.appendChild(button);
    });
    const chart1: any = document.getElementById("reality-chart1");
    if (chart1Selected > -1) {
      chart1.src = sceneCharts.left[chart1Selected].url;
    }

    const chartList2: any = document.getElementById("reality-chart2-header");
    const iframe2: any = document.getElementById("reality-chart2");
    let chart2Selected = sceneCharts.right.length > 0 ? 0 : -1;
    sceneCharts.right.forEach((chart, index) => {
      const button = document.createElement("input");
      button.type = "button";
      button.className = `reality-chart2-header-button${chart2Selected === index ? " selected" : ""}`;
      button.value = chart.name;
      button.title = chart.name;
      button.onclick = (e) => {
        if (chart2Selected === index) return;
        chart2Selected = index;
        const elements = document.getElementsByClassName("reality-chart2-header-button");
        for (let i = 0; i < elements.length; i++) {
          if (index === i) {
            elements[i].classList.add("selected");
          } else {
            elements[i].classList.remove("selected")
          }
        }
        iframe2.src = chart.url;
      }
      chartList2.appendChild(button);
    });
    const chart2: any = document.getElementById("reality-chart2");
    if (chart2Selected > -1) {
      chart2.src = sceneCharts.right[chart2Selected].url;
    }
  });

  return (
    <div className="scene-content">
      <SceneHeader></SceneHeader>
      <div className="scene-chart-row">
        <div className="scene-chart virtual-chart1">
          <div className="scene-chart-header">
            <img src={流程中心16_svg} alt='' />
            流程中心
          </div>
          <div className="scene-chart-content">
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
        <div className="scene-chart reality-chart-div reality-chart-div1">
          <div id="reality-chart2-header" className="reality-chart-header">
          </div>
          <iframe id="reality-chart2" className="reality-chart" title='reality-chart2'></iframe>
        </div>
      </div>
      <div className="scene-chart-row">
        <div className="scene-chart virtual-chart2">
          <div className="scene-chart-header">
            <img src={新闻公告16_svg} alt='' />
            新闻公告
          </div>
          <div className="scene-chart-content">
            <div className="chart-row">XXXX召开2022年度股东周年大会</div>
            <div className="chart-row">XXXX生活召开2022年度股东周年大会</div>
            <div className="chart-row">福布斯发布2022全球企业2000强，XXXX位列第216位</div>
            <div className="chart-row">XXXX召开2021年度总结表彰会</div>
            <div className="chart-row">XXXX表彰2021年度优秀员工</div>
            <div className="chart-row">XXXX发布2021年全年业绩 实现净利润324亿元</div>
          </div>
        </div>
        <div className="scene-chart reality-chart-div reality-chart-div2">
          <div id="reality-chart1-header" className="reality-chart-header">
          </div>
          <iframe id="reality-chart1" className="reality-chart" title='reality-chart1'></iframe>
        </div>
        <div className="scene-chart virtual-chart3">
          <div className="scene-chart-header">
            <img src={常用工具16_svg} alt='' />
            常用工具
          </div>
          <div className="scene-chart-content">
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
  )
}
