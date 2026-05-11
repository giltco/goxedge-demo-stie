# GoxEDGE Book Companion Site

《GoxEDGE 全球拓展卓越实践》出版配套资源站。

## 站点定位

GoxEDGE.com 是《GoxEDGE 全球拓展卓越实践》的出版配套资源站，面向读者、企业管理者、出海从业者和合作机构，提供模型说明、章节导读、配套工具、案例场景、术语解释和方法更新。

## 页面结构

- `/index.html` 首页
- `/book/` 图书介绍
- `/model/` GoxEDGE 模型
- `/tools/` 配套工具
- `/tools/readiness-check/` 出海准备度自测表
- `/tools/market-selection/` 目标市场选择矩阵
- `/tools/action-plan/` 90 天行动计划模板
- `/chapters/` 章节导读
- `/cases/` 案例与场景
- `/resources/` 延伸资源
- `/updates/` 更新公告
- `/about/` 作者与项目
- `/contact/` 联系与合作
- `/privacy/` 隐私政策
- `/terms/` 使用条款
- `/sitemap/` 站点地图

## GitHub Pages 发布

1. 将本包内容上传到 GitHub 仓库根目录。
2. 在仓库设置中启用 GitHub Pages，Source 选择 `Deploy from a branch`，目录选择根目录。
3. 如使用自定义域名，保留根目录下的 `CNAME` 文件；当前配置为 `goxedge.com`。
4. 如果暂时不用自定义域名，可以删除 `CNAME` 文件。

## 技术说明

- 纯静态 HTML / CSS / JS。
- 无外部依赖。
- 已包含 `.nojekyll`，适配 GitHub Pages。
- 已包含 `robots.txt` 和 `sitemap.xml`。
