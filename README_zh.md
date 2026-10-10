<div align="center">

# 🌐 0rhxPlayer Website

### 0rhxPlayer 官方网站

[🌐 访问站点](https://0rhxplayer.rincynar.top)

[English](README.md) | **简体中文**

</div>

---

## 关于

本仓库托管 [0rhxPlayer](https://0rhxplayer.rincynar.top) 的**官方网站**——0rhxPlayer 是一款轻量、现代、遵循 Material 3 设计的桌面本地音乐播放器。

站点为完全自包含的静态落地页，由 [`docs/`](docs/) 目录部署至 GitHub Pages。

## 仓库结构

```
docs/
├── index.html                  # 落地页（三语支持：en/zh/ja，内联样式与 SVG）
├── icon.png                    # 应用图标（favicon）
├── latest.json                 # 页面消费的最新版本元数据
├── CNAME                       # 自定义域名（0rhxplayer.rincynar.top）
└── screenshots/                # 实机界面预览截图（Desktop 与 VSCode）
scripts/
└── update-latest-release.mjs   # 发版元数据抓取与同步脚本
.github/workflows/
├── pages.yml                   # GitHub Pages 部署工作流
└── update-release.yml          # 桌面端发版自动同步工作流
```

## 部署与自动化

- **Pages 部署**：每次推送到 `main` 且涉及 `docs/**` 的变更，都会触发 GitHub Actions 工作流（`.github/workflows/pages.yml`），将 `docs/` 目录发布到自定义域名。
- **发版自动同步**：`.github/workflows/update-release.yml` 定期轮询 `RinCynar/0rhxPlayer-Desktop` 的最新发布，自动更新 `docs/latest.json`，实现官网下载链接与最新版本的全自动同步。

---

Copyright © 2026 [RinCynar](https://github.com/RinCynar)
