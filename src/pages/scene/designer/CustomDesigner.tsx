import { FC, useEffect, useState, useRef, MouseEventHandler, createContext, useMemo } from 'react';
import { Layout, Row, FloatButton, Drawer, Form, Radio, Switch, Button, ConfigProvider, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

import { changeCssLink, dependentPackageLoad, PluginTypes, isLoaded } from '../../../common/utils/utils';
import { CustomDesignerHeader } from '../../../components/scene/customDesigner/Header';
import { CustomDesignerVerticalSideBar, CustomDesignerHorizontalSideBar } from '../../../components/scene/customDesigner/SideBar';
import { FloatDatasetSelector } from '../../../components/scene/customDesigner/FloatButton';
import { CustomDialog, DatasetSelectorDialog } from '../../../components/CustomDialog';
import { CustomDesignerSettingIcon, ChangeDataIcon } from '../../../common/icons';
import { useSelectedKeys } from '../../index';

import './CustomDesigner.scss';

const { Content } = Layout;

type CustomDesignerProps = {}

interface LayoutFormValue {
  layout: string,
  theme: string,
  showInspector: boolean,
  showDataBinding: boolean,
}

let designer: any = undefined;

const Context = createContext({ name: 'Default' });

const documentThemeMap: any = {
  'Playground设计器自定义默认主题': '5b7f21386d502b0031deb385',
  'Playground设计器自定义浅色主题': 'b55f609e-2280-4129-8b24-d79ab4ea62df',
}

// const promiseFactory: PromiseFactory = new PromiseFactory();
// const defer = promiseFactory.defer();

export const CustomDesigner: FC = (props: CustomDesignerProps) => {
  const defaultLayoutFormValue: LayoutFormValue = {
    layout: 'horizontal',
    theme: 'Playground设计器自定义默认主题',
    showInspector: true,
    showDataBinding: true,
  };

  const [isShowSettingDialog, setIsShowSettingDialog] = useState<boolean>(true);
  const [layoutFormValue, setLayoutFormValue] = useState<LayoutFormValue>(defaultLayoutFormValue);
  const [saveDialogVisible, setSaveDialogVisible] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [collapseActiveKey, setCollapseActiveKey] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const [datasetSelectorIconVisible, setDatasetSelectorIconVisible] = useState<boolean>(activeKey === 'DataBinding');
  const [datasetSelectorDialogVisible, setDatasetSelectorDialogVisible] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isPackageLoaded, setIsPackageLoaded] = useState<boolean>(false);
  const drawerBoxRef = useRef(null);
  const [layoutForm] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  const { selectedKeys } = useSelectedKeys();

  const createDesigner = () => {
    const customDesignerContainer = document.getElementById('customer-designer-viewer');

    if (!designer) {
      designer = WynBi.create('DashboardDesigner', {
        baseUrl: WYN.WYN_HOST,
        token: WYN.WYN_TOKEN,
      });
    }
    designer.initialize({
      container: customDesignerContainer,
      defaults: {
        theme: layoutFormValue.theme,
        documentThemeId: documentThemeMap[layoutFormValue.theme],
        lng: 'zh',
      },
      features: {
        toolbar: 'hide',
        showInspector: layoutFormValue.showInspector,
        showDataBindingPanel: layoutFormValue.showDataBinding,
        componentCategories: [],
        disableChangeDataset: true,
      },
    }).then(() => {
      designer.on('databindingPanelHidden', () => {
        if (layoutFormValue.showDataBinding && layoutFormValue.showInspector) {
          setActiveKey('Inspector');
          setDatasetSelectorIconVisible(false);
        }
        if (layoutFormValue.showDataBinding && !layoutFormValue.showInspector) {
          setDatasetSelectorIconVisible(false);
        }
      });
    });
  }

  const themeContainer: any = document.getElementById('theme-container');

  useEffect(() => {
    if (layoutFormValue.showInspector) {
      setActiveKey('Inspector');
      setDatasetSelectorIconVisible(false);
    } else if (layoutFormValue.showDataBinding) {
      if (!isVerticalLayout) {
        setActiveKey('DataBinding');
      }
      setDatasetSelectorIconVisible(false);
    }

    // 按需引入css link
    changeCssLink(layoutFormValue.theme);

    return () => {
      if (designer) {
        designer.off('databindingPanelHidden', () => {
        })
        designer.destroy();
      }
    }
  }, [layoutFormValue]);

  useEffect(() => {
    dependentPackageLoad(PluginTypes.Dashboard).then((value) => {
      setIsPackageLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isPackageLoaded) return;
    if (selectedKeys[0] !== '自定义设计器嵌入') {
      return;
    }
    createDesigner();
  }, [isPackageLoaded, selectedKeys, layoutFormValue])


  const isVerticalLayout = layoutFormValue.layout === 'vertical';

  const getDrawerContainer = () => drawerBoxRef.current as any;
  const handleToggleDrawerVisible = () => {
    setIsShowSettingDialog(!isShowSettingDialog);
  }
  const handleDrawerClose = () => { setIsShowSettingDialog(false); };
  const onSubmitForm = () => {
    const currentLayoutFormValue = layoutForm.getFieldsValue(true);
    setLayoutFormValue({ ...layoutFormValue, ...currentLayoutFormValue });
    handleDrawerClose();
    setIsPreview(false);
    setDatasetSelectorIconVisible(false);
    setActiveKey('Inspector');
  };
  const onResetForm = () => {
    handleDrawerClose();
    layoutForm.resetFields();
    layoutForm.setFieldsValue({ ...layoutFormValue });
  };
  const onPreviewClick: MouseEventHandler<HTMLElement> = (e) => {
    designer.togglePreview();
    setIsPreview(!isPreview);
  };
  const showSaveDialog = () => {
    setSaveDialogVisible(true);
  };
  const handleSaveConfirm = () => {
    setSaveDialogVisible(false);
  };
  const handleSaveCancel = () => {
    setSaveDialogVisible(false);
  };
  const toggleCollapsed = () => {
    if (!collapsed) {
      setCollapseActiveKey([]);
    }
    setCollapsed(!collapsed);
  };
  const handleCollapsedKey = (activeKey: string[]) => {
    setCollapseActiveKey(activeKey);
  }
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `提醒`,
      description: <Context.Consumer>{({ name }) => `请先选择一个图表`}</Context.Consumer>,
      placement,
    });
  };
  const addVisual = (visualName: string) => {
    designer.addVisual(visualName).then(() => {
      designer.showInspector();
      if (!layoutFormValue.showInspector) {
        if (isVerticalLayout) {
          designer.hideDataBindingPanel();
        } else if (layoutFormValue.showDataBinding) {
          setDatasetSelectorIconVisible(true);
        }
      }
    });
  };
  const toggleInspectorVisible = () => {
    if (layoutFormValue.showInspector) {
      if (activeKey === 'Inspector') {
        designer.hideInspector();
        setActiveKey('');
      } else {
        designer.showInspector();
        setActiveKey('Inspector');
        setDatasetSelectorIconVisible(false);
      }
    }

  };
  const toggleDataBindingVisible = () => {
    if (layoutFormValue.showDataBinding && !layoutFormValue.showInspector && !isVerticalLayout) {

      if (!datasetSelectorIconVisible) {
        try {
          designer.showDataBindingPanel()
          setDatasetSelectorIconVisible(true);
        } catch (error) {
          openNotification('bottomRight');
          return false;
        }
      }
    } else {
      if (activeKey === 'DataBinding') {
        designer.hideDataBindingPanel();
        setActiveKey('');
        setDatasetSelectorIconVisible(false);
      } else {
        try {
          designer.showDataBindingPanel();
          if (layoutFormValue.showDataBinding) {
            setActiveKey('DataBinding');
            setDatasetSelectorIconVisible(true);
          }
        } catch (error) {
          openNotification('bottomRight');
          return false;
        }
      }
    }
  };
  const handleDatasetSelector = () => {
    showDatasetSelectorDialog(true);
  }
  const showDatasetSelectorDialog = (isShow: boolean, dataSetId?: string) => {
    setDatasetSelectorDialogVisible(isShow);
    if (!isShow && dataSetId) {
      designer.setDatasetId(dataSetId);
    }
  }


  const sidebarLayoutDom = (isVerticalLayout && !isPreview) ? <CustomDesignerVerticalSideBar
    collapsed={collapsed}
    addVisual={addVisual}
    collapseActiveKey={collapseActiveKey}
    handleCollapsedKey={handleCollapsedKey}
  /> : undefined;
  const getContentLayoutDom = () => {
    if (isVerticalLayout) {
      return (
        <Content className='custom-designer-content'>
          <div id='customer-designer-viewer' className='customer-designer-viewer'></div>
        </Content>
      );
    }
    return (
      <Content className='custom-designer-content custom-designer-horizontal'>
        {!isPreview ? (
          <Row className='custom-designer-horizontal-sidebar'>
            <CustomDesignerHorizontalSideBar
              addVisual={addVisual}
              toggleInspectorVisible={toggleInspectorVisible}
              toggleDataBindingVisible={toggleDataBindingVisible}
              isShow={layoutFormValue.showInspector || layoutFormValue.showDataBinding}
              activeKey={activeKey}
            />
          </Row>
        ) : undefined}
        <Row className='custom-designer-horizontal-viewer'>
          <div id='customer-designer-viewer' className='customer-designer-viewer'></div>
        </Row>
      </Content>
    );
  }

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Layout className='custom-designer-main'>
        <CustomDesignerHeader
          isVerticalMode={isVerticalLayout}
          onPreviewClick={onPreviewClick}
          showSaveDialog={showSaveDialog}
          toggleCollapsed={toggleCollapsed}
          toggleInspectorVisible={toggleInspectorVisible}
          toggleDataBindingVisible={toggleDataBindingVisible}
          showInspector={layoutFormValue.showInspector}
          showDataBinding={layoutFormValue.showDataBinding}
          isPreview={isPreview}
        />
        <Layout className='custom-designer-common-style' ref={drawerBoxRef}>
          {sidebarLayoutDom}
          {getContentLayoutDom()}
        </Layout>

        <FloatButton icon={<CustomDesignerSettingIcon />} className='float-setting-btn' onClick={handleToggleDrawerVisible} />

        <Drawer
          title="设置"
          placement="right"
          onClose={handleDrawerClose}
          open={isShowSettingDialog}
          getContainer={getDrawerContainer}
          closable={false}
          rootClassName='custom-designer-drawer'
          mask={false}

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
              initialValues={layoutFormValue}
              form={layoutForm}
            >
              <Form.Item label="布局" name='layout'>
                <Radio.Group className='drawer-form-group-common-flex drawer-form-group-layout'>
                  <Radio value="vertical" className='flex-1-1'> 纵向 </Radio>
                  <Radio value="horizontal" className='flex-1-1'> 横向 </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="系统主题" name='theme'>
                <Radio.Group className='drawer-form-group-common-flex drawer-form-group-theme'>
                  <Radio value="Playground设计器自定义默认主题" className='flex-fix-32'> 炫蓝色 </Radio>
                  <Radio value="Playground设计器自定义浅色主题" className='flex-fix-32'> 清晰绿色 </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="显示属性面板" name="showInspector" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
              <Form.Item label="显示数据面板" name="showDataBinding" valuePropName="checked">
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
              <Form.Item className='form-btn-box'>
                <Button type="primary" className='layoutForm-btn' onClick={onSubmitForm}>重载设计器</Button>
                <Button type="primary" className='layoutForm-btn reset-btn' onClick={onResetForm}>取消</Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </Drawer>

        <CustomDialog title='保存仪表板' isModalOpen={saveDialogVisible} handleModalOpen={handleSaveConfirm} handleModalCancel={handleSaveCancel}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="off"
          >
            <Form.Item
              label="仪表板名字"
              name="dashboardName"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="备注"
              name="comment"
            >
              <Input />
            </Form.Item>
          </Form>
        </CustomDialog>

        <DatasetSelectorDialog onOpen={datasetSelectorDialogVisible} handleModalShow={showDatasetSelectorDialog} />

        {(datasetSelectorIconVisible && !isPreview) ? <FloatDatasetSelector width={40} height={16} position={{ top: isVerticalLayout ? 58 : 108, right: 20 }} icon={<ChangeDataIcon />} onClick={handleDatasetSelector} /> : undefined}
      </Layout>
    </Context.Provider>
  );
};
