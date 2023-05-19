import { Button, Layout } from 'antd';
import { FC } from 'react';

import { HeaderCaseIcon, HeaderContactIcon, HeaderDownloadIcon, HeaderTryOutIcon } from '../../common/icons';
import './PlaygroundHeader.scss';

const { Header } = Layout;

export const PlaygroundHeader: FC = (props) => {
  return (
    <Header className="main-header">
      <div className="header-left">
        <div className="header-logo" />
        <div className="header-text">Wyn 嵌入式分析体验</div>
      </div>
      <div className="header-right">
        <Button className='header-right-btn bgc-white-btn' icon={<HeaderCaseIcon />}>
          <a href='https://www.grapecity.com.cn/solutions/wyn/demo' target='_blank' rel="noreferrer">行业案例</a>
        </Button>
        <Button className='header-right-btn bgc-white-btn' icon={<HeaderDownloadIcon />}>
          <a href='https://github.com/GrapeCityXA/Embed-Playground-wyn' target='_blank' rel="noreferrer">下载示例源码</a>
        </Button>
        <Button className='header-right-btn bgc-white-btn' icon={<HeaderTryOutIcon />}>
          <a href='https://www.grapecity.com.cn/solutions/wyn/try-wyn-for-free' target='_blank' rel="noreferrer">免费试用</a>
        </Button>
        <Button className='header-right-btn header-right-btn-contact' icon={<HeaderContactIcon />}>
          <a href='https://www.grapecity.com.cn/solutions/wyn/applyonline' target='_blank' rel="noreferrer">联系我们</a>
        </Button>

      </div>
    </Header>
  );
}
