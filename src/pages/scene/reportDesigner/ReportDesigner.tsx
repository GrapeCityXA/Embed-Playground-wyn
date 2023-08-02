import { FC, useEffect, useState } from 'react'
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { dependentPackageLoad, PluginTypes, changeCssLink, removeCssLink } from '../../../common/utils/utils';
import { useSelectedKeys } from '../../index';

import './ReportDesigner.scss';

let viewer: any | undefined;

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
    if (selectedKeys[0] !== '原生报表设计器嵌入') {
      return;
    }
    const designerOptions = (window as any).GrapeCity.WynReports.Designer.createDesignerOptions(WYN.WYN_HOST, WYN.WYN_TOKEN);

    designerOptions.saveButton.visible = false;
    designerOptions.saveAsButton.visible = false;
    designerOptions.openViewer = (options: any) => {
      viewer = (window as any).GrapeCity.WynReports.Viewer.create({
        element: options.element,
        portalUrl: WYN.WYN_HOST,
        referenceToken: WYN.WYN_TOKEN,
        reportId: options.reportInfo.id,
      });
      (viewer as any).openReport(options.reportInfo.id);
    };
    designerOptions.onCloseViewer = () => {
      if (viewer) {
        viewer.destroy();
        viewer = undefined;
      }
    };

    (window as any).GrapeCity.WynReports.Designer.renderApplication('report-designer-app', designerOptions);
  }, [isPackageLoaded, selectedKeys])

  useEffect(() => {
    if (WYN.USE_CUSTOM_THEME) {
      changeCssLink(WYN.IS_DEPLOY_SITE ? 'Playground设计器自定义默认主题' : 'playground自定义设计器主题', PluginTypes.Report);
    }
    return () => {
      if ((window as any).GrapeCity.WynReports.Designer) {
        if ((window as any).__isReactDndBackendSetUp) {
          (window as any).__isReactDndBackendSetUp = false;
        }
        (window as any).GrapeCity.WynReports.Designer.destroy();
      }
      removeCssLink();
    };
  }, []);

  return (
    <div className='scene-report-designer'>
      <SceneHeader />
      <div id='report-designer-app' className="scene-designer-report"></div>
    </div>
  );
};
