import { FC, ReactElement } from 'react';
import { Modal, ConfigProvider } from 'antd';
import './ShowCodeDialog.scss';

interface ShowCodeDialogProps {
  isModalOpen?: boolean;
  onOk?: any;
  onCancel?: any;
  title?: string;
  children?: ReactElement<any, any>;
}

export const ShowCodeDialog: FC<ShowCodeDialogProps> = (props) => {
  const { isModalOpen, onOk, onCancel, title, children } = props;
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#150C92',
      }
    }}>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText="复制代码"
        cancelButtonProps={{ style: { display: 'none' } }}
        className='showCodeDialog'
        centered={true}
        width='60%'
      >
        {children}
      </Modal>
    </ConfigProvider>
  )
}


