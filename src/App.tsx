import { FC, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Layout } from 'antd';
import { routerPathMap, routerPathSubmenuMap } from './pages';

import { PlaygroundHeader, PlaygroundSidebar, PlaygroundContent } from './components/Layout';

import 'antd/dist/reset.css';
import './App.scss';

const App: FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // setSelectedKeys([routerPathMap[location.pathname]]);
    if (selectedKeys.length === 0) {
      const storageSelectedKeys = localStorage.getItem('selectedKeys');
      if (storageSelectedKeys !== null && routerPathMap[location.pathname] !== '主页') {
        setSelectedKeys(JSON.parse(storageSelectedKeys));
      } else {
        setSelectedKeys(['主页']);
      }
    } else if (selectedKeys[0] !== routerPathMap[location.pathname]) {
      setSelectedKeys([routerPathMap[location.pathname]]);
    } else {
    }
    if (routerPathSubmenuMap[location.pathname].length) {
      setOpenKeys(routerPathSubmenuMap[location.pathname]);
    }
  }, [location.pathname]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    const realOpenKeys = latestOpenKey ? [latestOpenKey] : [];
    setOpenKeys(realOpenKeys);
  };

  const changeSelectedKeys = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  return (
    <Layout className='wyn-embed-main'>
      <PlaygroundHeader />
      <Layout>
        <PlaygroundSidebar
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          changeSelectedKeys={changeSelectedKeys}
        />
        <PlaygroundContent selectedKeys={selectedKeys} />
      </Layout>
    </Layout>
  );
}

export default App;
