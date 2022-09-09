# Wyn 嵌入式 BI 分析体验
嵌入式分析将为您的应用软件提供数据见解、可视化和所有分析BI工具所需提供的能力！在这里您将体验到 Wyn 商业智能的嵌入式分析的强大功能，探索适合您的嵌入式 BI 分析方案！

## Wyn 嵌入式 BI 功能介绍
使用 Wyn 商业智能嵌入式 BI 分析体验工具源码！
功能在线地址：http://wyn.grapecity.com.cn/playground/index.html

包含的功能：
嵌入式 BI 场景体验
1. 仪表板嵌入
2. 图表嵌入
3. 设计器嵌入
4. 仪表板重新布局
5. 切换主题
6. 切换展示视图

BI 嵌入式 方案体验
1. iFrame集成
2. Div 集成
3. REST API 集成
4. 用户身份集成
5. 移动端集成
6. OEM 白标集成

自定义系统扩展
1. 国际化
2. 插件开发

## 下载该示例后，运行指南：


部署步骤：
1.	修改配置

您需要修改此文件中的配置才可以在本地部署。


 ![图片(C:/Users/LenkaGuo/Desktop/Picture1.png)
 需要将 WynHost 以及 WynToken 修改为您安装的Wyn 服务器生成的Token 以及Host地址

示例配置（此配置为当前官网上部署的站点的配置）：
```
module.exports = {
    WynHost: "http://wynwx.grapecity.com.cn/wyn",
    WynToken: "为您Wyn 部署的服务器上生成的token",

    WynInterfaceHost: "http://wynwx.grapecity.com.cn/wyn",
    WynInterfaceToken: "为您Wyn 部署的服务器上生成的token",
}

```
修改完成后，执行以下命令

2.	按照如下的命令顺序执行


# 安装包

Run `npm install`

在 `src` 路径下编辑源码. 

Run `npm run build`

在 `dist` 目录下将生成站点


Run `npm run start`

 `dist` 文件夹会作为静态文件为站点提供服务。

查看和编译项目：
Run  `npm run watch-build`