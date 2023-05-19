import { FC } from 'react'
import { SolutionHeader } from '../../components/solution/SolutionHeader';
import './ExpandPlugin.scss';

import solutionPluginSvg from '../../common/images/sidebar/plugin.svg';

export const ExpandPlugin: FC = () => {
  const title = '插件开发';
  const description = 'Wyn 安装后已经内置了大量常用图表和酷炫插件，同时提供系统扩展能力，用户可以自定义插件绘制更多样化的图表以更丰富的形式展示数据。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/cv/development-steps#site_main_content-doc-content_title';
  return (
    <div className='expand-plugin'>
      <SolutionHeader img={solutionPluginSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="video-content">
        <video width="75%" height="75%" controls>
          <source src="https://videos.grapecity.com.cn/WynEnterprise/online/插件开发-可视化插件视频（一）.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
