import { FC, MouseEventHandler } from 'react'
import { Layout, Button } from 'antd'
import { StopOutlined, RollbackOutlined } from '@ant-design/icons';

import {
  CustomDesignerMenuIcon,
  CustomDesignerPreviewIcon,
  CustomDesignerSaveIcon,
  CustomDesignerInspectorIcon,
  CustomDesignerDataBindingIcon,
} from '../../../../common/icons';

import './HeaderBase.scss';

const { Header } = Layout;

interface HeaderBaseProps {
  isVerticalMode: boolean,
  onPreviewClick: MouseEventHandler<HTMLElement>,
  showSaveDialog: MouseEventHandler<HTMLElement>,
  toggleCollapsed: MouseEventHandler<HTMLElement>,
  toggleInspectorVisible: Function,
  toggleDataBindingVisible: Function,
  showInspector?: boolean,
  showDataBinding?: boolean,
  isPreview?: boolean,
}

export const HeaderBase: FC<HeaderBaseProps> = (props) => {
  const {
    isVerticalMode,
    onPreviewClick,
    showSaveDialog,
    toggleCollapsed,
    toggleInspectorVisible,
    toggleDataBindingVisible,
    showInspector,
    showDataBinding,
    isPreview,
  } = props;

  const onShowInspectorClick = () => {
    toggleInspectorVisible();
  }

  const onShowDataBindingClick = () => {
    toggleDataBindingVisible();
  }

  return (
    <Header className="pg-header">
      <div className="header-common-flex header-left">
        {isVerticalMode ? <Button type='text' icon={<CustomDesignerMenuIcon />} className='header-left-btn' onClick={toggleCollapsed} /> : undefined}
        <Button type='text' icon={!isPreview ? <CustomDesignerPreviewIcon /> : <RollbackOutlined />} className='header-left-btn' onClick={onPreviewClick} >{!isPreview ? '预览' : '返回'}</Button>
        <Button type='text' icon={<CustomDesignerSaveIcon />} className='header-left-btn' onClick={showSaveDialog}>保存</Button>
      </div>
      <div className="header-center">销售数据分析大屏</div>
      <div className="header-common-flex header-right">
        {isVerticalMode ? <>
          <Button type='text' icon={showInspector ? <CustomDesignerInspectorIcon /> : <StopOutlined />} className='header-right-btn' onClick={onShowInspectorClick} disabled={!showInspector} />
          <Button type='text' icon={showDataBinding ? <CustomDesignerDataBindingIcon /> : <StopOutlined />} className='header-right-btn' onClick={onShowDataBindingClick} disabled={!showDataBinding} />
        </> : undefined}
      </div>
    </Header>
  )
};