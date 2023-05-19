import { FC } from 'react'
import './SolutionHeader.scss';

interface SolutionHeaderProps {
  img: any,
  title: string,
  description: string,
  helpDocUrl: string,
}

export const SolutionHeader: FC<SolutionHeaderProps> = (prop) => {
  const { img, title, description, helpDocUrl } = prop;
  return (
    <div className="solution-header">
      <div className="solution-header-left">
        <div className="solution-title"><img className="header-icon" src={img} alt='' />{title}</div>
        <div className="solution-description">{description}
        </div>
      </div>
      <div className="solution-header-right"><a href={helpDocUrl} target="_blank" rel="noreferrer">帮助文档</a>
      </div>
    </div>
  )
}
