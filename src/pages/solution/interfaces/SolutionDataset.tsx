import { FC, useRef } from 'react'
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import './SolutionDataset.scss';

import solutionDatasetSvg from '../../../common/images/sidebar/api.svg';

export const SolutionDataset: FC = () => {
  const title = '创建数据集';
  const description = '通过调用API，用户可连接到指定数据源，加工和形成可用于数据分析的数据集。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/Dataset';
  const codeText = 'url: {baseUrl}/api/datasetmanagement/adddataset?token={token}\n\
method: POST\n\
headers: {\n\
  "Content-Type": "application/json",\n\
  "Accept": "application/json"\n\
}\n\
mode: "cors"\n\
body: {\n\
  query: {\n\
    dataSources: [{\n\
      id: {dataSourceId},\n\
      name: {dataSourceName},\n\
    }],\n\
    parameters: [],\n\
    commandModel: {\n\
      firstTable:{\n\
        id: Math.round(1000000 * Math.random()),\n\
        tableType: "NativeTable",\n\
        tableName: "{schemaName}({dataSourceId})",\n\
        dataSourceId: {dataSourceId},\n\
        unionType: "none",\n\
        tables: [],\n\
        filters: []\n\
      },\n\
    },\n\
    commandType: "Sql",\n\
  },\n\
  fields:{\n\
    column: {fieldName},\n\
    table:  "{schemaName}({dataSourceId})",\n\
    alias: "",\n\
    dataType: {fieldDataType},\n\
    fieldType: "Normal",\n\
    description: "",\n\
    display: true,\n\
    format: getDefaultFormat({fieldDataType}),\n\
    msDescription: ""\n\
  },\n\
  groupFields: [],\n\
  customSqlTables: [],\n\
  filterConditions: {\n\
    conditionType: 0\n\
  },\n\
  indexed: false,\n\
  incrementalUpdateSetting: null,\n\
  name: {datasetName},\n\
  comment: "",\n\
  tagIds: []\n\
}\n\
\n\
const getDefaultFormat = (dataType) => {\n\
  switch (dataType) {\n\
    case "Guid":\n\
    case "String":\n\
    case "Boolean":\n\
    case "Binary":\n\
    case "Unknown":\n\
      return "";\n\
    case "Number":\n\
      return "f2";\n\
    case "DateTime":\n\
    case "Date":\n\
      return "d";\n\
    default:\n\
      return "";\n\
  }\n\
}';

  const contentRef: any = useRef(null);

  const map = {
    "0": {
      id: "79c0ffe3-7cf6-4d97-9ab9-dab4eb6afa45",
      name: "嵌入式分析体验数据源",
    },
  };

  let schemas: any = null;

  const getSchema = async () => {
    api.getDatasourceSchemas.graphqlStr = api.getDatasourceSchemas.getGraphqlStr("79c0ffe3-7cf6-4d97-9ab9-dab4eb6afa45")
    const schema: any = await sendRequest(api.getDatasourceSchemas);
    const tables = schema.data.datasourceSchemas.models[0].tables;
    schemas = tables;
    if (tables && tables.length > 0) {
      const select: any = document.getElementById("tables");
      tables.forEach((table: any) => {
        const option = document.createElement("option");
        option.value = table.name;
        option.innerHTML = table.name;
        select.appendChild(option);
      });
    }
  }

  const getDocuments = async () => {
    api.getAllDocuments.graphqlStr = api.getAllDocuments.getGraphqlStr("dataset", "created");
    const res: any = await sendRequest(api.getAllDocuments);
    return res.data.documents;
  }

  const setGrid = (documents: any) => {
    if (documents && documents.length > 0) {
      const content = contentRef.current;
      content.innerHTML = "";
      const table = document.createElement("div");
      table.className = "document-list";
      const tableHeaderRow = document.createElement("div");
      tableHeaderRow.className = "table-header-row table-row";
      tableHeaderRow.innerHTML = `<div class="table-cell">文档名称</div>
          <div class="table-cell">类型</div>
          <div class="table-cell">创建人</div>
          <div class="table-cell">创建时间</div>`;
      table.appendChild(tableHeaderRow);
      documents.forEach((doc: any) => {
        const tableBodyRow = document.createElement("div");
        tableBodyRow.className = "table-body-row table-row";
        tableBodyRow.innerHTML = `<div class="table-cell">${doc.title}</div>
          <div class="table-cell">数据集</div>
          <div class="table-cell">${doc.created_by.name}</div>
          <div class="table-cell">${formatTime(doc.created)}</div>`;
        table.appendChild(tableBodyRow);
      });
      content.appendChild(table);
    }
  }

  const addDataset = async () => {
    const name = (document.getElementById("name") as any).value.trim();
    const datasource = map[0];
    const schema = schemas[(document.getElementById("tables") as any).selectedIndex];
    if (!schema) {
      window.alert("请选择Schema！");
      return;
    }
    const firstTable = {
      id: Math.round(1000000 * Math.random()),
      tableType: "NativeTable",
      tableName: `${schema.name}(${datasource.id})`,
      dataSourceId: datasource.id,
      unionType: "none",
      tables: [],
      filters: []
    };
    api.getFields.params = api.getFields.getParams(datasource.id, schema.tableSchema, schema.originName, "table");
    let res: any = await sendRequest(api.getFields);
    const fields = res.map((field: any) => ({
      column: field.name,
      table: `${schema.name}(${datasource.id})`,
      alias: "",
      dataType: field.dataType,
      fieldType: "Normal",
      description: "",
      display: true,
      format: getDefaultFormat(field.dataType),
      msDescription: ""
    }));
    api.createDataset.body = api.createDataset.getBody(name, datasource, firstTable, fields);
    res = await sendRequest(api.createDataset);

    if (res.error) {
      contentRef.current.innerHTML = res.error.message;
    }
    if (res.error_message) {
      contentRef.current.innerHTML = res.error_message
    }
    else {
      const datasets = await getDocuments();
      setGrid(datasets);
    }
  }

  const getDefaultFormat = (dataType: string) => {
    switch (dataType) {
      case "Guid":
      case "String":
      case "Boolean":
      case "Binary":
      case "Unknown":
        return '';
      case "Number":
        return 'f2';
      case "DateTime":
      case "Date":
        return 'd';
      default:
        return '';
    }
  }
  const setTable = () => { };

  getSchema();

  return (
    <div className='solution-interface'>
      <SolutionHeader img={solutionDatasetSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-interface-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="form-group">
              <label>名称</label>
              <input id="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>数据源</label>
              <select id="datasource" className="form-control" onChange={setTable}>
                <option value="0">嵌入式分析体验数据源</option>
              </select>
            </div>
            <div className="form-group">
              <label>表</label>
              <select id="tables" className="form-control"></select>
            </div>
            <div className="option-btn">
              <button type="button" id="rename-button" className="btn interface-content-button" onClick={addDataset}>
                创建数据集
              </button>
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='创建数据集' />
      </div>
    </div>
  )
}
