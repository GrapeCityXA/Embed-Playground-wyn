export const scenesDesigner = {
	lng: 'zh',
	baseUrl: WYN.WYN_INTERFACE_HOST,
	token: WYN.WYN_INTERFACE_TOKEN,
	dashboardId: "b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0",
};

export const solutionDivInitDesigner = {
	lng: 'zh',
	baseUrl: WYN.WYN_INTERFACE_HOST,
	token: WYN.WYN_INTERFACE_TOKEN,
	datasetId: "660488d8-8d86-4cb5-94f7-f49fa88f5946",
};

export const solutionDivDrillDesigner = {
	lng: 'zh',
	baseUrl: WYN.WYN_INTERFACE_HOST,
	token: WYN.WYN_INTERFACE_TOKEN,
	dashboardId: "b95eaa5a-e759-4e50-af4e-a078cc0984cf",
};

export const solutionDivChart1 = {
	lng: 'zh',
	baseUrl: WYN.WYN_INTERFACE_HOST,
	token: WYN.WYN_INTERFACE_TOKEN,
	dashboardId: "b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0",
	scenario: "column"
};

export const solutionDivChart2 = {
	lng: 'zh',
	baseUrl: WYN.WYN_INTERFACE_HOST,
	token: WYN.WYN_INTERFACE_TOKEN,
	dashboardId: "51fea2f5-3607-4c66-83ca-cd621c572811",
	scenario: "area"
};

export const sceneCharts = {
	left: [{
		scenario: "column",
		name: "公司资金计划",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=column&size=fittoscreen`,
	}, {
		scenario: "column-1",
		name: "超收超付率",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=column-1&size=fittoscreen`,
	}, {
		scenario: "combined",
		name: "公司费用管理",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=combined&size=fittoscreen`,
	},],
	right: [{
		scenario: "area",
		name: "公司销售利润",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=area&size=fittoscreen`,
	}, {
		scenario: "radialStackedBar",
		name: "业绩同比增长",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=radialStackedBar&size=fittoscreen`,
	},],
};

export const api: any = {
	getV2AllDocuments: {
		displayName: '获取所有文档',
		url: "api/v2/common/documents",
		method: 'POST',
		getBody: (type: string, orderby?: string) => {
			const body: any = {
				types: type,
			};
			if(orderby) {
				body.orderby = orderby
			}
			return body;
		}
	},
	getAllDocuments: {
		displayName: '获取所有文档',
		// rdl,rdlx,dbd
		getGraphqlStr: (type: string, orderby: string) => `query {
	documents(types:"${type}",orderby: "-${orderby}") {
		id,
		type,
		title,
		created,
		created_by {
			name, email
		},
		modified,
		modified_by {
			name,
			email
		},
		effective_ops,
		thumbnail,
	}
}`,
	},
	getDocumentsWithPagination: {
		displayName: '获取所有文档',
		// rdl,rdlx,dbd
		getGraphqlStr: (type: string, orderby: string, pageSize?: number, pageNumber?: number) => `query {
		documentsWithPagination(types:"${type}",orderby: "-${orderby}${(pageSize && pageNumber) ? `, pageSize: ${pageSize}, pageNumber: ${pageNumber}` : ''}") {
		pagination {
      pageSize
      pageNumber
      total
    }
		data {
			id,
			type,
			title,
			modified,
			modified_by {
				name,
				email
			},
		}
	}
}`,
	},
	renameDocument: {
		displayName: '重命名文档',
		getGraphqlStr: function (documentId: string, rename: string) {
			return `mutation{
						renameDocument(documentId:"${documentId}",newName:"${rename}"){
						renamed_id
					}
			}`;
		}
	},
	getOrganizations: {
		displayName: '获取所有组织',
		url: "admin/api/accountmanagement/api/v1/organizations",
		method: 'GET',
		params: 'includeProps=true',
	},

	createOrganizations: {
		displayName: '新增组织',
		url: "admin/api/accountmanagement/api/v1/organizations",
		method: 'POST',
		getBody: (name: string, parentTenantId: string, props: any) => {
			return {
				id: "",
				name,
				parentTenantId,
				props,
			};
		}
	},

	getAllUsers: {
		displayName: '获取所有用户',
		url: 'admin/api/accountmanagement/api/v1/users',
		params: 'Pageing=false',
		method: 'GET',
	},

	addUser: {
		displayName: '新增用户',
		url: 'admin/api/accountmanagement/api/v1/users',
		method: 'POST',
		getBody: (username: string, email: string, password: string, roles: any, tenantId: string) => {
			return {
				username,
				email,
				mobile: "",
				firstName: "",
				lastName: "",
				fullName: "",
				password,
				confirmPassword: password,
				roles,
				customizePropertyInfo: {},
				tenantId,
				enabled: true,
			}

		},
	},

	addDataSource: {
		displayName: '创建数据源',
		getGraphqlStr: function (name: string, provider: any, connectionString: string, extractInDatabase: any) {
			return `mutation {
						addDatasource(
							name: "${name}",
							provider: "${provider}",
							connectionString: "${connectionString}",
							useAdvancedConfig: true,
							extractInDatabase: ${extractInDatabase},
							mappingConfig: ""
						) {
							id,
							name,
							provider,
							connectionString,
						}
					}`;
		}
	},

	getDatasourceSchemas: {
		displayName: '获取数据源的Schemas',
		getGraphqlStr: (dataSourceId: string) => {
			return `query {
				datasourceSchemas(
				  ids: "${dataSourceId}"
				  loadMappingConfig: true
				) {
				  errors
				  models {
					id
					name
					provider
					mappingConfigs {
					  tableOriginalName
					  tableDisplayName
					  columns {
						columnOriginalName
						columnDisplayName
					  }
					}
					tables {
					  name
					  originName
					  tableSchema
					  columns {
						name
						dataType
						allowDBNull
					  }
					}
					views {
					  name
					  originName
					  tableSchema
					  columns {
						name
						dataType
						allowDBNull
					  }
					}
					parameters {
					  name
					  defaultvalue
					  datatype
					}
				  }
				}
			  }`;
		},
	},
	getFields: {
		displayName: '获取所有字段',
		url: "api/datasource/tableschema",
		getParams: (dataSourceId: string, schema: any, tableName: string, type: string) => {
			return `datasourceId=${dataSourceId}&schema=${schema}&tableName=${tableName}&type=${type}`;
		},
		method: 'GET',
	},

	createDataset: {
		displayName: '创建数据集',
		url: "api/datasetmanagement/adddataset",
		method: 'POST',
		getBody: (name: string, dataSource: any, firstTable: any, fields: any) => {
			return {
				query: {
					dataSources: [dataSource],
					parameters: [],
					commandModel: {
						firstTable,
					},
					commandType: "Sql",
				},
				fields,
				groupFields: [],
				customSqlTables: [],
				filterConditions: {
					conditionType: 0
				},
				indexed: false,
				incrementalUpdateSetting: null,
				name,
				comment: "",
				tagIds: []
			}
		}
	},
}

type PluginType = 'dashboard' | 'report';

export enum PluginTypes {
	Dashboard = 'dashboard',
	Report = 'report',
}

const dependentPackageObj = {
	dashboard: {
		css: [
			'/dashboard.vendor.css',
			'/dashboard.viewerLite.css',
			'/dashboard.viewerLite.vendor.css',
			'/dashboard.app.css',
		],
		js: [
			'/dashboard.libs.common.js',
			'/wyn.dashboard.common.js',
			'/dashboard.libs.sheet.js',
			'/dashboard.libs.chart.js',
			'/dashboard.libs.extension.js',
			'/dashboard.app.js',
			'/dashboard.viewerLite.js',
		],
	},
	report: {
		css: [
			'/viewer-app.chart.css',
			'/viewer-app.css',
			'/designer-app.css',
		],
		js: [
			'/viewer-app.js',
			'/viewer-app.chart.js',
			'/designer-app.js',
		],
	},
};

// 下述 CDN 地址仅用于 WYN playground 的 Demo 环境，部署时请勿引用。
// 部署时请在 env.js 中将 IS_DEPLOY_SITE 改为 true
const isDeploySite = WYN.IS_DEPLOY_SITE;

const isLoaded = {
	isDashboardLoaded: false,
	isReportLoaded: false,
};

const getBaseJsUrl = isDeploySite
	? () => `${WYN.WYN_HOST}/api/PluginAssets`
	: (pluginType?: PluginType, productVersion?: string) => `https://cdn.grapecity.com.cn/wyn/playground/assets/${productVersion}/${pluginType}`;;
const getBaseCssUrl = isDeploySite
	? () => `${WYN.WYN_HOST}/api/themefiles`
	: (pluginType?: PluginType, productVersion?: string) => `https://cdn.grapecity.com.cn/wyn/playground/assets/${productVersion}/${pluginType}`;



const loadCss = (pluginType: PluginType, version: string) => {
	const dependentCssList = dependentPackageObj[pluginType].css;
	const linkList = dependentCssList.map(dependentCss => new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.onload = () => {
			resolve(true);
		};
		link.rel = 'stylesheet';
		link.href = isDeploySite
			? `${getBaseCssUrl()}${dependentCss}?theme=default&version=${version}&plugin=${pluginType}s`
			: getBaseCssUrl(pluginType, version) + dependentCss;
		document.head.appendChild(link);
	}));
	return Promise.all(linkList);
};
function dynamicLoadScript(pluginType: PluginType, version: string, src: string) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = isDeploySite
			? `${getBaseJsUrl()}/${pluginType}s-${version}${src}`
			: getBaseJsUrl(pluginType, version) + src;

		script.onload = function () {
				resolve(src);
		};
		script.onerror = function () {
				reject(new Error('Failed to load ' + src));
		};
		document.head.appendChild(script);
	});
}

const loadJs = async (pluginType: PluginType, version: string) => {	
	const dependentJsList = dependentPackageObj[pluginType].js;
	let commonJS = "", otherRes = [];
	for(let i = 0; i < dependentJsList.length; i++) {
		if (dependentJsList[i].indexOf("dashboard.libs.common.js") > 0){
			commonJS = dependentJsList[i];
		}else{
			otherRes.push(dependentJsList[i]);
		}
	}
	if(commonJS) {
		await dynamicLoadScript(pluginType, version, commonJS)
	}
	return Promise.all(otherRes.map((url) => dynamicLoadScript(pluginType, version, url)));
	
	// const scriptList = dependentJsList.map(dependentJs => new Promise((resolve) => {
	// 	const script = document.createElement('script');
	// 	script.onload = () => {
	// 		resolve(true);
	// 	};
	// 	script.src = isDeploySite
	// 		? `${getBaseJsUrl()}/${pluginType}s-${version}${dependentJs}`
	// 		: getBaseJsUrl(pluginType, version) + dependentJs;
	// 	document.head.appendChild(script);
	// }));
	// return Promise.all(scriptList);
};

const getWynVersions = async () => {
	const configUrl = `${WYN.WYN_HOST}/admin/api/settings/versions`;
	return fetch(configUrl + `?token=${WYN.WYN_INTERFACE_TOKEN}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (res) {
			return {
				productVersion: res.productVersion.split('+')[0]+'.0',
				dashboardPluginVersion: res.pluginVersions['GCES Dashboards'].split('+')[0]+'.0',
				reportPluginVersion: res.pluginVersions['GCES Reporting'].split('+')[0]+'.0'
			};
		}).catch((res) => {
			console.error('Error: 依赖包错误，请检查当前依赖包版本是否有误.');
		});
};

export const dependentPackageLoad = async (pluginType: PluginType) => {
	if (pluginType === PluginTypes.Dashboard && isLoaded.isDashboardLoaded) {
		return Promise.resolve();
	};
	if (pluginType === PluginTypes.Report && isLoaded.isReportLoaded) {
		return Promise.resolve();
	};
	const versions = await getWynVersions();
	if (!versions) {
		return;
	}
	const { productVersion, dashboardPluginVersion, reportPluginVersion } = versions;
	const realVersion = isDeploySite ? (pluginType === PluginTypes.Dashboard ? dashboardPluginVersion : reportPluginVersion) : productVersion;
	const cssIsLoaded = loadCss(pluginType, realVersion);
	const jsIsLoaded = loadJs(pluginType, realVersion);
	return Promise.all([cssIsLoaded, jsIsLoaded]).then(() => {
		if (pluginType === PluginTypes.Dashboard) {
			isLoaded.isDashboardLoaded = true;
		}
		if (pluginType === PluginTypes.Report) {
			isLoaded.isReportLoaded = true;
		}
	});
};

export const changeCssLink = async (theme: string, type: PluginType = PluginTypes.Dashboard) => {
	const versions = await getWynVersions();
	if (!versions) {
		return;
	}
	const { productVersion, dashboardPluginVersion, reportPluginVersion } = versions;

	document.getElementById('theme-container')?.remove();
	if (type === PluginTypes.Dashboard) {
		const dashboardThemePackages = ['app', 'vendor'];
		for (const themePackage of dashboardThemePackages) {
			const themeLink = document.createElement('link');
			themeLink.href = isDeploySite
				? `${getBaseCssUrl()}/dashboard.${themePackage}.css?theme=${theme}&version=${dashboardPluginVersion}&plugin=dashboards`
				: `https://cdn.grapecity.com.cn/wyn/playground/assets/${productVersion}/dashboard/dashboard.${themePackage}.${theme}.css`;
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme-container-dashboard';
			document.head.appendChild(themeLink);
		}
		return;
	}
	const reportThemePackages = ['viewer-app', 'designer-app'];
	for (const themePackage of reportThemePackages) {
		const themeLink = document.createElement('link');
		themeLink.href = isDeploySite
			? `${getBaseCssUrl()}/${themePackage}.css?theme=${theme}&version=${reportPluginVersion}&plugin=${type}s`
			: `https://cdn.grapecity.com.cn/wyn/playground/assets/${productVersion}/report/${themePackage}.${theme}.css`;
		themeLink.rel = 'stylesheet';
		themeLink.id = 'theme-container-report';
		document.head.appendChild(themeLink);
	}
};

export const removeCssLink = (type: PluginType = PluginTypes.Dashboard) => {
	const customCssLinks = document.querySelectorAll(`#theme-container-${type}`);
	[].forEach.call(customCssLinks, cssLink => {
		document.head.removeChild(cssLink);
	});
}

export const cacheReportInfo = {
	reportId: 'c7db29de-39c1-49c1-b3a2-fc8cec623333',
	datasetName: 'Demo_销售明细_报表',
};
