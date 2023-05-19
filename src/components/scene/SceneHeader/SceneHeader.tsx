import { FC } from 'react';
import { Select, Badge } from 'antd';

import {
  SceneHeaderAppIcon,
  SceneHeaderHelpIcon,
  SceneHeaderNoticeIcon,
  SceneHeaderUserIcon,
} from '../../../common/icons';

import './SceneHeader.scss';

interface SceneHeaderProps {
  defaultValue?: string,
  options?: { value: string, label: string }[],
  width?: number,
  onSelectChange?: any,
  title?: string,
}

export const SceneHeader: FC<SceneHeaderProps> = (props) => {
  const { defaultValue, options, width, onSelectChange, title } = props;

  const selectDom = options ? <div className='scene-header-select'>
    <Select
      defaultValue={defaultValue}
      style={width ? { width } : {}}
      bordered={false}
      options={options}
      onChange={onSelectChange}
    />
  </div> : undefined;

  return (
    <div className='scene-header'>
      <div className="scene-header-left">
        <div className='scene-header-text'>{title ?? 'CRM管理系统'}</div>
        {selectDom}
      </div>
      <div className="scene-header-right">
        <div className='scene-header-icon'><SceneHeaderAppIcon /></div>
        <div className='scene-header-icon'><SceneHeaderHelpIcon /></div>
        <div className='scene-header-icon'><SceneHeaderNoticeIcon /></div>
        <div className='scene-header-icon'><SceneHeaderUserIcon /></div>
      </div>
    </div>
  )
}
