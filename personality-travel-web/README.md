# 性格之旅 · GitHub Pages Web 版

一个可直接部署到 GitHub Pages 的 React + Vite 单页网站原型，依据产品需求文档实现：
- 首页与热门目的地卡片
- 15 道性格偏好测试题、进度显示、结果页
- 根据答题偏好生成简化旅行人格与目的地匹配
- 目的地详情与个性化旅行建议
- 收藏夹（保存在当前浏览器 localStorage）
- 响应式布局，适配手机与桌面
- 不需要后端、数据库或 API 密钥

> 说明：人格标签与匹配分数是产品原型的娱乐性参考，不是心理学诊断。当前数据为前端示例数据；收藏只保存在当前浏览器中。

## 本地运行

需要安装 Node.js 18 或更新版本。

```bash
npm install
npm run dev
```

按终端提示打开本地地址。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `personality-travel-web`。
2. 将本项目全部文件上传到仓库根目录（不要只上传 `src`）。
3. 打开仓库 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **GitHub Actions**。
5. 本项目已包含 `.github/workflows/deploy.yml`，推送到 `main` 分支后会自动构建并发布。
6. 等待仓库 **Actions** 中的部署任务完成，再从 **Settings → Pages** 打开网站地址。

如果你的默认分支不是 `main`，请修改 workflow 中的分支名称。

## 主要目录

```text
src/
  main.jsx       页面、问卷、推荐算法与交互
  styles.css     响应式样式
.github/
  workflows/
    deploy.yml   GitHub Pages 自动部署
```

## 后续升级建议

要上线真实用户系统、云端同步收藏、AI 自动生成攻略或真实旅游数据，需再接入后端/API；不要把私密 API Key 写在前端代码中。
