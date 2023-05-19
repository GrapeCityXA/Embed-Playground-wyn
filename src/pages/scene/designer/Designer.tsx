import { FC, useRef, useEffect, useState } from 'react';
import { changeCssLink, dependentPackageLoad, PluginTypes, isLoaded } from '../../../common/utils/utils';
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { useSelectedKeys } from '../../index';
import './Designer.scss';

let designer: any = undefined;

export const Designer: FC = () => {
  const designerContainerRef: any = useRef(null);
  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  const initDesigner = () => {
    if (!designer) {
      designer = WynBi.create("DashboardDesigner", {
        baseUrl: WYN.WYN_INTERFACE_HOST,
        token: WYN.WYN_INTERFACE_TOKEN,
      });
    }
    designer.initialize({
      container: designerContainerRef.current,
      defaults: {
        theme: 'Playground设计器自定义默认主题',
        lng: 'zh',
        dashboardId: '0bead052-d56a-4fac-897b-a2984c0208e3',
      },
    });
  };

  useEffect(() => {
    changeCssLink('Playground设计器自定义默认主题');
    return () => {
      if (designer) {
        designer.destroy();
      }
    };
  }, []);

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '标准设计器嵌入') {
      return;
    }
    initDesigner();
  }, [isPackageLoaded, selectedKeys])
  return (
    <div className='scene-designer-content'>
      <SceneHeader />
      <div id='scene-designer-dashboard' className="scene-designer-dashboard" ref={designerContainerRef}></div>
    </div>
  )
}
