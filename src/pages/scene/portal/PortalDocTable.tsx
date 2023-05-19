import { FC, useEffect, useState } from 'react';
import type { PaginationProps } from 'antd';
import { Table, ConfigProvider, Modal } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import zhCN from 'antd/locale/zh_CN';
import { api } from '../../../common/utils/utils';
import { formatTime } from '../../../common/utils/api-service';
import {
  PortalInfoIcon,
  PortalTypeDashboardIcon,
  PortalTypeReportIcon,
  PortalTypeDataModelIcon,
  PortalTypeDatasetIcon,
  PortalTypeDataSourceIcon,
  CustomDesignerPreviewIcon,
} from '../../../common/icons';
import './PortalDocTable.scss';

interface DataType {
  id: string,
  title: string;
  type: string;
  modified_by: string;
  modified_time: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
}



const documentTypesMap: any = {
  dbd: {
    text: '仪表板',
    icon: <PortalTypeDashboardIcon />,
  },
  rdl: {
    text: '报表',
    icon: <PortalTypeReportIcon />,
  },
  'rdlx-template': {
    text: '报表',
    icon: <PortalTypeReportIcon />,
  },
  smdsc: {
    text: '数据模型',
    icon: <PortalTypeDataModelIcon />,
  },
  dataset: {
    text: '数据集',
    icon: <PortalTypeDatasetIcon />,
  },
  dsc: {
    text: '数据源',
    icon: <PortalTypeDataSourceIcon />,
  },
}



const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <span className='page-jump-link'>上一页</span>;
  }
  if (type === 'next') {
    return <span className='page-jump-link'>下一页</span>;
  }
  return originalElement;
};

interface PortalDocTableProps {
  documentType: string,
}

const interfaceBaseUrl = WYN.WYN_INTERFACE_HOST;
const interfaceToken = WYN.WYN_INTERFACE_TOKEN;

export const PortalDocTable: FC<PortalDocTableProps> = (props) => {
  const { documentType } = props;

  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 50,
      position: ['bottomLeft'],
      itemRender: itemRender,
    },
  });
  const [previewDialogVisible, setPreviewDialogVisible] = useState<boolean>(false);
  const [previewDialogTitle, setPreviewDialogTitle] = useState<string>('');
  const [previewDocInfo, setPreviewDocInfo] = useState<any>({
    id: '',
    type: '',
  });


  const fetchPortalDocData = (docsType: string) => {
    const docsTypeMap = {
      [docsType]: docsType,
      all: 'rdl,rdlx-template,dbd,dataset,dsc,smdsc',
      rpt: 'rdl,rdlx-template',
      model: 'smdsc',
      dst: 'dataset',
    }
    setLoading(true);
    api.getDocumentsWithPagination.graphqlStr = api.getDocumentsWithPagination.getGraphqlStr(docsTypeMap[docsType], "created", tableParams.pagination?.pageSize, tableParams.pagination?.current);
    const { displayName, graphqlStr } = api.getDocumentsWithPagination;

    const url = interfaceBaseUrl + '/api/graphql?token=' + interfaceToken;
    const options: any = {
      GC_WYN_API_TITLE: displayName,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        query: graphqlStr
      })
    };
    fetch(url, options).then((res) => {
      if (!res.ok) {
        throw new Error('Bad status code from server.');
      }
      return res.json();
    })
      .then((results) => {
        setLoading(false);
        const { data: { documentsWithPagination: { data } } } = results;
        setData(data.map((document: any) => ({
          id: document.id,
          title: document.title,
          type: document.type,
          modified_by: document.modified_by.name,
          modified_time: document.modified,
        })));
      }).catch((error) => {
        console.log(error);
      });;
  };
  const columns: ColumnsType<DataType> = [
    {
      title: '文件名称',
      dataIndex: 'title',
      width: '25%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (text, record) => {
        return documentTypesMap[text] ? <div className='portal-document-type-box'>{documentTypesMap[text].icon} {documentTypesMap[text].text}</div> : text;
      },
      width: '15%',
    },
    {
      title: '更新者',
      dataIndex: 'modified_by',
      render: (text, record) => text === 'admin' ? '管理员' : text,
      width: '20%',
    },
    {
      title: '更新时间',
      dataIndex: 'modified_time',
      render: (text) => formatTime(text),
      width: '30%',
    },
    {
      title: '',
      dataIndex: 'info',
      render: (_, record: any) => {
        const typeCanPreview = ['dbd', 'rdl'].findIndex((type) => record.type === type) >= 0;
        return (
          <div className='portal-table-preview-container' onClick={() => {
            getDocumentInfo(record);
            if (typeCanPreview) {
              handleDocPreview(record);
            }
          }}>
            {typeCanPreview ? <CustomDesignerPreviewIcon /> : ''}
            {/* {typeCanPreview ? <CustomDesignerPreviewIcon /> : <PortalInfoIcon />} */}
          </div>
        );
      },
      width: '10%',
    },
  ];


  const handleDocPreview = (documentInfo: any) => {
    setPreviewDialogVisible(true);
    setPreviewDialogTitle(documentInfo.title);
    setPreviewDocInfo({
      ...previewDocInfo,
      id: documentInfo.id,
      type: documentInfo.type,
    });
  }
  const getDocumentInfo = (documentInfo: any) => {
    // getDocInfo(documentInfo.id);
  }

  useEffect(() => {
    fetchPortalDocData(documentType);
  }, [JSON.stringify(tableParams), documentType]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
  ) => {
    setTableParams((prevTableParams) => ({
      pagination: { ...prevTableParams.pagination, ...pagination },
    }));

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handlePreviewClose = () => {
    setPreviewDialogVisible(false);
    setPreviewDialogTitle('');
  }


  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#150C92',
      }
    }} locale={zhCN}>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{
          y: '100%'
        }}
        className='portal-documents-table'
        rowClassName={(_, index) => index % 2 === 0 ? 'even' : 'odd'}
        size='middle'
      />
      <Modal
        title={previewDialogTitle}
        open={previewDialogVisible}
        onCancel={handlePreviewClose}
        footer={null}
        centered={true}
        className='portal-preview-dialog'
        width='90%'
        destroyOnClose={true}
      >
        <iframe id="portal-preview-ifame" className="portal-preview-ifame" title='portal-preview-ifame'
          src={`${WYN.WYN_HOST}/${previewDocInfo.type === 'dbd' ? 'dashboards' : 'reports'}/view/${previewDocInfo.id}?&theme=default&token=${WYN.WYN_TOKEN}&lng=zh-CN${previewDocInfo.type === 'dbd' ? '&toolbar=false' : '&toolbar=hide'}`}></iframe>
      </Modal>
    </ConfigProvider>
  )
};
