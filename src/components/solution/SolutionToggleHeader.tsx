import { FC, ReactElement } from 'react'

import './SolutionToggleHeader.scss';

interface SolutionToggleHeaderProps {
  children?: ReactElement<any, any>,
}

export const SolutionToggleHeader: FC<SolutionToggleHeaderProps> = (props) => {
  const { children } = props;
  return (
    <div className='solution-toggle-header'>
      {children}
    </div>
  )
}
