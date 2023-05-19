import { FC, useRef } from 'react'
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';

import solutionOrganizationSvg from '../../../common/images/sidebar/api.svg';

export const SolutionOrganization: FC = () => {
  const title = '创建子组织';
  const description = '通过调用API，组织管理员可在当前组织下创建子组织';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/Organization';
  const codeText = 'url: {baseUrl}/admin/api/accountmanagement/api/v1/organizations?token={token}\n\
method: POST\n\
headers: {\n\
  "Content-Type": "application/json",\n\
  "Accept": "application/json"\n\
}\n\
mode: "cors"\n\
body: {\n\
  id: "",\n\
  name: {name} ,\n\
  parentTenantId: {parentTenantId},\n\
  props: [],\n\
}';

  const contentRef: any = useRef(null);

  const getOrganizations = async () => {
    return await sendRequest(api.getOrganizations);
  }

  const setGrid = (organizations: any) => {
    if (organizations && organizations.length > 0) {
      organizations.sort((b: any, a: any) => Date.parse(a.createTime) - Date.parse(b.createTime));
      const content: any = contentRef.current;
      content.innerHTML = "";
      const table = document.createElement("div");
      table.className = "document-list";
      const tableHeaderRow = document.createElement("div");
      tableHeaderRow.className = "table-header-row table-row";
      tableHeaderRow.innerHTML = `<div class="table-cell">组织名称</div>
        <div class="table-cell">创建时间</div>`;
      table.appendChild(tableHeaderRow);
      organizations.forEach((org: any) => {
        const tableBodyRow = document.createElement("div");
        tableBodyRow.className = "table-body-row table-row";
        tableBodyRow.innerHTML = `<div class="table-cell">${org.name}</div>
        <div class="table-cell">${formatTime(org.createTime)}</div>`;
        table.appendChild(tableBodyRow);
      });
      content.appendChild(table);
    }
  }

  const addOrganization = async () => {
    const name = (document.getElementById("name") as any).value.trim();
    let parentOrganizationId = (document.getElementById("parent-organization") as any).value;
    if (!parentOrganizationId) {
      alert("必须选择父组织");
      return;
    }
    api.createOrganizations.body = api.createOrganizations.getBody(name, parentOrganizationId, []);
    const res: any = await sendRequest(api.createOrganizations);

    if (res.errors && res.errors[0]) {
      contentRef.current.innerHTML = res.errors[0].message;
    } else {
      const organizations = await getOrganizations();
      setGrid(organizations);
    }
  }

  return (
    <div className='solution-interface'>
      <SolutionHeader img={solutionOrganizationSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-interface-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="form-group">
              <label>组织名称</label>
              <input id="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>父组织</label>
              <select id="parent-organization" className="form-control">
                <option value="510bb310-55c1-4900-92b2-e5de4093e54f">嵌入式体验</option>
              </select>
            </div>
            <div className='option-btn'>
              <button type="button" id="rename-button" className="btn interface-content-button" onClick={addOrganization}>
                创建子组织
              </button>
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='创建子组织' />
      </div>
    </div>
  )
}
