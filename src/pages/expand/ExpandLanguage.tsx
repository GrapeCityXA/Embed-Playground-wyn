import { FC, useState } from 'react';
import { Button } from 'antd';
import { SolutionHeader } from '../../components/solution/SolutionHeader';
import './ExpandLanguage.scss';

import solutionLanguageSvg from '../../common/images/sidebar/language.svg';

export const ExpandLanguage: FC = () => {
  const title = '切换语言';
  const description = '对于跨国企业和多语言用户，可通过切换语言，同时实现切换系统门户的语言和仪表板、报表、图表内容的语言。';
  const helpDocUrl = 'https://www.grapecity.com.cn/solutions/wyn/help/docs/back-stage/system-settings/appearance/system-languages#site_main_content-doc-content_title';

  const [language, setLanguage] = useState<string>('zh');

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  }

  return (
    <div className='expand-language'>
      <SolutionHeader img={solutionLanguageSvg} title={title} description={description} helpDocUrl={helpDocUrl} />
      <div className="expand-content">
        <div className="expand-content-header">
          <span>切换语言</span>
          <Button type='primary' id='zh' onClick={() => { changeLanguage('zh') }}>中文</Button>
          <Button type='primary' id='zh-tw' onClick={() => { changeLanguage('zh-tw') }}>繁体中文</Button>
          <Button type='primary' id='en' onClick={() => { changeLanguage('en') }}>英文</Button>
          <Button type='primary' id='pl' onClick={() => { changeLanguage('pl') }}>波兰语</Button>
        </div>
        <div className="expand-content-dashboard">
          <iframe title='expansion-iframe' id="expansion-iframe" className="expansion-iframe" src={`${WYN.WYN_HOST}/dashboards/view/b6fffeb8-db5b-41ae-a62e-29f9ea2a53e0?theme=playground&token=${WYN.WYN_TOKEN}&lng=${language}`}></iframe>
        </div>
      </div>
    </div>
  )
}
