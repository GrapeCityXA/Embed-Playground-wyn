import { FC, useRef } from 'react'
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import solutionApiSvg from '../../../common/images/sidebar/api.svg';
import './SolutionRename.scss';

export const SolutionRename: FC = () => {
  const title = '文档重命名';
  const description = '通过调用API，实现对当前用户的文档重命名';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/Documents';
  const codeText = `url: {baseUrl}/api/graphql?token={token},\n\
method: POST,\n\
headers: {\n\
	"Content-Type": "application/json",\n\
	"Accept": "application/json"\n\
},\n\
mode: "cors",\n\
body: {\n\
	mutation {\n\
		renameDocument(documentId:"{documentId}",newName:"{rename}"){\n\
      renamed_id\n\
    }\n\
  }\n\
}`;

  const contentRef = useRef(null);

  const map: any = {
    "rdl": "报表",
    "rdlx": "报表",
    "dbd": "仪表板",
  };

  const getDocuments = async () => {
    api.getAllDocuments.graphqlStr = api.getAllDocuments.getGraphqlStr("rdl,rdlx,dbd", "modified");
    const res: any = await sendRequest(api.getAllDocuments);
    return res.data.documents;
  }

  const setOption = (documents: any) => {
    if (documents && documents.length > 0) {
      const select: any = document.getElementById("origin-documents");
      documents.forEach((doc: any) => {
        if (doc.effective_ops.indexOf("Update") > -1) {
          const option = document.createElement("option");
          option.value = doc.id;
          option.innerHTML = doc.title;
          select.appendChild(option);
        }
      });
    }
  }

  const init = async () => {
    const documents = await getDocuments();
    setOption(documents);
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
        if (doc.effective_ops.indexOf("Update") > -1) {
          const tableBodyRow = document.createElement("div");
          tableBodyRow.className = "table-body-row table-row";
          tableBodyRow.innerHTML = `<div class="table-cell">${doc.title}</div>
          <div class="table-cell">${map[doc.type]}</div>
          <div class="table-cell">${doc.created_by.name}</div>
          <div class="table-cell">${formatTime(doc.created)}</div>`;
          table.appendChild(tableBodyRow);
        }
      });
      content.appendChild(table);
    }
  }

  const rename = async () => {
    const doc: any = document.getElementById("origin-documents");
    const documentId = doc.options[doc.selectedIndex].value;
    const rename = (document.getElementById("rename") as any).value;
    api.renameDocument['graphqlStr'] = api.renameDocument.getGraphqlStr(documentId, rename);
    const res: any = await sendRequest(api.renameDocument);
    if (res.errors && res.errors.length) {
      (document.getElementById("documents") as any).innerHTML = res.errors[0].message;
    } else {
      const documents = await getDocuments();
      setGrid(documents);
    }
  }

  init();

  return (
    <div className='solution-interface'>
      <SolutionHeader img={solutionApiSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-interface-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="form-group">
              <label>文档列表：</label>
              <select id="origin-documents" className="form-control">
                <option style={{ display: 'none' }}></option>
              </select>
            </div>
            <div className="form-group">
              <label>重命名：</label>
              <input id="rename" type="text" className="form-control" />
            </div>
            <div className='option-btn'>
              <button type="button" id="rename-button" className="btn interface-content-button" onClick={rename}>
                重命名
              </button>
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='文档重命名' />
      </div>
    </div>
  )
}
