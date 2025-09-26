import { FC } from 'react';
import './SceneAi.scss';
export const SceneAi: FC = () => {

  return (
    <div className='scene-ai-analysis'>
      <iframe id="scene-iframe" className="scene-iframe" title='scene-iframe'
        src={`${WYN.WYN_HOST}/dashboards/chatanalysis?theme=swjs-custom&token=928F5269F9EE9D409A6ADF76D8EDCF7D65765BEC5BD54062E57CA64C52688F0B`}></iframe>
    </div>
  );
};
