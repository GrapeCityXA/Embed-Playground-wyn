import { FC, useRef } from 'react'
import { api } from '../../../common/utils/utils';
import { sendRequest, formatTime } from '../../../common/utils/api-service';
import { SolutionInterfacesLayout } from './SolutionInterfacesLayout';
import { SolutionHeader, ShowCodeBottom } from '../../../components/solution';
import './SolutionCreateUser.scss';

import solutionCreateUserSvg from '../../../common/images/sidebar/api.svg';

export const SolutionCreateUser: FC = () => {
  const title = '创建用户';
  const description = '通过调用API，组织管理员可在当前组织下创建用户';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/api/RESTful%20API/User';
  const codeText = `url: {baseUrl}/admin/api/accountmanagement/api/v1/users?token={token}\n\
method: POST\n\
headers: {\n\
  "Content-Type": "application/json",\n\
  "Accept": "application/json"\n\
}\n\
mode: "cors"\n\
body: {\n\
  username: \${username},\n\
  email: \${email},\n\
  mobile: "",\n\
  firstName: "",\n\
  lastName: "",\n\
  fullName: "",\n\
  password: \${password},\n\
  confirmPassword: \${password},\n\
  roles: \${roles},\n\
  customizePropertyInfo: {},\n\
  tenantId: \${tenantId},\n\
  enabled: true,\n\
}`;
  const contentRef: any = useRef(null);

  const getAllUsers = async () => {
    const res: any = await sendRequest(api.getAllUsers);
    return res.models;
  }

  const setGrid = (users: any) => {
    if (users && users.length > 0) {
      users.sort((b: any, a: any) => Date.parse(a.creationTime) - Date.parse(b.creationTime));
      const content: any = contentRef.current;
      content.innerHTML = "";
      const table = document.createElement("div");
      table.className = "document-list";
      const tableHeaderRow = document.createElement("div");
      tableHeaderRow.className = "table-header-row table-row";
      tableHeaderRow.innerHTML = `<div class="table-cell">用户名</div>
          <div class="table-cell">邮箱</div>
          <div class="table-cell">创建时间</div>`;
      table.appendChild(tableHeaderRow);
      users.forEach((user: any) => {
        const tableBodyRow = document.createElement("div");
        tableBodyRow.className = "table-body-row table-row";
        tableBodyRow.innerHTML = `<div class="table-cell">${user.username}</div>
          <div class="table-cell">${user.email}</div>
          <div class="table-cell">${formatTime(user.creationTime)}</div>`;
        table.appendChild(tableBodyRow);
      });
      content.appendChild(table);
    }
  }

  const addUser = async () => {
    const username = (document.getElementById("name") as any).value.trim();
    const email = (document.getElementById("email") as any).value.trim();
    const password = (document.getElementById("password") as any).value.trim();
    const roles = ["嵌入式体验普通角色"];
    const tenantId = "510bb310-55c1-4900-92b2-e5de4093e54f";

    api.addUser.body = api.addUser.getBody(username, email, password, roles, tenantId);
    const res: any = await sendRequest(api.addUser);

    if (res.errors && res.errors[0]) {
      contentRef.current.innerHTML = res.errors[0].message;
    } else {
      const users = await getAllUsers();
      setGrid(users);
    }
  }

  return (
    <div className='solution-interface'>
      <SolutionHeader img={solutionCreateUserSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="solution-interface-content">
        <SolutionInterfacesLayout contentRef={contentRef}>
          <>
            <div className="form-group">
              <label>用户名</label>
              <input id="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input id="password" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>邮箱</label>
              <input id="email" type="text" className="form-control" />
            </div>
            <div className='option-btn'>
              <button type="button" id="rename-button" className="btn interface-content-button" onClick={addUser}>
                创建用户
              </button>
            </div>
          </>
        </SolutionInterfacesLayout>
        <ShowCodeBottom codeText={codeText} title='创建用户' />
      </div>
    </div>
  )
}
