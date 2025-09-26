import { FC } from 'react'
import { SolutionHeader, ShowCodeBottom, SolutionToggleHeader } from '../../../components/solution';
import solutionDivSvg from '../../../common/images/sidebar/div.svg';

import './SolutionDynamic.scss';

const reportTemplateDom = {
  "Name": "Report",
  "Width": "20.901cm",
  "DocumentMap": {
    "Source": "All"
  },
  "Layers": [
    {
      "Name": "default"
    }
  ],
  "ThemeUri": "server:///6cbfce1f-40ee-4b80-b01d-691e417ab0f5",
  "CustomProperties": [
    {
      "Name": "DisplayType",
      "Value": "Galley"
    },
    {
      "Name": "SizeType",
      "Value": "Default"
    },
    {
      "Name": "PaperOrientation",
      "Value": "Portrait"
    },
    {
      "Name": "LayoutOrder",
      "Value": "ZOrder"
    }
  ],
  "Page": {
    "PageWidth": "21cm",
    "PageHeight": "29.7cm",
    "RightMargin": "0in",
    "LeftMargin": "0in",
    "TopMargin": "0in",
    "BottomMargin": "0in",
    "Columns": 1,
    "ColumnSpacing": "0cm"
  },
  "Body": {
    "Height": "5.326cm",
    "ReportItems": [

    ]
  }
};

const subReportElement = {
  "Type": "subreport",
  "Name": "子报表1",
  "ReportName": "server:///d28db0c9-06a6-4843-a3ca-6f77d0886a4e",
  "Style": {
    "Border": {
      "Color": "DimGray",
      "Style": "Solid"
    },
    "FontFamily": "微软雅黑"
  },
  "Left": "0cm",
  "Top": "0cm",
  "Width": "20.901cm",
  "Height": "2cm"
};

export const SolutionDynamic: FC = () => {
  const title = 'DIV嵌入-动态报表';
  const description = '用户可以动态选择想要分析和展现的图表，快速生成最终的分析报告。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/embedded-integration/div-integration/dashboard';
  const codeText = `<iframe\n\
  id="solution-dynamic-iframe"\n\
  className="solution-iframe"\n\
  onload="onIframeLoaded()"\n\
  style="width:100%;height:100%"\n\
  src="{baseUrl}/reports/view/{reportId}?theme=default&lng=zh&token={token}&toolbar=hide"\n\
></iframe>\n\
<script>\n\
    const reportTemplateDom = {\n\
        "Name": "Report",\n\
        "Width": "20.901cm",\n\
        "DocumentMap": {\n\
            "Source": "All"\n\
        },\n\
        "Layers": [\n\
            {\n\
                "Name": "default"\n\
            }\n\
        ],\n\
        "ThemeUri": "server:///6cbfce1f-40ee-4b80-b01d-691e417ab0f5",\n\
        "CustomProperties": [\n\
            {\n\
                "Name": "DisplayType",\n\
                "Value": "Galley"\n\
            },\n\
            {\n\
                "Name": "SizeType",\n\
                "Value": "Default"\n\
            },\n\
            {\n\
                "Name": "PaperOrientation",\n\
                "Value": "Portrait"\n\
            },\n\
            {\n\
                "Name": "LayoutOrder",\n\
                "Value": "ZOrder"\n\
            }\n\
        ],\n\
        "Page": {\n\
            "PageWidth": "21cm",\n\
            "PageHeight": "29.7cm",\n\
            "RightMargin": "0in",\n\
            "LeftMargin": "0in",\n\
            "TopMargin": "0in",\n\
            "BottomMargin": "0in",\n\
            "Columns": 1,\n\
            "ColumnSpacing": "0cm"\n\
        },\n\
        "Body": {\n\
            "Height": "5.326cm",\n\
            "ReportItems": [\n\
\n\
            ]\n\
        }\n\
    };\n\
\n\
    const subReportElement = {\n\
        "Type": "subreport",\n\
        "Name": "子报表1",\n\
        "ReportName": "server:///0ddb33e9-3211-4d96-9d25-ca34458dd8b9",\n\
        "Style": {\n\
            "Border": {\n\
                "Color": "DimGray",\n\
                "Style": "Solid"\n\
            },\n\
            "FontFamily": "微软雅黑"\n\
        },\n\
        "Left": "0cm",\n\
        "Top": "0cm",\n\
        "Width": "20.901cm",\n\
        "Height": "2cm"\n\
    };\n\
\n\
    let pageLoading = false;\n\
    let testTimer;\n\
\n\
    const reloadPage = (id) => {\n\
        console.log(id);\n\
        updateReport();\n\
    }\n\
    const onIframeLoaded = () => {\n\
        pageLoading = false;\n\
    }\n\
    const updateReport = () => {\n\
        const checkedDoms = document.getElementsByClassName("solution-control-checkbox");\n\
        const result = JSON.parse(JSON.stringify(reportTemplateDom));\n\
        let top = 0;\n\
        htmlFor (let index = 0; index < checkedDoms.length; index++) {\n\
            const element = checkedDoms[index];\n\
            if (!element.checked) continue;\n\
\n\
            if (element.getAttribute("embedType") != "dashboard") {\n\
\n\
                //复制模板，然后拼接\n\
                const subReport = JSON.parse(JSON.stringify(subReportElement));\n\
                subReport.Name = element.value;\n\
                subReport.ReportName = "server:///" + element.value;\n\
                subReport.Top = top + "cm";\n\
                top += 2;\n\
                result.Body.ReportItems.push(subReport);\n\
            }\n\
        }\n\
\n\
        fetch("{baseUrl}/api/reporting/design/reports/{reportId}?comment=&token={token}", {\n\
            method: "PUT",\n\
            headers: {\n\
              "Content-Type": "application/json"\n\
            },\n\
            body: JSON.stringify(result)\n\
        });\n\
\n\
        if (!pageLoading) {\n\
            pageLoading = true;\n\
            testTimer = setTimeout(loadIframe, 1500);\n\
        }\n\
        else {\n\
            clearInterval(testTimer);\n\
            testTimer = setTimeout(loadIframe, 1500);\n\
        }\n\
    }\n\
    const loadIframe = () => {\n\
        const iframe = document.getElementById("solution-dynamic-iframe");\n\
        console.log("loading" + Date.now() + " pageloading" + pageLoading);\n\
        //refreshPage\n\
        iframe.src = iframe.src;\n\
    }\n\
<script />`;
  let pageLoading = false;
  let testTimer: any = undefined;

  const onIframeLoaded = () => {
    pageLoading = false;
  }

  const updateReport = () => {

    const checkedDoms = document.getElementsByClassName("solution-control-checkbox");
    const result = JSON.parse(JSON.stringify(reportTemplateDom));
    let top = 0;
    for (let index = 0; index < checkedDoms.length; index++) {
      const element: any = checkedDoms[index];
      if (!element.checked) continue;

      if (element.getAttribute("embedType") !== "dashboard") {

        //复制模板，然后拼接
        const subReport = JSON.parse(JSON.stringify(subReportElement));
        subReport.Name = element.value;
        subReport.ReportName = "server:///" + element.value;
        subReport.Top = top + "cm";
        top += 2;
        result.Body.ReportItems.push(subReport);
      }
    }

    fetch(`${WYN.WYN_HOST}/api/reporting/design/reports/b979d86b-f149-4edd-afb5-f4255614c6cb?comment=&token=${WYN.WYN_TOKEN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    });

    if (!pageLoading) {
      pageLoading = true;
      testTimer = setTimeout(loadIframe, 1500);
    }
    else {
      clearInterval(testTimer);
      testTimer = setTimeout(loadIframe, 1500);
    }
  }
  const loadIframe = () => {
    const iframe: any = document.getElementById('solution-dynamic-iframe');
    console.log("loading" + Date.now() + " pageloading" + pageLoading);
    //refresh page
    iframe.src = iframe.src;
  }

  return (
    <div className='solution-dynamic'>
      <SolutionHeader img={solutionDivSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="dynamic-report-content">
        <SolutionToggleHeader>
          <div id="solution-control" className="solution-control">
            请选择图表
            <div className="solution-control-list">
              <div className="solution-control-item">
                <input type="checkbox" id="chart1" name="chart1" value="d28db0c9-06a6-4843-a3ca-6f77d0886a4e"
                  className="solution-control-checkbox" onChange={updateReport} />
                <label htmlFor="chkChart1">大区营业额和利润</label><br />
              </div>
              <div className="solution-control-item">
                <input type="checkbox" id="chart2" name="chart2" value="9c6308af-1d4e-4481-a9b5-10fd2785c92f"
                  className="solution-control-checkbox" onChange={updateReport} />
                <label htmlFor="chkChart2">大区销售占比</label><br />
              </div>
              <div className="solution-control-item">
                <input type="checkbox" id="chart3" name="chart3" value="6c2d1f77-c991-43a7-9077-5e61b28edf1d"
                  className="solution-control-checkbox" onChange={updateReport} />
                <label htmlFor="chkChart3">大区销量数据统计表</label><br />
              </div>
            </div>
          </div>
        </SolutionToggleHeader>
        <iframe
          title='solution-dynamic-iframe'
          id="solution-dynamic-iframe"
          className="solution-iframe iframe-no-border"
          onLoad={onIframeLoaded}
          style={{ width: '100%', height: '100%' }}
          src={`${WYN.WYN_INTERFACE_HOST}/reports/view/b979d86b-f149-4edd-afb5-f4255614c6cb?token=${WYN.WYN_INTERFACE_TOKEN}&toolbar=hide`}
        ></iframe>
        <ShowCodeBottom codeText={codeText} title='动态报表' />
      </div>
    </div>
  )
}
