import { FC, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Dropdown, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { MenuProps } from 'rc-menu';
import { api } from '../../../common/utils/utils';
import { sendRequest } from '../../../common/utils/api-service';
import { PortalDocTable } from './PortalDocTable';
import { PortalStatisticsPanel } from '../../../components/scene/portal';

export const PortalDataCenter: FC = () => {
  const typeMap: { [key: string]: { text: string } } = {
    all: {
      text: '所有',
    },
    dbd: {
      text: '仪表板',
    },
    rpt: {
      text: '报表',
    },
    model: {
      text: '数据模型',
    },
    dst: {
      text: '数据集',
    },
    dsc: {
      text: '数据源',
    },
  }
  const menuProps: MenuProps = {
    items: Object.keys(typeMap).map((key => ({ label: typeMap[key].text, key, style: { fontSize: 12 } }))),
    onClick: ({ key }) => { setType(key); }
  }

  const [type, setType] = useState('dbd');
  const [documentTypeCount, setDocumentTypeCount] = useState<any>({
    dashboard: 0,
    report: 0,
    dataModel: 0,
    dataset: 0,
    dataSource: 0,
  });

  const getDocuments = async () => {
    api.getAllDocuments.graphqlStr = api.getAllDocuments.getGraphqlStr("rdl,rdlx-template,dbd,dataset,dsc,", "created");
    const res: any = await sendRequest(api.getAllDocuments);
    const documents = res.data.documents;
    const newDocumentTypeCount = {
      dashboard: 0,
      report: 0,
      dataModel: 0,
      dataset: 0,
      dataSource: 0,
    };
    if (documents && documents.length > 0) {
      documents.forEach((doc: any) => {
        switch (doc.type) {
          case 'dbd': {
            newDocumentTypeCount.dashboard += 1;
            break;
          }
          case 'rdl': {
            newDocumentTypeCount.report += 1;
            break;
          }
          case 'rdlx-template': {
            newDocumentTypeCount.report += 1;
            break;
          }
          case 'dataset': {
            newDocumentTypeCount.dataset += 1;
            break;
          }
          case 'dsc': {
            newDocumentTypeCount.dataSource += 1;
            break;
          }
          case 'smdsc': {
            newDocumentTypeCount.dataModel += 1;
            break;
          }
          default:
            break;
        }
      });
      if (JSON.stringify(newDocumentTypeCount) !== JSON.stringify(documentTypeCount)) {
        setDocumentTypeCount({ ...newDocumentTypeCount })
      }
    }
  };

  useEffect(() => {
    getDocuments();
  });

  const handleJumpCustomDesigner = () => {
    localStorage.setItem('selectedKeys', JSON.stringify(['自定义设计器嵌入']));
  };

  return (
    <div className='portal-document-panel'>
      <PortalStatisticsPanel documentTypeCount={documentTypeCount} />
      <div className='operation-panel'>
        <Dropdown menu={menuProps} className='document-type-dropdown'>
          <Space>
            {typeMap[type].text}
            <CaretDownOutlined />
          </Space>
        </Dropdown>
        <Button className='create-new-dashboard-button' onClick={handleJumpCustomDesigner}><NavLink to={'/scene/designer/custom'}>新建仪表板</NavLink></Button>
      </div>
      <div className='document-list'>
        {/* <PortalDocTable documentType={type} getDocInfo={getDocInfo} /> */}
        <PortalDocTable documentType={type} />
      </div>
    </div>
  )
}
