const api = {
	getAllDocuments: {
		displayName: '获取所有文档',
		// rdl,rdlx,dbd
		getGraphqlStr: (type, orderby) => `query {
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
	renameDocument: {
		displayName: '重命名文档',
		getGraphqlStr: function (documentId, rename) {
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
		getBody: (name, parentTenantId, props) => {
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
		getBody: (username, email, password, roles, tenantId) => {
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
		getGraphqlStr: function (name, provider, connectionString, extractInDatabase) {
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
		getGraphqlStr: (dataSourceId) => {
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
		getParams: (dataSourceId, schema, tableName, type) => {
			return `datasourceId=${dataSourceId}&schema=${schema}&tableName=${tableName}&type=${type}`;
		},
		method: 'GET',
	},

	createDataset: {
		displayName: '创建数据集',
		url: "api/datasetmanagement/adddataset",
		method: 'POST',
		getBody: (name, dataSource, firstTable, fields) => {
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