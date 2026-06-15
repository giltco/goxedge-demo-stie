# GoxEDGE 出海战略书籍配套站

goxedge.com 是 **《出海战略：从走出去到走下去》** 的官方书籍配套站。

## GoxEDGE 角色

- 书籍配套站：图书介绍与出版信息
- 模型说明站：GoxEDGE 全球拓展战略模型解读
- 章节导读站：按章节进入阅读与问题定位
- 读者资源站：配套资料、辅助内容与后续更新说明
- 转化桥梁：将高意向读者与企业用户自然导向 GoxGlobe 企业服务站

GoxEDGE 不是企业咨询服务主站，也不是 SaaS 产品站或通用咨询落地页。

## GoxGlobe 角色

[GoxGlobe 企业服务站](https://goxglobe.com) 面向企业服务场景，把书中方法与 GoxEDGE 模型转化为：

- 出海战略诊断
- 路径共创
- 组织承接
- 阶段复盘
- 企业共读与管理层工作坊

**关系简述：** GoxEDGE 负责把读者带进方法体系；GoxGlobe 负责把方法体系带进企业现场。

## 页面结构

- `/index.html` 首页（读者路径入口）
- `/book/` 图书介绍
- `/model/` GoxEDGE 全球拓展战略模型
- `/chapters/` 章节导读
- `/resources/` 配套资源
- `/contact/` 企业共读与联系合作
- `/about/` 关于 GoxEDGE
- `/updates/` Minvista 后续观察与内容更新
- `/purchase/` 购买与获取
- `/privacy/`、`/terms/`、`/sitemap/` 说明页

## 品牌资产

- 站点 Logo / Favicon：`assets/img/brand/goxedge-logo.png`
- 页头品牌文案：GoxEDGE 出海战略 / 中企出海从走出去到走下去

## 联系方式

- 合作咨询：[400-600-2950](tel:400-600-2950)
- 联系邮箱：[info@goxedge.com](mailto:info@goxedge.com)

## 配置

- `assets/js/book-config.js` — 书名、作者、出版社、购买链接、Minvista
- `assets/js/site-config.js` — `launchPhase` 与页面可见性开关

## 发布

纯静态 HTML / CSS / JS，无构建步骤、无 `package.json`。

GitHub Pages：将仓库根目录部署为站点源，自定义域名使用根目录 `CNAME`（当前为 `goxedge.com`）。
