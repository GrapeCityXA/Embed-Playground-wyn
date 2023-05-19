import { FC, useState } from 'react'
import { Input, Tree, ConfigProvider } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { FolderOutlined } from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import { CustomDialog } from './CustomDialog';
import { DatasetItemIcon } from '../../common/icons';

const datasetTreeData: DataNode[] = [
  {
    key: '销售数据',
    title: '销售数据',
    icon: <FolderOutlined />,
    checkable: false,
    children: [
      {
        key: 'Demo-销售分析-缓存模型',
        title: 'Demo-销售分析-缓存模型',
        icon: <DatasetItemIcon />,
      }
    ],
  },
  {
    key: '客户数据',
    title: '客户数据',
    icon: <FolderOutlined />,
    checkable: false,
    children: [
      {
        key: '客户画像',
        title: '客户画像',
        icon: <DatasetItemIcon />,
      }
    ],
  },
  {
    key: '生产数据',
    title: '生产数据',
    icon: <FolderOutlined />,
    checkable: false,
    children: [
      {
        key: 'SMT生产数据',
        title: 'SMT生产数据',
        icon: <DatasetItemIcon />,
      }
    ],
  },
]
const datasetNameMappingId: any = {
  'Demo-销售分析-缓存模型': '0f4da79a-16fa-4a41-9592-3e5ba31a79a6',
  '客户画像': '752fce78-cc79-491b-8e18-96f4403136d6',
  'SMT生产数据': 'c163fb66-669d-41c0-b8c3-5229fb78a794',
}
const datasetTreeList: { key: React.Key; title: string; icon: any }[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, icon } = node;
    datasetTreeList.push({ key, title: key as string, icon });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(datasetTreeData);
const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

interface DatasetSelectorDialogProps {
  onOpen: boolean;
  handleModalShow: Function;
}

const { Search } = Input;

export const DatasetSelectorDialog: FC<DatasetSelectorDialogProps> = (props) => {
  const { onOpen, handleModalShow } = props;

  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['销售数据']);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedKey, setCheckedKey] = useState<string>('Demo-销售分析-缓存模型');

  const handleDSConfirm = () => {
    handleModalShow(false, datasetNameMappingId[checkedKey]);
  };
  const handleDSCancel = () => { handleModalShow(false); };
  const onSearchParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = datasetTreeList
      .map((item) => {
        if (item.title.indexOf(value) > -1 || item.title.indexOf(value) > -1) {
          return getParentKey(item.key, datasetTreeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onDatasetCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    setCheckedKey(!Array.isArray(checkedKeys) ? (checkedKeys.checked[checkedKeys.checked.length - 1] as any) : checkedKey);
  };

  return (
    <CustomDialog title='请选择要分析的数据' isModalOpen={onOpen} handleModalOpen={handleDSConfirm} handleModalCancel={handleDSCancel}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#150C92',
        }
      }} locale={zhCN}>
        <div>
          <Search style={{ marginBottom: 8 }} placeholder="输入数据集 / 数据模型名称搜索" onChange={onSearchParamsChange} value={searchValue} />
          <Tree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={datasetTreeData}
            // showLine={true}
            checkable
            checkStrictly
            selectable={false}
            checkedKeys={[checkedKey]}
            onCheck={onDatasetCheck}
            showIcon={true}
          />
        </div>
      </ConfigProvider>
    </CustomDialog >
  )
}
