import { FC, MouseEventHandler } from 'react';
import { HeaderBase } from './HeaderBase';

import './HeaderBase.scss';

interface CustomDesignerHeaderProps {
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

export const CustomDesignerHeader: FC<CustomDesignerHeaderProps> = (props) => {
  const { isVerticalMode, onPreviewClick, showSaveDialog, toggleCollapsed, toggleInspectorVisible, toggleDataBindingVisible, showInspector, showDataBinding, isPreview } = props;
  return (
    <HeaderBase
      isVerticalMode={isVerticalMode}
      onPreviewClick={onPreviewClick}
      showSaveDialog={showSaveDialog}
      toggleCollapsed={toggleCollapsed}
      toggleInspectorVisible={toggleInspectorVisible}
      toggleDataBindingVisible={toggleDataBindingVisible}
      showInspector={showInspector}
      showDataBinding={showDataBinding}
      isPreview={isPreview}
    />
  )
};