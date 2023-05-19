import { FC, useEffect, useRef, useState } from 'react';
import { SceneHeader } from '../../components/scene/SceneHeader/SceneHeader';
import { scenesDesigner, dependentPackageLoad, PluginTypes, isLoaded } from '../../common/utils/utils';
import { useSelectedKeys } from '../index';

import './SceneLayout.scss';

const menu = [
  {
    value: '1',
    label: '默认布局',
  },
  {
    value: '2',
    label: '3X3布局',
  },
  {
    value: '3',
    label: '4X2布局',
  },
]

const FirstLayoutDom = () => {
  const domRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  let ins: any = undefined;
  
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);
  const { selectedKeys } = useSelectedKeys();

  const createInstance = () => {
    ins = WynBi.createViewerLite(scenesDesigner);
    ins.initialize({
      container: domRef.current,
    }).then((uiDashboard: any) => {
      const page = uiDashboard.pages[0]; // UIPage
      page.connect(domRef.current);
      page.refresh();
    });
  };

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then(value => {
      if (selectedKeys[0] !== '仪表板重新布局') {
        return;
      }
      createInstance();
    });

    return () => {
      if (ins) {
        ins.destroy();
      }
    };
  }, [])

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '仪表板重新布局') {
      return;
    }
    createInstance();
  }, [isPackageLoaded, selectedKeys])
  return <div id="page-view" className="page-view" ref={domRef}></div>
}

const SecondLayoutDom = () => {
  const view1DomRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const pageDomRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const ins = WynBi.createViewerLite(scenesDesigner);
    ins.initialize({
      container: view1DomRef.current,
    }).then((uiDashboard: any) => {
      const pageDom: any = pageDomRef.current;
      const page = uiDashboard.pages[0]; // UIPage
      page.scenarios.forEach((scenario: any, i: number) => {
        const dom = document.createElement('div');
        dom.className = ['scenario-dom', 'layout3X3'].join(' ');
        pageDom.appendChild(dom);
        scenario.connect(dom);
      })
      page.refresh();
    });
    return () => {
      if (ins) {
        ins.destroy();
      }
    };
  }, [])
  return (
    <div id="scenarios-view1" className="scenarios-view1" ref={view1DomRef}>
      <div id="scenarios-page1" className="scenarios-page" ref={pageDomRef}></div>
    </div>
  );
}

const ThirdLayoutDom = () => {
  const view2DomRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const pageDomRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const ins = WynBi.createViewerLite(scenesDesigner);
    ins.initialize({
      container: view2DomRef.current,
    }).then((uiDashboard: any) => {
      const pageDom: any = pageDomRef.current;
      const page = uiDashboard.pages[0]; // UIPage
      page.scenarios.forEach((scenario: any, i: number) => {
        const dom = document.createElement('div');
        dom.className = ['scenario-dom', 'layout4X2'].join(' ');
        pageDom.appendChild(dom);
        scenario.connect(dom);
      })
      page.refresh();
    });
    return () => {
      if (ins) {
        ins.destroy();
      }
    };
  }, [])
  return (
    <div id="scenarios-view2" className="scenarios-view2" ref={view2DomRef}>
      <div id="scenarios-page2" className="scenarios-page layout4X2" ref={pageDomRef}></div>
    </div>
  );
}
const layoutDomMap: any = {
  '1': <FirstLayoutDom />,
  '2': <SecondLayoutDom />,
  '3': <ThirdLayoutDom />,
}
export const SceneLayout: FC = () => {
  const [dashboardLayout, setDashboardLayout] = useState<string>('1');
  const onSelectChange = (newDashboardLayout: string) => {
    setDashboardLayout(newDashboardLayout);
  }

  return (
    <div id="scene-content" className="scene-layout-content">
      <SceneHeader options={menu} defaultValue={dashboardLayout} onSelectChange={onSelectChange} />
      {layoutDomMap[dashboardLayout]}
    </div >

  )
}
