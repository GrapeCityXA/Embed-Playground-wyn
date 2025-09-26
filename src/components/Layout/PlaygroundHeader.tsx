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
          <a href='https://wyn.grapecity.com.cn/home?token=A8925D53844AAE77070C62D24830D4F37731C6A2E2C225F2D54960618F22334A' target='_blank' rel="noreferrer" data-products='WynDemo' data-label='行业案例' aria-label='行业案例'>行业案例</a>
        </Button>
        <Button className='header-right-btn bgc-white-btn' icon={<HeaderDownloadIcon />}>
          <a href='https://github.com/GrapeCityXA/Embed-Playground-wyn' target='_blank' rel="noreferrer" data-products='WynDemo' data-label='下载示例源码' aria-label='下载示例源码'>下载示例源码</a>
        </Button>
        <Button className='header-right-btn bgc-white-btn' icon={<HeaderTryOutIcon />}>
          <a href='https://www.grapecity.com.cn/solutions/wyn/download' target='_blank' rel="noreferrer" data-products='WynDemo' data-label='立即下载' aria-label='立即下载'>立即下载</a>
        </Button>
        <Button className='header-right-btn header-right-btn-contact' icon={<HeaderContactIcon />}>
          <a href='https://www.grapecity.com.cn/solutions/wyn/applyonline' target='_blank' rel="noreferrer" data-products='WynDemo' data-label='预约技术顾问' aria-label='预约技术顾问'>预约技术顾问</a>
        </Button>
      </div>
    </Header>
  );
}
