import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const latestJsonPath = path.resolve(__dirname, '../docs/latest.json');

async function getReleaseData() {
  const isStdin = process.argv.includes('--stdin');
  if (isStdin) {
    const stdin = fs.readFileSync(0, 'utf-8');
    return JSON.parse(stdin);
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': '0rhxPlayer-Website-Release-Updater'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('https://api.github.com/repos/RinCynar/0rhxPlayer-Desktop/releases/latest', { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch release: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

async function main() {
  const release = await getReleaseData();

  const tagName = release.tag_name || release.tagName;
  if (!tagName) {
    throw new Error('No tag_name or tagName found in release payload');
  }

  const version = tagName.replace(/^v/, '');
  const name = release.name || `0rhxPlayer ${tagName}`;
  const releaseDate = (release.published_at || release.publishedAt || '').split('T')[0];
  const htmlUrl = release.html_url || release.url || `https://github.com/RinCynar/0rhxPlayer-Desktop/releases/tag/${tagName}`;

  const assets = release.assets || [];
  const downloads = {
    windows_x64_exe: '',
    windows_x64_zip: '',
    windows_arm64_exe: '',
    windows_arm64_zip: '',
    linux_x64_appimage: '',
    linux_x64_tar: '',
    linux_arm64_appimage: '',
    linux_arm64_tar: ''
  };

  for (const asset of assets) {
    const assetName = (asset.name || '').toLowerCase();
    const downloadUrl = asset.browser_download_url || asset.url || '';
    if (!downloadUrl) continue;

    if (assetName.includes('windows') || assetName.includes('win')) {
      if (assetName.includes('arm64')) {
        if (assetName.endsWith('.exe')) downloads.windows_arm64_exe = downloadUrl;
        else if (assetName.endsWith('.zip')) downloads.windows_arm64_zip = downloadUrl;
      } else {
        if (assetName.endsWith('.exe')) downloads.windows_x64_exe = downloadUrl;
        else if (assetName.endsWith('.zip')) downloads.windows_x64_zip = downloadUrl;
      }
    } else if (assetName.includes('linux')) {
      if (assetName.includes('arm64')) {
        if (assetName.endsWith('.appimage')) downloads.linux_arm64_appimage = downloadUrl;
        else if (assetName.endsWith('.tar.gz') || assetName.endsWith('.tgz')) downloads.linux_arm64_tar = downloadUrl;
      } else {
        if (assetName.endsWith('.appimage')) downloads.linux_x64_appimage = downloadUrl;
        else if (assetName.endsWith('.tar.gz') || assetName.endsWith('.tgz')) downloads.linux_x64_tar = downloadUrl;
      }
    }
  }

  // Fallback to standard release naming pattern if asset download URLs are empty
  const base = `https://github.com/RinCynar/0rhxPlayer-Desktop/releases/download/${tagName}`;
  if (!downloads.windows_x64_exe) downloads.windows_x64_exe = `${base}/0rhxPlayer-${tagName}-windows-x64-setup.exe`;
  if (!downloads.windows_x64_zip) downloads.windows_x64_zip = `${base}/0rhxPlayer-${tagName}-windows-x64-portable.zip`;
  if (!downloads.windows_arm64_exe) downloads.windows_arm64_exe = `${base}/0rhxPlayer-${tagName}-windows-arm64-setup.exe`;
  if (!downloads.windows_arm64_zip) downloads.windows_arm64_zip = `${base}/0rhxPlayer-${tagName}-windows-arm64-portable.zip`;
  if (!downloads.linux_x64_appimage) downloads.linux_x64_appimage = `${base}/0rhxPlayer-${tagName}-linux-x64.AppImage`;
  if (!downloads.linux_x64_tar) downloads.linux_x64_tar = `${base}/0rhxPlayer-${tagName}-linux-x64-portable.tar.gz`;
  if (!downloads.linux_arm64_appimage) downloads.linux_arm64_appimage = `${base}/0rhxPlayer-${tagName}-linux-arm64.AppImage`;
  if (!downloads.linux_arm64_tar) downloads.linux_arm64_tar = `${base}/0rhxPlayer-${tagName}-linux-arm64-portable.tar.gz`;

  const newData = {
    version,
    tag: tagName,
    name,
    releaseDate,
    htmlUrl,
    downloads
  };

  const newContent = JSON.stringify(newData, null, 2) + '\n';

  let currentContent = '';
  if (fs.existsSync(latestJsonPath)) {
    currentContent = fs.readFileSync(latestJsonPath, 'utf-8');
  }

  if (currentContent === newContent) {
    console.log(`[Release Updater] docs/latest.json is already up to date (${tagName}).`);
    process.exit(0);
  }

  fs.writeFileSync(latestJsonPath, newContent, 'utf-8');
  console.log(`[Release Updater] Successfully updated docs/latest.json to ${tagName} (${releaseDate}).`);
}

main().catch(err => {
  console.error('[Release Updater Error]', err);
  process.exit(1);
});
