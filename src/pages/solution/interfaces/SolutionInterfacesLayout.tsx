import { FC, ReactElement } from 'react'

import './SolutionInterfacesLayout.scss';

interface SolutionInterfacesLayoutProps {
  contentRef?: any,
  children?: ReactElement<any, any>,
}

export const SolutionInterfacesLayout: FC<SolutionInterfacesLayoutProps> = (props) => {
  const { contentRef, children } = props;

  return (
    <div className='solution-interfaces-main'>
      <div className="interface-content-option">
        {children}
      </div>
      <div className="interface-content-split"></div>
      <div ref={contentRef} className="interface-content-result"></div>
    </div>
  )
}
