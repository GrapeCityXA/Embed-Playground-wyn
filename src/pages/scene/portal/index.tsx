import { FC, useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { FloatButton, ConfigProvider, Form, Radio } from 'antd';
import { MenuProps } from 'rc-menu';
import { portalRouterPathMap } from '../../../pages';
import { VerticalPortalNavbar, HorizontalPortalNavbar } from '../../../components/scene/portal';
import { SceneHeader } from '../../../components/scene/SceneHeader/SceneHeader';
import { CustomDrawer } from '../../../components/CustomDrawer/CustomDrawer';
import {
  CustomDesignerSettingIcon,
  PortalFullScreenIcon,
  PortalFullScreenRestoreIcon,
  PortalHomeIcon,
  PortalKanbanIcon,
  PortalCustomerIcon,
  PortalContractIcon,
  PortalOpportunityIcon,
  PortalDataCenterIcon,
  PortalSettingIcon,
} from '../../../common/icons';
import './index.scss';

interface PortalProps {
}

interface PortalLayoutFormValue {
  layout: string,
  dataCenter: string,
  systemTheme: string,
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  disabled?: boolean,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}

const portalMenuItems: MenuItem[] = [
  getItem('首页', '首页', <PortalHomeIcon />, undefined, undefined, true),
  getItem(<NavLink to="/scene/portal/kanban-market">营销看板</NavLink>, '营销看板', <PortalKanbanIcon />),
  getItem(<NavLink to="/scene/portal/kanban-product">生产看板</NavLink>, '生产看板', <PortalKanbanIcon />),
  getItem(<NavLink to="/scene/portal/kanban-logistics">物流看板</NavLink>, '物流看板', <PortalKanbanIcon />),
  // getItem(<NavLink to="/scene/portal/kanban-multiple">综合看板</NavLink>, '综合看板', <PortalKanbanIcon />),
  getItem(<NavLink to="/scene/portal/data-center">数据中心</NavLink>, '数据中心', <PortalDataCenterIcon />),
  getItem('客户管理', '客户管理', <PortalCustomerIcon />, undefined, undefined, true),
  getItem('合同管理', '合同管理', <PortalContractIcon />, undefined, undefined, true),
  getItem('商机管理', '商机管理', <PortalOpportunityIcon />, undefined, undefined, true),
  getItem('系统管理', '系统管理', <PortalSettingIcon />, undefined, undefined, true),
];

const keyToKanbanMap: any = {
  '物流看板': '370c3205-ad56-4d35-9f1b-a071911cd58d',
  '综合看板': '370c3205-ad56-4d35-9f1b-a071911cd58d',
  '营销看板': '7409756f-2f7e-4849-9701-27193f8a0b46',
  '生产看板': 'f609549d-7ea6-463f-8062-c9d7979911cb',
};

const useCustomTheme = WYN.USE_CUSTOM_THEME;

export const Portal: FC<PortalProps> = (props) => {
  const defaultPortalLayoutFormValue: PortalLayoutFormValue = {
    layout: 'vertical',
    dataCenter: 'custom',
    systemTheme: useCustomTheme ? '自定义门户默认主题' : 'default',
  };

  const [isShowSettingDialog, setIsShowSettingDialog] = useState<boolean>(false);
  const [portalLayoutFormValue, setPortalLayoutFormValue] = useState<PortalLayoutFormValue>(defaultPortalLayoutFormValue);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  // const [infoDialogVisible, setInfoDialogVisible] = useState<boolean>(false);
  // const [docInfoId, setDocInfoId] = useState<string>('');
  const [portalSelectedKeys, setPortalSelectedKeys] = useState<string[]>(['数据中心']);
  const [kanban, setKanban] = useState<string | null>(null);
  const drawerBoxRef = useRef(null);
  const docInfoDrawerBoxRef = useRef(null);
  const location = useLocation();

  // dependentPackageLoad(PluginTypes.Dashboard);

  useEffect(() => {
    setPortalSelectedKeys([portalRouterPathMap[location.pathname]]);
    setKanban(keyToKanbanMap[portalRouterPathMap[location.pathname]]);
  }, [location, portalLayoutFormValue]);

  const handleDrawerClose = () => { setIsShowSettingDialog(false); };
  const getDrawerContainer = () => drawerBoxRef.current as any;
  // const getDocInfoDrawerContainer = () => docInfoDrawerBoxRef.current as any;
  const handleToggleDrawerVisible = () => {
    setIsShowSettingDialog(!isShowSettingDialog);
  }
  // const onInfoDialogClose = () => {
  //   setInfoDialogVisible(false);
  // }
  // const getDocInfo = (activeDocInfoId: string) => {
  //   setInfoDialogVisible(true);
  //   setDocInfoId(activeDocInfoId);
  // }
  const handlePortalChange = (changedValues: any, allValues: any) => {
    setPortalLayoutFormValue(allValues)
  }

  const isVerticalMode = portalLayoutFormValue.layout === 'vertical';
  const isCustomPortal = portalLayoutFormValue.dataCenter === 'custom';
  return (
    <div className={`scene-portal-container ${isFullScreen ? 'portal-full-screen' : ''}`} ref={drawerBoxRef}>
      {isCustomPortal ? (
        <>
          <SceneHeader title='自定义门户体验' />
          <div className={`portal-content ${isVerticalMode ? '' : 'portal-content-vertical'}`} ref={docInfoDrawerBoxRef}>
            {isVerticalMode ? <HorizontalPortalNavbar
              portalMenuItems={portalMenuItems}
              portalSelectedKeys={portalSelectedKeys}
            /> : <VerticalPortalNavbar
              portalMenuItems={portalMenuItems}
              portalSelectedKeys={portalSelectedKeys}
            />}
            <Outlet context={{ kanban }} />
          </div>
        </>) : <iframe
        id="scene-iframe"
        className="scene-iframe iframe-no-border"
        title='scene-iframe'
        width='100%'
        src={`${WYN.WYN_HOST}/documenttypes/dbd/documents/0bead052-d56a-4fac-897b-a2984c0208e3?token=${WYN.WYN_TOKEN}&theme=${portalLayoutFormValue.systemTheme}&lng=zh&hideActions=delete`}
      />}
      <FloatButton icon={<CustomDesignerSettingIcon />} className='float-setting-btn' onClick={handleToggleDrawerVisible} />
      <FloatButton icon={isFullScreen ? <PortalFullScreenRestoreIcon /> : <PortalFullScreenIcon />} className='float-fullScreen-btn' onClick={() => { setIsFullScreen(!isFullScreen); }} />
      <CustomDrawer
        handleDrawerClose={handleDrawerClose}
        isShowSettingDialog={isShowSettingDialog}
        getDrawerContainer={getDrawerContainer}
        showClose={true}
      >
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#150C92',
            fontSize: 12,
          }
        }}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            labelAlign='left'
            initialValues={portalLayoutFormValue}
            onValuesChange={handlePortalChange}
          >
            <Form.Item label="布局" name='layout'>
              <Radio.Group className='drawer-form-group-common-flex drawer-form-group-layout'>
                <Radio value="vertical" className='flex-1-1'> 纵向 </Radio>
                <Radio value="horizontal" className='flex-1-1'> 横向 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="数据中心" name='dataCenter'>
              <Radio.Group className='drawer-form-group-common-flex drawer-form-group-theme'>
                <Radio value="自定义门户默认主题" className='flex-fix-32'> Wyn默认样式 </Radio>
                <Radio value="custom" className='flex-fix-32'> 自定义样式 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="系统主题" name="systemTheme">
              <Radio.Group className='drawer-form-group-common-flex drawer-form-group-theme' disabled={!useCustomTheme}>
                {useCustomTheme ? <>
                  <Radio value="自定义门户默认主题" className='flex-fix-32'> 炫蓝色 </Radio>
                  <Radio value="自定义门户-浅色主题" className='flex-fix-32'> 简约浅色 </Radio>
                </> : <Radio value="default" className='flex-fix-32'> 默认主题 </Radio>}
              </Radio.Group>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </CustomDrawer>
      {/* <Drawer
        width={320}
        placement="right"
        onClose={onInfoDialogClose}
        open={infoDialogVisible}
        closable={false}
        rootClassName='portal-doc-info'
        getContainer={getDocInfoDrawerContainer}
      >
        <iframe
          id="portal-doc-info-iframe"
          className="scene-portal-iframe"
          title='portal-doc-info-iframe'
          width='100%'
          src={docInfoId ? `${WYN.WYN_HOST}/documenttypes/dataset/documents/${docInfoId}/info?onlyInfo=true&token=${WYN.WYN_TOKEN}` : ''}
        />
      </Drawer> */}
    </div>
  );
};

export function useKanban() {
  return useOutletContext<{ kanban: string }>();
}
