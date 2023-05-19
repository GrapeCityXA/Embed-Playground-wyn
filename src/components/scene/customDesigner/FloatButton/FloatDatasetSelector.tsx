import { FC, MouseEventHandler } from 'react'

import './FloatDatasetSelector.scss'

interface FloatDatasetSelectorProps {
  width: number;
  height: number;
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  icon?: any;
  label?: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const FloatDatasetSelector: FC<FloatDatasetSelectorProps> = (props) => {
  const { width, height, position, icon, label, onClick } = props;

  return (
    <div className='float-dataset-selector' style={{width, height, ...position}} onClick={onClick}>
      {icon}
      {label}
    </div>
  )
}
