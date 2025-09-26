import { Button } from 'antd';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { CardDashboardIcon, CardExtensionIcon, CardSceneIcon, CardSolutionIcon } from '../../common/icons';
import './Home.scss';

type HomeProps = {}

export const Home: FC = (props: HomeProps) => {
  return (
    <div className='home-container'>
      <div className='home-main'>
        <div className='home-main-text-container'>
          <div className='home-main-text-title'>Wyn嵌入式分析体验</div>
          <div className='home-main-text-description'>
            <p>带您了解并探索如何将嵌入式分析集成到您的应用中，</p>
            <p>您可以在这里体验Wyn的所有嵌入式分析功能</p></div>
        </div>
        <div className='home-main-video'>
          <video controls>
            <source src="https://videos.grapecity.com.cn/WynEnterprise/online/嵌入式分析介绍.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className='home-guide'>
        <div className='home-guide-item'>
          <NavLink to="/scene/dashboard">
            <div className='home-guide-item-icon-container case-icon-container'><CardSceneIcon /></div>
            <div className='home-guide-item-title'>嵌入式场景体验</div>
            <div className='home-guide-item-description'>身临其境的嵌入场景，体验数据分析融入企业软件的真实应用</div>
            <div className='home-guide-item-button-container'>
              <Button className='home-guide-item-button'>开始体验</Button>
            </div>
          </NavLink>
        </div>
        <div className='home-guide-item'>
          <NavLink to="/solution/dashboard">
            <div className='home-guide-item-icon-container plan-icon-container'><CardSolutionIcon /></div>
            <div className='home-guide-item-title'>嵌入式技术方案</div>
            <div className='home-guide-item-description'>使用DIV、iFrame等方式快速将五个层级的分析能力嵌入你的业务系统</div>
            <div className='home-guide-item-button-container'>
              <Button className='home-guide-item-button'>开始体验</Button>
            </div>
          </NavLink>
        </div>
        <div className='home-guide-item'>
          <NavLink to="/expand/language">
            <div className='home-guide-item-icon-container expand-icon-container'><CardExtensionIcon /></div>
            <div className='home-guide-item-title'>自定义系统扩展</div>
            <div className='home-guide-item-description'>可视化插件、语言自定义等，满足你无限扩展的自定义需要</div>
            <div className='home-guide-item-button-container'>
              <Button className='home-guide-item-button'>开始体验</Button>
            </div>
          </NavLink>
        </div>
        <div className='home-guide-item'>
          <a href='https://wyn.grapecity.com.cn/home?token=A8925D53844AAE77070C62D24830D4F37731C6A2E2C225F2D54960618F22334A' target='_blank' rel="noreferrer">
            <div className='home-guide-item-icon-container dbd-icon-container'><CardDashboardIcon /></div>
            <div className='home-guide-item-title'>数据可视化大屏</div>
            <div className='home-guide-item-description'>在线体验、获取智能制造，智慧工程，智慧能源等100+行业可视化大屏模板</div>
            <div className='home-guide-item-button-container'>
              <Button className='home-guide-item-button'>开始体验</Button>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}