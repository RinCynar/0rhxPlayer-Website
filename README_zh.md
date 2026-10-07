<div align="center">

# 🌐 0rhxPlayer Website

### 0rhxPlayer 官方网站

[🌐 访问站点](https://0rhxplayer.rincynar.top)

[English](README.md) | **简体中文**

</div>

---

## 关于

本仓库托管 [0rhxPlayer](https://0rhxplayer.rincynar.top) 的**官方网站**——0rhxPlayer 是一款轻量、现代、遵循 Material 3 设计的桌面本地音乐播放器。

站点为完全自包含的静态落地页,由 [`docs/`](docs/) 目录部署至 GitHub Pages。

## 仓库结构

```
docs/
├── index.html      # 落地页(双语,内联样式与 SVG)
├── info-pic/       # 截图资源
├── icon.png        # 应用图标(favicon)
├── latest.json     # 页面消费的最新版本元数据
└── CNAME           # 自定义域名(0rhxplayer.rincynar.top)
.github/workflows/
└── pages.yml       # GitHub Pages 部署工作流
```

## 部署

每次推送到 `main` 且涉及 `docs/**` 的变更,都会触发 GitHub Actions 工作流(`.github/workflows/pages.yml`),将 `docs/` 目录发布到自定义域名。

---

Copyright © 2026 [RinCynar](https://github.com/RinCynar)
