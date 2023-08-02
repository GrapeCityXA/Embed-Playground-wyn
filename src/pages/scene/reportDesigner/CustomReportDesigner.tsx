import { FC, useEffect, useState } from 'react'
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { changeCssLink, dependentPackageLoad, PluginTypes, removeCssLink, cacheReportInfo } from '../../../common/utils/utils';
import { useSelectedKeys } from '../../index';

import './CustomReportDesigner.scss';

let viewer: any | undefined;

export const CustomReportDesigner: FC = () => {
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);
  const { selectedKeys } = useSelectedKeys();

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Report).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '自定义报表设计器嵌入') {
      return;
    }
    const designerOptions = (window as any).GrapeCity.WynReports.Designer.createDesignerOptions(WYN.WYN_HOST, '35344965356C27E95B174BA3A54D5F6688961E0AF250BA9AD1D416F89947AD70');

    designerOptions.saveButton.visible = false;
    designerOptions.saveAsButton.visible = false;
    designerOptions.reportItems = 'TextBox, CheckBox, Shape, Table, Chart';
    // -7.0 properties
    designerOptions.layersEditor.visible = false;

    designerOptions.dataTab.dataSources.canModify = false;
    designerOptions.dataTab.dataSets.canModify = false;


    designerOptions.openViewer = (options: any) => {
      viewer = (window as any).GrapeCity.WynReports.Viewer.create({
        element: options.element,
        portalUrl: WYN.WYN_HOST,
        referenceToken: WYN.WYN_TOKEN,
        reportId: options.reportInfo.id,
        isFullscreen: true,
        paramPanelPosition: 'Top',
      });
      (viewer as any).openReport(options.reportInfo.id);
    };
    designerOptions.onCloseViewer = () => {
      if (viewer) {
        viewer.destroy();
        viewer = undefined;
      }
    };

    (window as any).GrapeCity.WynReports.Designer.renderApplication('report-designer-app', designerOptions).then((result: any) => {
      // 渲染完成后添加内置数据集
      (window as any).GrapeCity.WynReports.Designer.api.loadReport({
        reportInfo: {
          id: cacheReportInfo.reportId,
        },
      }).then((loadRes: any) => {
        (window as any).GrapeCity.WynReports.Designer.api.cacheReport({
          reportCacheKey: 'embedDataset',
          reportInfo: loadRes.reportInfo,
        }).then(function (catchRes: any) {
          (window as any).GrapeCity.WynReports.Designer.api.addDataSet({
            reportCacheKey: catchRes.reportCacheKey,
            dataSetName: cacheReportInfo.datasetName,
          });
        });
      });

    });
  }, [isPackageLoaded, selectedKeys])

  useEffect(() => {
    if (WYN.USE_CUSTOM_THEME) {
      changeCssLink(WYN.IS_DEPLOY_SITE ? 'Playground设计器自定义默认主题' : 'playground自定义设计器主题', PluginTypes.Report);
    }
    return () => {
      if ((window as any).GrapeCity.WynReports.Designer) {
        // 开启 react dnd 多实例模式
        if ((window as any).__isReactDndBackendSetUp) {
          (window as any).__isReactDndBackendSetUp = false;
        }
        (window as any).GrapeCity.WynReports.Designer.destroy();
      }
      removeCssLink(PluginTypes.Report);
    };
  }, []);

  return (
    <div className='scene-custom-report-designer'>
      <SceneHeader />
      <div id='report-designer-app' className="scene-custom-designer-report"></div>
    </div>
  );
};
