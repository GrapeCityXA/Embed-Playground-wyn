# **Wyn 嵌入式 BI 分析体验**

嵌入式分析将为您的应用软件提供数据见解、可视化和所有分析BI工具所需提供的能力！在这里您将体验到 Wyn 商业智能的嵌入式分析的强大功能，探索适合您的嵌入式 BI 分析方案！

使用 Wyn 商业智能嵌入式 BI 分析体验工具源码！

功能在线地址：

[http://wyn.grapecity.com.cn/playground/index.html](http://wyn.grapecity.com.cn/playground/index.html)

## **Wyn 嵌入式 BI 功能介绍**

---

**嵌入式 BI 场景体验**

1. 仪表板嵌入
2. 图表嵌入
3. 仪表板设计器嵌入
    - 自定义设计器嵌入
    - 原生设计器嵌入
4. 报表设计器嵌入
5. 自定义门户
6. 仪表板重新布局
7. 切换主题
8. 切换展示视图

**BI 嵌入式 方案体验**

1. iFrame集成
2. Div 集成
3. REST API 集成
4. 用户身份集成
5. 移动端集成
6. OEM 白标集成

**自定义系统扩展**

1. 国际化
2. 插件开发

## **运行指南：**

---

下载该示例后，请按照如下步骤操作

### 1. 修改配置

---

您需要在 /config/env.js 文件中将 WYN_HOST(WYN_INTERFACE_HOST) 以及 WYN_TOKEN(WYN_INTERFACE_TOKEN) 修改为您安装的 Wyn 服务器生成的 Token 以及 Host 地址。

示例配置（此配置为当前官网上部署的站点的配置）：

```jsx
{
    WYN_HOST: 'https://wynwx.grapecity.com.cn/wyn',
    WYN_TOKEN: '为您Wyn 部署的服务器上生成的token',
    WYN_INTERFACE_HOST: 'https://wynwx.grapecity.com.cn/wyn',
    WYN_INTERFACE_TOKEN: '为您Wyn 部署的服务器上生成的token',
}
```

### 2. 安装依赖包并执行

---

**安装依赖包**

在项目根目录下执行 `npm install`  or  `yarn`

**本地开发环境**

在项目根目录下执行  `npm start` ，可在浏览器中打开 `localhost:3000` 查看具体效果。

**打包部署**

<aside>

💡 此项目部署时，需提前更改以下配置

1. 如果此项目需要部署的地址存在子路径，那么需要更改 package.json 文件中的 homepage 和 env.js 文件中的 WYN_HOME_PAGE 为您的子路径。
2. 根据 src/common/utils/utils.ts 中的注释修改对应代码。
3. 将 env.js 文件中的 USE_CUSTOM_THEME 改为 false。

</aside> 

在项目根目录下执行  `npm run build` ，生成的 build 文件夹即为打包好的资源，您可选择自己的服务器进行部署。
