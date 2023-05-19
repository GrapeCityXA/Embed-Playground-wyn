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

export const sceneCharts = {
	left: [{
		name: "公司资金计划",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=column&size=fittoscreen`,
	}, {
		name: "超收超付率",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=column-1&size=fittoscreen`,
	}, {
		name: "公司费用管理",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=combined&size=fittoscreen`,
	},],
	right: [{
		name: "公司销售利润",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=area&size=fittoscreen`,
	}, {
		name: "业绩同比增长",
		url: `${WYN.WYN_INTERFACE_HOST}/dashboards/view/51fea2f5-3607-4c66-83ca-cd621c572811?token=${WYN.WYN_INTERFACE_TOKEN}&scenario=radialStackedBar&size=fittoscreen`,
	},],
};

export const api: any = {
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
		effective_ops
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

export const changeCssLink = (theme: string) => {
	document.getElementById('theme-container')?.remove();
	const themeLink = document.createElement('link');
	// themeLink.href = `${WYN.WYN_HOME_PAGE.length ? `/${WYN.WYN_HOME_PAGE}` : ''}/assets/dashboard/dashboard.app.${theme}.css`;
	themeLink.href = `https://cdn.grapecity.com.cn/wyn/playground/assets/dashboard/dashboard.app.${theme}.css`;
	themeLink.rel = 'stylesheet';
	themeLink.id = 'theme-container';
	document.head.appendChild(themeLink);
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
			'/dashboard.app.Playground设计器自定义默认主题.css',
			'/dashboard.vendor.Playground设计器自定义默认主题.css',
			// '/assets/dashboard/dashboard.app.自定义门户默认主题.css',
		],
		js: [
			'/polyfills.js',
			'/dashboard.libs.common.js',
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
			'/viewer-app.blue.css'
		],
		js: [
			'/viewer-app.js',
			'/viewer-app.chart.js',
			'/designer-app.js',
		],
	},
};

export const isLoaded = {
	isDashboardLoaded: false,
	isReportLoaded: false,
};

// 此 CDN 地址仅用于 WYN playground 的 Demo 环境，部署时请勿引用。
// 如需部署，请将此地址更改为: `${'您的 wyn 的地址'}/wyn/api/PluginAssets`
const CDN_URL = 'https://cdn.grapecity.com.cn/wyn/playground/assets';

// 如需部署，请更改此变量
const WYN_VERSION = {
	dashboard: '您的 wyn 中 dashboard 插件的版本号',
	report: '您的 wyn 中 report 插件的版本号',
};

const loadCss = (pluginType: PluginType) => {
	const dependentCssList = dependentPackageObj[pluginType].css;
	const linkList = dependentCssList.map(dependentCss => new Promise((resolve, reject) => {
		const link = document.createElement('link');
		link.onload = () => {
			resolve(true);
		};
		link.rel = 'stylesheet';
		// 如需部署，请改为: link.href = `${CDN_URL}/${pluginType}s-${WYN_VERSION[pluginType]}${dependentCss}`;
		link.href = CDN_URL + dependentCss;
		document.head.appendChild(link);
	}));
	return Promise.all(linkList);
};

const loadJs = (pluginType: PluginType) => {
	const dependentJsList = dependentPackageObj[pluginType].js;
	const scriptList = dependentJsList.map(dependentJs => new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.onload = () => {
			resolve(true);
		};
		// 如需部署，请改为: script.src = `${CDN_URL}/${pluginType}s-${WYN_VERSION[pluginType]}${dependentJs}`;
		script.src = CDN_URL + dependentJs;
		document.head.appendChild(script);
	}));
	return Promise.all(scriptList);
};

export const dependentPackageLoad = (pluginType: PluginType) => {
	if (pluginType === PluginTypes.Dashboard && isLoaded.isDashboardLoaded) {
		return Promise.resolve();
	};
	if (pluginType === PluginTypes.Report && isLoaded.isReportLoaded) {
		return Promise.resolve();
	};
	const cssIsLoaded = loadCss(pluginType);
	const jsIsLoaded = loadJs(pluginType);
	return Promise.all([cssIsLoaded, jsIsLoaded]).then((value) => {
		if (pluginType === PluginTypes.Dashboard) {
			isLoaded.isDashboardLoaded = true;
		}
		if (pluginType === PluginTypes.Report) {
			isLoaded.isReportLoaded = true;
		}
	});
};