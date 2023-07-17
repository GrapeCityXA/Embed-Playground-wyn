import { FC, useEffect, useState } from 'react'
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { dependentPackageLoad, PluginTypes } from '../../../common/utils/utils';
import { useSelectedKeys } from '../../index';

import './ReportDesigner.scss';

export const ReportDesigner: FC = () => {
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);
  const { selectedKeys } = useSelectedKeys();

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Report).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '报表设计器嵌入') {
      return;
    }
    const designerOptions = (window as any).GrapeCity.WynReports.Designer.createDesignerOptions(WYN.WYN_HOST, WYN.WYN_TOKEN);
    (window as any).GrapeCity.WynReports.Designer.renderApplication('report-designer-app', designerOptions);
  }, [isPackageLoaded, selectedKeys])

  useEffect(() => {
    return () => {
      if ((window as any).GrapeCity.WynReports.Designer) {
        if ((window as any).__isReactDndBackendSetUp) {
          (window as any).__isReactDndBackendSetUp = false;
        }
        (window as any).GrapeCity.WynReports.Designer.destroy();
      }
    };
  }, []);

  return (
    <div className='scene-report-designer'>
      <SceneHeader />
      <div id='report-designer-app' className="scene-designer-report"></div>
    </div>
  );
};
