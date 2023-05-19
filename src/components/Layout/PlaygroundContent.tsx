
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import './PlaygroundContent.scss';

const { Content } = Layout;

interface PlaygroundContentProps {
  selectedKeys: string[];
}

export const PlaygroundContent: FC<PlaygroundContentProps> = (props) => {
  const { selectedKeys } = props;

  return (
    <Layout className='main-content'>
      <Content className="main-content-background">
        <Outlet context={{ selectedKeys }} />
      </Content>
    </Layout>
  );
}
