<div align="center">

# 🌐 0rhxPlayer Website

### Official website of 0rhxPlayer

[🌐 Live Site](https://0rhxplayer.rincynar.top)

**English** | [简体中文](README_zh.md)

</div>

---

## About

This repository hosts the **official website** of [0rhxPlayer](https://0rhxplayer.rincynar.top) — a lightweight, modern Material 3 local music player for desktop.

The site is a fully self-contained static landing page, deployed to GitHub Pages from the [`docs/`](docs/) directory.

## Repository Layout

```
docs/
├── index.html                  # Landing page (trilingual: en/zh/ja, inline styles & SVG)
├── icon.png                    # App icon (favicon)
├── latest.json                 # Latest release metadata consumed by the page
├── CNAME                       # Custom domain (0rhxplayer.rincynar.top)
└── screenshots/                # Application preview screenshots (Desktop & VSCode)
scripts/
└── update-latest-release.mjs   # Release metadata fetcher and updater script
.github/workflows/
├── pages.yml                   # GitHub Pages deployment workflow
└── update-release.yml          # Automated release metadata synchronization workflow
```

## Deployment & Automation

- **Pages Deployment**: Every push to `main` that touches `docs/**` triggers `.github/workflows/pages.yml`, publishing the `docs/` directory to the custom domain.
- **Automated Release Sync**: `.github/workflows/update-release.yml` periodically queries releases from `RinCynar/0rhxPlayer-Desktop` and updates `docs/latest.json`, keeping download links and version badges up to date automatically.

---

Copyright © 2026 [RinCynar](https://github.com/RinCynar)
