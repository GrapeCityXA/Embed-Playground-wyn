import Icon from '@ant-design/icons';
import { FC } from 'react';

import { ReactComponent as HeaderCaseSvg } from '../images/layout/case.svg';
import { ReactComponent as HeaderContactSvg } from '../images/layout/contact.svg';
import { ReactComponent as HeaderDownloadSvg } from '../images/layout/download.svg';
import { ReactComponent as HeaderTryOutSvg } from '../images/layout/try.svg';

import { ReactComponent as ApiSvg } from '../images/sidebar/api.svg';
import { ReactComponent as ChartSvg } from '../images/sidebar/chart.svg';
import { ReactComponent as DashboardSvg } from '../images/sidebar/dashboard.svg';
import { ReactComponent as DashboardDesignerSvg } from '../images/sidebar/dashboardDesigner.svg';
import { ReactComponent as ReportDesignerSvg } from '../images/sidebar/reportDesigner.svg';
import { ReactComponent as DivSvg } from '../images/sidebar/div.svg';
import { ReactComponent as HomeSvg } from '../images/sidebar/home.svg';
import { ReactComponent as IframeSvg } from '../images/sidebar/iframe.svg';
import { ReactComponent as LanguageSvg } from '../images/sidebar/language.svg';
import { ReactComponent as LayoutSvg } from '../images/sidebar/layout.svg';
import { ReactComponent as MobileSvg } from '../images/sidebar/mobile.svg';
import { ReactComponent as OemSvg } from '../images/sidebar/oem.svg';
import { ReactComponent as PluginSvg } from '../images/sidebar/plugin.svg';
import { ReactComponent as PortalSvg } from '../images/sidebar/portal.svg';
import { ReactComponent as ThemeSvg } from '../images/sidebar/theme.svg';
import { ReactComponent as UserSvg } from '../images/sidebar/user.svg';
import { ReactComponent as ViewSvg } from '../images/sidebar/view.svg';

import { ReactComponent as CustomDesignerMenuSvg } from '../images/scene/custom-designer/Menu.svg';
import { ReactComponent as CustomDesignerPreviewSvg } from '../images/scene/custom-designer/Preview.svg';
import { ReactComponent as CustomDesignerSaveSvg } from '../images/scene/custom-designer/Save.svg';
import { ReactComponent as CustomDesignerInspectorSvg } from '../images/scene/custom-designer/Properties Panel.svg';
import { ReactComponent as CustomDesignerDataBindingSvg } from '../images/scene/custom-designer/Data Panel.svg';
import { ReactComponent as ChangeDataSvg } from '../images/scene/custom-designer/change data.svg';
import { ReactComponent as CustomDesignerSettingSvg } from '../images/scene/custom-designer/Setting.svg';
import { ReactComponent as AdvancedChartSvg } from '../images/scene/custom-designer/Advanced Chart.svg';
import { ReactComponent as BasicChartSvg } from '../images/scene/custom-designer/Basci Chart.svg';
import { ReactComponent as FilterChartSvg } from '../images/scene/custom-designer/Filter Chart.svg';
import { ReactComponent as ContainerChartSvg } from '../images/scene/custom-designer/Container Chart.svg';
import { ReactComponent as ColumnChartSvg } from '../images/scene/custom-designer/Basci Chart1.svg';
import { ReactComponent as LineChartSvg } from '../images/scene/custom-designer/Basci Chart2.svg';
import { ReactComponent as StackedAreaChartSvg } from '../images/scene/custom-designer/Basci Chart3.svg';
import { ReactComponent as FilledRadarChartSvg } from '../images/scene/custom-designer/Basci Chart4.svg';
import { ReactComponent as BarChartSvg } from '../images/scene/custom-designer/Basci Chart5.svg';
import { ReactComponent as BarInPolarChartSvg } from '../images/scene/custom-designer/Basci Chart6.svg';
import { ReactComponent as PieChartSvg } from '../images/scene/custom-designer/Basci Chart7.svg';
import { ReactComponent as BubbleChartSvg } from '../images/scene/custom-designer/Basci Chart8.svg';
import { ReactComponent as PivotTableSvg } from '../images/scene/custom-designer/Basci Chart9.svg';
import { ReactComponent as TreeMapChartSvg } from '../images/scene/custom-designer/Basci Chart10.svg';
import { ReactComponent as ThreeDBarChartSvg } from '../images/scene/custom-designer/Advanced Chart1.svg';
import { ReactComponent as ThreeDPieChartSvg } from '../images/scene/custom-designer/Advanced Chart2.svg';
import { ReactComponent as ThreeDColumnChartSvg } from '../images/scene/custom-designer/Advanced Chart3.svg';
import { ReactComponent as ThreeDEarthMapChartSvg } from '../images/scene/custom-designer/Advanced Chart4.svg';
import { ReactComponent as ThreeDFunnelChartSvg } from '../images/scene/custom-designer/Advanced Chart5.svg';
import { ReactComponent as ThreeDPyramidChartSvg } from '../images/scene/custom-designer/Advanced Chart6.svg';
import { ReactComponent as ThreeDWorldCloudChartSvg } from '../images/scene/custom-designer/Advanced Chart7.svg';
import { ReactComponent as ThreeDBaiduMapChartSvg } from '../images/scene/custom-designer/Advanced Chart8.svg';
import { ReactComponent as MultiDimensionalSlicerSvg } from '../images/scene/custom-designer/Filter Chart1.svg';
import { ReactComponent as DateRangeSlicerSvg } from '../images/scene/custom-designer/Filter Chart2.svg';
import { ReactComponent as MultiDimensionalDropdownSlicerSvg } from '../images/scene/custom-designer/Filter Chart3.svg';
import { ReactComponent as ContainerSvg } from '../images/scene/custom-designer/Container Chart1.svg';
import { ReactComponent as TabContainerSvg } from '../images/scene/custom-designer/Container Chart2.svg';
import { ReactComponent as DatasetItemSvg } from '../images/scene/custom-designer/dataset-item.svg';

import { ReactComponent as CardDashboardSvg } from '../images/home/dashboard.svg';
import { ReactComponent as CardExtensionSvg } from '../images/home/extension.svg';
import { ReactComponent as CardSceneSvg } from '../images/home/scene.svg';
import { ReactComponent as CardSolutionSvg } from '../images/home/solutions.svg';

import { ReactComponent as SceneHeaderAppSvg } from '../images/scene/header/app.svg';
import { ReactComponent as SceneHeaderHelpSvg } from '../images/scene/header/help.svg';
import { ReactComponent as SceneHeaderNoticeSvg } from '../images/scene/header/notice.svg';
import { ReactComponent as SceneHeaderUserSvg } from '../images/scene/header/user.svg';

import { ReactComponent as PortalFullScreenSvg } from '../images/scene/portal/full screen.svg';
import { ReactComponent as PortalFullScreenRestoreSvg } from '../images/scene/portal/restore.svg';
import { ReactComponent as PortalHomeSvg } from '../images/scene/portal/home.svg';
import { ReactComponent as PortalKanbanSvg } from '../images/scene/portal/kanban.svg';
import { ReactComponent as PortalCustomerSvg } from '../images/scene/portal/customer.svg';
import { ReactComponent as PortalContractSvg } from '../images/scene/portal/contract.svg';
import { ReactComponent as PortalOpportunitySvg } from '../images/scene/portal/opportunity.svg';
import { ReactComponent as PortalDataCenterSvg } from '../images/scene/portal/data center.svg';
import { ReactComponent as PortalSettingSvg } from '../images/scene/portal/system setting.svg';
import { ReactComponent as PortalDashboardSvg } from '../images/scene/portal/dashboard.svg';
import { ReactComponent as PortalReportSvg } from '../images/scene/portal/report.svg';
import { ReactComponent as PortalDataModelSvg } from '../images/scene/portal/data model.svg';
import { ReactComponent as PortalDatasetSvg } from '../images/scene/portal/dataset.svg';
import { ReactComponent as PortalDataSourceSvg } from '../images/scene/portal/data source.svg';
import { ReactComponent as PortalInfoSvg } from '../images/scene/portal/info.svg';


const HeaderCaseIcon: FC = () => <Icon component={HeaderCaseSvg} width={16} style={{ fontSize: 16 }} />;
const HeaderContactIcon: FC = () => <Icon component={HeaderContactSvg} width={16} style={{ fontSize: 16 }} />;
const HeaderDownloadIcon: FC = () => <Icon component={HeaderDownloadSvg} width={16} style={{ fontSize: 16 }} />;
const HeaderTryOutIcon: FC = () => <Icon component={HeaderTryOutSvg} width={16} style={{ fontSize: 16 }} />;

const HomeIcon: FC = () => <Icon component={HomeSvg} width={16} style={{ fontSize: 16 }} />;
const DashboardIcon: FC = () => <Icon component={DashboardSvg} width={16} style={{ fontSize: 16 }} />;
const ChartIcon: FC = () => <Icon component={ChartSvg} width={16} style={{ fontSize: 16 }} />;
const DashboardDesignerIcon: FC = () => <Icon component={DashboardDesignerSvg} width={16} style={{ fontSize: 16 }} />;
const ReportDesignerIcon: FC = () => <Icon component={ReportDesignerSvg} width={16} style={{ fontSize: 16 }} />;
const PortalIcon: FC = () => <Icon component={PortalSvg} width={16} style={{ fontSize: 16 }} />;
const LayoutIcon: FC = () => <Icon component={LayoutSvg} width={16} style={{ fontSize: 16 }} />;
const ThemeIcon: FC = () => <Icon component={ThemeSvg} width={16} style={{ fontSize: 16 }} />;
const ViewIcon: FC = () => <Icon component={ViewSvg} width={16} style={{ fontSize: 16 }} />;
const IframeIcon: FC = () => <Icon component={IframeSvg} width={16} style={{ fontSize: 16 }} />;
const DivIcon: FC = () => <Icon component={DivSvg} width={16} style={{ fontSize: 16 }} />;
const ApiIcon: FC = () => <Icon component={ApiSvg} width={16} style={{ fontSize: 16 }} />;
const UserIcon: FC = () => <Icon component={UserSvg} width={16} style={{ fontSize: 16 }} />;
const MobileIcon: FC = () => <Icon component={MobileSvg} width={16} style={{ fontSize: 16 }} />;
const OemIcon: FC = () => <Icon component={OemSvg} width={16} style={{ fontSize: 16 }} />;
const LanguageIcon: FC = () => <Icon component={LanguageSvg} width={16} style={{ fontSize: 16 }} />;
const PluginIcon: FC = () => <Icon component={PluginSvg} width={16} style={{ fontSize: 16 }} />;

const CustomDesignerMenuIcon: FC = () => <Icon component={CustomDesignerMenuSvg} width={18} style={{ fontSize: 18 }} />;
const CustomDesignerPreviewIcon: FC = () => <Icon component={CustomDesignerPreviewSvg} width={18} style={{ fontSize: 18 }} />;
const CustomDesignerSaveIcon: FC = () => <Icon component={CustomDesignerSaveSvg} width={18} style={{ fontSize: 18 }} />;
const CustomDesignerInspectorIcon: FC = () => <Icon component={CustomDesignerInspectorSvg} width={18} style={{ fontSize: 18 }} />;
const CustomDesignerDataBindingIcon: FC = () => <Icon component={CustomDesignerDataBindingSvg} width={18} style={{ fontSize: 18 }} />;
const ChangeDataIcon: FC = () => <Icon component={ChangeDataSvg} width={18} style={{ fontSize: 18 }} />;
const CustomDesignerSettingIcon: FC = () => <Icon component={CustomDesignerSettingSvg} width={48} style={{ fontSize: 48 }} />;
const AdvancedChartIcon: FC = () => <Icon component={AdvancedChartSvg} width={18} style={{ fontSize: 24 }} />;
const BasicChartIcon: FC = () => <Icon component={BasicChartSvg} width={18} style={{ fontSize: 24 }} />;
const FilterChartIcon: FC = () => <Icon component={FilterChartSvg} width={18} style={{ fontSize: 24 }} />;
const ContainerChartIcon: FC = () => <Icon component={ContainerChartSvg} width={18} style={{ fontSize: 24 }} />;
const ColumnChartIcon: FC = () => <Icon component={ColumnChartSvg} width={30} style={{ fontSize: 30 }} />;
const LineChartIcon: FC = () => <Icon component={LineChartSvg} width={30} style={{ fontSize: 30 }} />;
const StackedAreaChartIcon: FC = () => <Icon component={StackedAreaChartSvg} width={30} style={{ fontSize: 30 }} />;
const FilledRadarChartIcon: FC = () => <Icon component={FilledRadarChartSvg} width={30} style={{ fontSize: 30 }} />;
const BarChartIcon: FC = () => <Icon component={BarChartSvg} width={30} style={{ fontSize: 30 }} />;
const BarInPolarChartIcon: FC = () => <Icon component={BarInPolarChartSvg} width={30} style={{ fontSize: 30 }} />;
const PieChartIcon: FC = () => <Icon component={PieChartSvg} width={30} style={{ fontSize: 30 }} />;
const BubbleChartIcon: FC = () => <Icon component={BubbleChartSvg} width={30} style={{ fontSize: 30 }} />;
const PivotTableIcon: FC = () => <Icon component={PivotTableSvg} width={30} style={{ fontSize: 30 }} />;
const TreeMapChartIcon: FC = () => <Icon component={TreeMapChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDBarChartIcon: FC = () => <Icon component={ThreeDBarChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDPieChartIcon: FC = () => <Icon component={ThreeDPieChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDColumnChartIcon: FC = () => <Icon component={ThreeDColumnChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDEarthMapChartIcon: FC = () => <Icon component={ThreeDEarthMapChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDFunnelChartIcon: FC = () => <Icon component={ThreeDFunnelChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDPyramidChartIcon: FC = () => <Icon component={ThreeDPyramidChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDWorldCloudChartIcon: FC = () => <Icon component={ThreeDWorldCloudChartSvg} width={30} style={{ fontSize: 30 }} />;
const ThreeDBaiduMapChartIcon: FC = () => <Icon component={ThreeDBaiduMapChartSvg} width={30} style={{ fontSize: 30 }} />;
const MultiDimensionalSlicerIcon: FC = () => <Icon component={MultiDimensionalSlicerSvg} width={30} style={{ fontSize: 30 }} />;
const DateRangeSlicerIcon: FC = () => <Icon component={DateRangeSlicerSvg} width={30} style={{ fontSize: 30 }} />;
const MultiDimensionalDropdownSlicerIcon: FC = () => <Icon component={MultiDimensionalDropdownSlicerSvg} width={30} style={{ fontSize: 30 }} />;
const ContainerIcon: FC = () => <Icon component={ContainerSvg} width={30} style={{ fontSize: 30 }} />;
const TabContainerIcon: FC = () => <Icon component={TabContainerSvg} width={30} style={{ fontSize: 30 }} />;
const DatasetItemIcon: FC = () => <Icon component={DatasetItemSvg} width={18} style={{ fontSize: 18 }} />;

const CardSceneIcon: FC = () => <Icon component={CardSceneSvg} width={90} style={{ fontSize: 90 }} />;
const CardSolutionIcon: FC = () => <Icon component={CardSolutionSvg} width={90} style={{ fontSize: 90 }} />;
const CardExtensionIcon: FC = () => <Icon component={CardExtensionSvg} width={90} style={{ fontSize: 90 }} />;
const CardDashboardIcon: FC = () => <Icon component={CardDashboardSvg} width={90} style={{ fontSize: 90 }} />;

const SceneHeaderAppIcon: FC = () => <Icon component={SceneHeaderAppSvg} width={16} style={{ fontSize: 16 }} />;
const SceneHeaderHelpIcon: FC = () => <Icon component={SceneHeaderHelpSvg} width={16} style={{ fontSize: 16 }} />;
const SceneHeaderNoticeIcon: FC = () => <Icon component={SceneHeaderNoticeSvg} width={16} style={{ fontSize: 16 }} />;
const SceneHeaderUserIcon: FC = () => <Icon component={SceneHeaderUserSvg} width={26} style={{ fontSize: 26 }} />;

const PortalFullScreenIcon: FC = () => <Icon component={PortalFullScreenSvg} width={48} style={{ fontSize: 48 }} />;
const PortalFullScreenRestoreIcon: FC = () => <Icon component={PortalFullScreenRestoreSvg} width={48} style={{ fontSize: 48 }} />;
const PortalHomeIcon: FC = () => <Icon component={PortalHomeSvg} width={16} style={{ fontSize: 16 }} />;
const PortalKanbanIcon: FC = () => <Icon component={PortalKanbanSvg} width={16} style={{ fontSize: 16 }} />;
const PortalCustomerIcon: FC = () => <Icon component={PortalCustomerSvg} width={16} style={{ fontSize: 16 }} />;
const PortalContractIcon: FC = () => <Icon component={PortalContractSvg} width={16} style={{ fontSize: 16 }} />;
const PortalOpportunityIcon: FC = () => <Icon component={PortalOpportunitySvg} width={16} style={{ fontSize: 16 }} />;
const PortalDataCenterIcon: FC = () => <Icon component={PortalDataCenterSvg} width={16} style={{ fontSize: 16 }} />;
const PortalSettingIcon: FC = () => <Icon component={PortalSettingSvg} width={16} style={{ fontSize: 16 }} />;
const PortalInfoIcon: FC = () => <Icon component={PortalInfoSvg} width={16} style={{ fontSize: 16 }} />;
const PortalDashboardIcon: FC = () => <Icon component={PortalDashboardSvg} width={60} style={{ fontSize: 60 }} />;
const PortalReportIcon: FC = () => <Icon component={PortalReportSvg} width={60} style={{ fontSize: 60 }} />;
const PortalDataModelIcon: FC = () => <Icon component={PortalDataModelSvg} width={60} style={{ fontSize: 60 }} />;
const PortalDatasetIcon: FC = () => <Icon component={PortalDatasetSvg} width={60} style={{ fontSize: 60 }} />;
const PortalDataSourceIcon: FC = () => <Icon component={PortalDataSourceSvg} width={60} style={{ fontSize: 60 }} />;
const PortalTypeDashboardIcon: FC = () => <Icon component={PortalDashboardSvg} width={16} style={{ fontSize: 16 }} />;
const PortalTypeReportIcon: FC = () => <Icon component={PortalReportSvg} width={16} style={{ fontSize: 16 }} />;
const PortalTypeDataModelIcon: FC = () => <Icon component={PortalDataModelSvg} width={16} style={{ fontSize: 16 }} />;
const PortalTypeDatasetIcon: FC = () => <Icon component={PortalDatasetSvg} width={16} style={{ fontSize: 16 }} />;
const PortalTypeDataSourceIcon: FC = () => <Icon component={PortalDataSourceSvg} width={16} style={{ fontSize: 16 }} />;

export {
  HeaderCaseIcon,
  HeaderContactIcon,
  HeaderDownloadIcon,
  HeaderTryOutIcon,

  HomeIcon,
  DashboardIcon,
  ChartIcon,
  DashboardDesignerIcon,
  ReportDesignerIcon,
  PortalIcon,
  LayoutIcon,
  ThemeIcon,
  ViewIcon,
  IframeIcon,
  DivIcon,
  ApiIcon,
  UserIcon,
  MobileIcon,
  OemIcon,
  LanguageIcon,
  PluginIcon,

  CustomDesignerMenuIcon,
  CustomDesignerPreviewIcon,
  CustomDesignerSaveIcon,
  CustomDesignerInspectorIcon,
  CustomDesignerDataBindingIcon,
  ChangeDataIcon,
  CustomDesignerSettingIcon,
  AdvancedChartIcon,
  BasicChartIcon,
  FilterChartIcon,
  ContainerChartIcon,
  ColumnChartIcon,
  LineChartIcon,
  StackedAreaChartIcon,
  FilledRadarChartIcon,
  BarChartIcon,
  BarInPolarChartIcon,
  PieChartIcon,
  BubbleChartIcon,
  PivotTableIcon,
  TreeMapChartIcon,
  ThreeDBarChartIcon,
  ThreeDPieChartIcon,
  ThreeDColumnChartIcon,
  ThreeDEarthMapChartIcon,
  ThreeDFunnelChartIcon,
  ThreeDPyramidChartIcon,
  ThreeDWorldCloudChartIcon,
  ThreeDBaiduMapChartIcon,
  MultiDimensionalSlicerIcon,
  DateRangeSlicerIcon,
  MultiDimensionalDropdownSlicerIcon,
  ContainerIcon,
  TabContainerIcon,
  DatasetItemIcon,

  CardSceneIcon,
  CardSolutionIcon,
  CardExtensionIcon,
  CardDashboardIcon,

  SceneHeaderAppIcon,
  SceneHeaderHelpIcon,
  SceneHeaderNoticeIcon,
  SceneHeaderUserIcon,

  PortalFullScreenIcon,
  PortalFullScreenRestoreIcon,
  PortalHomeIcon,
  PortalKanbanIcon,
  PortalCustomerIcon,
  PortalContractIcon,
  PortalOpportunityIcon,
  PortalDataCenterIcon,
  PortalSettingIcon,
  PortalInfoIcon,
  PortalDashboardIcon,
  PortalReportIcon,
  PortalDataModelIcon,
  PortalDatasetIcon,
  PortalDataSourceIcon,
  PortalTypeDashboardIcon,
  PortalTypeReportIcon,
  PortalTypeDataModelIcon,
  PortalTypeDatasetIcon,
  PortalTypeDataSourceIcon,
};

