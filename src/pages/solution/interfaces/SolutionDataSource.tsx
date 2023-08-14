import { FC, useRef } from 'react'
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import './SolutionDataSource.scss';

import solutionDataSourceSvg from '../../../common/images/sidebar/api.svg';

export const SolutionDataSource: FC = () => {
  const title = '创建数据源';
  const description = '通过调用API，用户可创建数据源连接到指定数据库开始数据分析。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/Datasource';
  const codeText = `url: {baseUrl}/api/graphql?token={token}\n\
method: POST\n\
headers: {\n\
  "Content-Type": "application/json",\n\
  "Accept": "application/json"\n\
}\n\
mode: "cors"\n\
body: {\n\
  mutation {\n\
    addDatasource(\n\
      name: "\${name}",\n\
      provider: "\${provider}",\n\
      connectionString: "\${connectionString}",\n\
      useAdvancedConfig: true,\n\
      extractInDatabase: \${extractInDatabase},\n\
      mappingConfig: ""\n\
    ) {\n\
      id,\n\
      name,\n\
      provider,\n\
      connectionString,\n\
    }\n\
  }\n\
}`;

  const contentRef: any = useRef(null);

  const map: any = {
    "0": {
      provider: "SqlServer",
      connectionString: "Server=39.105.3.244; Port=33060; Database=CRMDB1; Uid=wynxly; Pwd=wynxly;SslMode=none;",
    },
  };

  const setConnectionString = () => {
  }

  const getDocuments = async () => {
    api.getAllDocuments.graphqlStr = api.getAllDocuments.getGraphqlStr("dsc", "created");
    const res: any = await sendRequest(api.getAllDocuments);
    return res.data.documents;
  }

  const setGrid = (documents: any) => {
    if (documents && documents.length > 0) {
      const content: any = contentRef.current;
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
          <div class="table-cell">数据源</div>
          <div class="table-cell">${doc.created_by.name}</div>
          <div class="table-cell">${formatTime(doc.created)}</div>`;
        table.appendChild(tableBodyRow);
      });
      content.appendChild(table);
    }
  }

  const addDataSource = async () => {
    const inputName = (document.getElementById("name") as any).value.trim();
    const { provider, connectionString } = map[(document.getElementById("database") as any).value];
    api.addDataSource['graphqlStr'] = api.addDataSource.getGraphqlStr(inputName, provider, connectionString, false);
    const res: any = await sendRequest(api.addDataSource);
    if (res.errors) {
      contentRef.current.innerHTML = res.error_message
    } else {
      const datasources = await getDocuments();
      setGrid(datasources);
    }
  }

  return (
    <div className='solution-interface'>
      <SolutionHeader img={solutionDataSourceSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-interface-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="form-group">
              <label>名称</label>
              <input id="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>数据库</label>
              <select id="database" className="form-control" onChange={setConnectionString}>
                <option value="0">Sql Server</option>
              </select>
            </div>
            <div className="form-group">
              <label>数据库连接信息</label>
              <textarea id="connection-string" style={{ fontSize: '14px', color: 'rgba(59, 59, 59, 0.8)' }} disabled defaultValue={map['0'].connectionString}>

              </textarea>
            </div>
            <div className='option-btn'>
              <button type="button" id="rename-button" className="btn interface-content-button" onClick={addDataSource}>
                创建数据源
              </button>
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='创建数据源' />
      </div>
    </div>
  )
}
