import { FC, useEffect, useRef, useState } from 'react';
import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';
import { scenesDesigner, dependentPackageLoad, PluginTypes, isLoaded } from '../../common/utils/utils';
import { useSelectedKeys } from '../index';
import './SceneView.scss';

const menu = [
  {
    value: 'pc',
    label: '桌面端',
  },
  {
    value: 'mobile',
    label: '移动端',
  },
]

let view: any = undefined;

const SceneViewPC: FC = () => {
  const containerRef: any = useRef(null);
  const { selectedKeys } = useSelectedKeys();
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);

  const initView = () => {
    view = WynBi.createViewerLite(scenesDesigner);
    if (containerRef !== null) {
      view.initialize({
        container: containerRef.current,
      }).then((uiDashboard: any) => {
        const page = uiDashboard.pages[0]; // UIPage
        const dom = document.createElement('div');
        dom.className = 'page-dom';
        containerRef.current.appendChild(dom);
        page.connect(dom);
        page.refresh();
      });
    }
  };

  useEffect(() => {
    return () => {
      if (view) {
        view.destroy();
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
    if (selectedKeys[0] !== '切换展示视图') {
      return;
    }
    initView();
  }, [isPackageLoaded, selectedKeys])

  return (
    <div id='pc-view' className='view' ref={containerRef}></div>
  );
}

const SceneViewMobile: FC = () => {
  const containerRef: any = useRef(null);
  const { selectedKeys } = useSelectedKeys();

  const initView = () => {
    if (containerRef !== null) {
      view.initialize({
        container: containerRef.current,
        __injectData: {
          isMobile: true
        },
      }).then((uiDashboard: any) => {
        const page = uiDashboard.pages[0]; // UIPage
        const dom = document.createElement('div');
        dom.className = 'page-dom';
        containerRef.current.appendChild(dom);
        page.connect(dom);
        page.refresh();
      });
    }
  }

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then(value => {
      if (selectedKeys[0] !== '切换展示视图') {
        return;
      }
      if (!view) {
        view = WynBi.createViewerLite(scenesDesigner);
      }
      initView();
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div id='mobile-view'>
      <div id='view-content' className='view-content' ref={containerRef}></div>
    </div>
  );
}

export const SceneView: FC = () => {
  const [dashboardView, setDashboardView] = useState<string>('pc');

  const onSelectChange = (newDashboardView: string) => {
    setDashboardView(newDashboardView);
  }

  return (
    <div className='scene-content'>
      <SceneHeader options={menu} defaultValue={dashboardView} onSelectChange={onSelectChange} />
      {
        dashboardView === 'pc' ? <SceneViewPC /> : <SceneViewMobile />
      }
    </div>
  );
}
