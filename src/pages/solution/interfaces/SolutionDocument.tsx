import { FC, useRef } from 'react'
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import solutionOrganizationSvg from '../../../common/images/sidebar/api.svg';
import './SolutionDocument.scss';


export const SolutionDocument: FC = () => {
  const title = '查看我的文档';
  const description = '通过调用API，获取当前用户可见的全部文档列表。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/Documents';
  const codeText = `url: {baseUrl}/api/graphql?token={token}\n\
method: POST\n\
headers: {\n\
  "Content-Type": "application/json",\n\
  "Accept": "application/json"\n\
}\n\
mode: "cors"\n\
body: {\n\
  query {\n\
    documents(types:"rdl,rdlx,dbd",orderby: "-created") {\n\
      id,\n\
      type,\n\
      title,\n\
      created,\n\
      created_by {\n\
        name, email\n\
      },\n\
      modified,\n\
      modified_by {\n\
        name,\n\
        email\n\
      },\n\
      effective_ops\n\
    }\n\
  }\n\
}`;
  const map: any = {
    "rdl": "报表",
    "rdlx": "报表",
    "dbd": "仪表板",
  };

  const contentRef = useRef(null);

  const getDocuments = async () => {
    api.getAllDocuments.graphqlStr = api.getAllDocuments.getGraphqlStr("rdl,rdlx,dbd", "created");
    const res: any = await sendRequest(api.getAllDocuments);

    const documents = res.data.documents;
    if (documents && documents.length > 0) {
      const content: any = contentRef.current;
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
        <div class="table-cell">${map[doc.type]}</div>
        <div class="table-cell">${doc.created_by.name}</div>
        <div class="table-cell">${formatTime(doc.created)}</div>`;
        table.appendChild(tableBodyRow);
      });
      content.appendChild(table);
    }
  }

  return (
    <div className='solution-document'>
      <SolutionHeader img={solutionOrganizationSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-document-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="option-title">您可以点击获取当前登录用户的文档列表：</div>
            <div className='option-btn'>
              <input
                id="get-documents"
                className="interface-content-button"
                type="button"
                value="获取文档列表"
                onClick={getDocuments} />
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='查看我的文档' />
      </div>
    </div>
  )
}
