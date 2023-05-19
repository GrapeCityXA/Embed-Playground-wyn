import { FC, ReactElement } from 'react';
import { Modal, ConfigProvider, Button } from 'antd';

import './CustomDialog.scss';

interface CustomDialogProps {
  isModalOpen?: boolean;
  handleModalOpen?: any;
  handleModalCancel?: any;
  title?: string;
  children?: ReactElement<any, any>;
  noShowFooter?: boolean | undefined;
}

export const CustomDialog: FC<CustomDialogProps> = (props) => {
  const { isModalOpen, handleModalOpen, handleModalCancel, title, children, noShowFooter } = props;

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#150C92',
      }
    }}>
      {noShowFooter ? <Modal
        title={title}
        open={isModalOpen}
        onOk={handleModalOpen}
        onCancel={handleModalCancel}
        centered={true}
        okText='确认'
        cancelText='取消'
        footer={null}
      >{children}</Modal> : <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleModalCancel}
        centered={true}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalOpen}>确认</Button>,
          <Button key="back" onClick={handleModalCancel}>取消</Button>,]}
      >{children}</Modal>}
    </ConfigProvider>

  )
}


