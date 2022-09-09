// scenes

const baseUrl = "http://wynwx.grapecity.com.cn/wyn";
const token = "97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA";

const sceneCharts = {
	left: [{
		name: "公司资金计划",
		url: "https://wynwx.grapecity.com.cn/wyn/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA&scenario=column&size=fittoscreen",
	}, {
		name: "超收超付率",
		url: "https://wynwx.grapecity.com.cn/wyn/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA&scenario=column-1&size=fittoscreen",
	}, {
		name: "公司费用管理",
		url: "https://wynwx.grapecity.com.cn/wyn/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA&scenario=combined&size=fittoscreen",
	}, ],
	right: [{
		name: "公司销售利润",
		url: "https://wynwx.grapecity.com.cn/wyn/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA&scenario=area&size=fittoscreen",
	}, {
		name: "业绩同比增长",
		url: "https://wynwx.grapecity.com.cn/wyn/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA&scenario=radialStackedBar&size=fittoscreen",
	}, ],
};

const sceneViews = {
	PC: "http://wynwx.grapecity.com.cn/wyn/dashboards/view/0bead052-d56a-4fac-897b-a2984c0208e3?theme=blue&token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA",
	Mobile: "http://wynwx.grapecity.com.cn/wyn/dashboards/view/0bead052-d56a-4fac-897b-a2984c0208e3?theme=blue&token=97A4D8D68499E6B1AEBFCFEF503D10B62DB23FEE10183E20B8EFF009ED0404BA",
};

// solutions
// iframe
const solutionIframeDashboard = `${baseUrl}/dashboards/view/f3dd8756-908c-4158-8153-2bbb3eb51ab7?lite=false&theme=red&token=${token}`;

const solutionDivInitDesigner = {
	lng: 'zh',
	baseUrl: baseUrl,
	token: token,
	datasetId: "660488d8-8d86-4cb5-94f7-f49fa88f5946",
};

const solutionDivDrillDesigner = {

	lng: 'zh',
	baseUrl: baseUrl,
	token: token,
	dashboardId: "b95eaa5a-e759-4e50-af4e-a078cc0984cf",
};

const scenesDesigner = {

	lng: 'zh',
	baseUrl: baseUrl,
	token: token,
	dashboardId: "0bee2d94-4a95-4fb0-8cca-8d37e296c511",
};

//expansion
const languageDashboard = `${baseUrl}/dashboards/view/0bee2d94-4a95-4fb0-8cca-8d37e296c511?theme=playground&token=${token}`;