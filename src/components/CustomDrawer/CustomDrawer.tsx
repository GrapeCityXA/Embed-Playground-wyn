import { FC, ReactElement } from 'react'
import { Drawer } from 'antd';

import './CustomDrawer.scss';

interface CustomDrawerProps {
  handleDrawerClose: any;
  isShowSettingDialog: boolean;
  getDrawerContainer: any;
  children?: ReactElement<any, any>;
  showMask?: boolean;
  showClose?: boolean;
}

export const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const { handleDrawerClose, isShowSettingDialog, getDrawerContainer, children, showClose, showMask } = props;
  return (
    <Drawer
      title="设置"
      placement="right"
      onClose={handleDrawerClose}
      open={isShowSettingDialog}
      getContainer={getDrawerContainer}
      closable={showClose ?? false}
      rootClassName='custom-drawer'
      maskStyle={{opacity: 0}}
      mask={showMask ?? false}
    >
      {children}
    </Drawer>
  )
}
