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
├── index.html      # Landing page (bilingual, inline styles & SVG)
├── info-pic/       # Screenshot assets
├── icon.png        # App icon (favicon)
├── latest.json     # Latest release metadata consumed by the page
└── CNAME           # Custom domain (0rhxplayer.rincynar.top)
.github/workflows/
└── pages.yml       # GitHub Pages deployment workflow
```

## Deployment

Every push to `main` that touches `docs/**` triggers the GitHub Actions workflow (`.github/workflows/pages.yml`), which publishes the `docs/` directory to the custom domain.

---

Copyright © 2026 [RinCynar](https://github.com/RinCynar)
