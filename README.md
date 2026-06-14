# 《出海战略》读者配套资源站

goxedge.com 是 **《出海战略：从走出去到走下去》**（作者：何敏，机械工业出版社）的读者配套资源站。

## 站点定位

本站围绕书中的 **GoxEDGE 全球拓展战略模型**，为读者提供图书介绍、模型说明、章节导读、配套资源说明与 Minvista 读者更新渠道。GoxEDGE 是模型名称，不是书名。

当前阶段：**release-ready**（出版信息、购买链接、下载文件等待正式确认后更新）。

## 页面结构

- `/index.html` 首页
- `/book/` 图书介绍
- `/model/` GoxEDGE 全球拓展战略模型
- `/resources/` 配套资源
- `/chapters/` 章节导读
- `/updates/` Minvista 读者更新
- `/contact/` 读者联系
- `/about/` 关于本书
- `/tools/readiness-check/` 企业全球拓展自测表（说明页）
- `/tools/market-selection/` 目标市场判断模板（说明页）
- `/tools/action-plan/` 行动计划模板（说明页）
- `/privacy/` 隐私说明
- `/terms/` 使用条款
- `/sitemap/` 站点地图

## 配置

- `assets/js/book-config.js` — 书名、作者、出版社、购买链接、Minvista
- `assets/js/site-config.js` — `launchPhase` 与页面可见性开关

## GitHub Pages 发布

1. 将本包内容上传到 GitHub 仓库根目录。
2. 在仓库设置中启用 GitHub Pages，Source 选择 `Deploy from a branch`，目录选择根目录。
3. 自定义域名使用根目录 `CNAME`（当前为 `goxedge.com`）。

## 技术说明

- 纯静态 HTML / CSS / JS，无构建步骤。
- 含 `.nojekyll`、`robots.txt`、`sitemap.xml`。
