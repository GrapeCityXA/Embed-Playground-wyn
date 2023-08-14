import { FC, useRef, useEffect, useState } from 'react';
import { changeCssLink, dependentPackageLoad, PluginTypes, removeCssLink } from '../../../common/utils/utils';
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { useSelectedKeys } from '../../index';
import './Designer.scss';

const useCustomTheme = WYN.USE_CUSTOM_THEME;
let designer: any = undefined;

export const Designer: FC = () => {
  const designerTheme = useCustomTheme ? 'Playground设计器自定义默认主题' : 'default';
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
        theme: designerTheme,
        lng: 'zh',
        dashboardId: '0bead052-d56a-4fac-897b-a2984c0208e3',
      },
    });
  };

  useEffect(() => {
    changeCssLink(designerTheme);
    return () => {
      if (designer) {
        designer.destroy();
      }
      removeCssLink();
    };
  }, []);

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '原生仪表板设计器嵌入') {
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
};
