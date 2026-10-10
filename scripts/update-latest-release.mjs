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
  let exeUrl = '';
  let zipUrl = '';

  for (const asset of assets) {
    const assetName = asset.name || '';
    const downloadUrl = asset.browser_download_url || asset.url || '';
    if (assetName.endsWith('.exe')) {
      exeUrl = downloadUrl;
    } else if (assetName.endsWith('.zip')) {
      zipUrl = downloadUrl;
    }
  }

  // Fallback to standard release naming pattern if asset download URLs are empty
  if (!exeUrl) {
    exeUrl = `https://github.com/RinCynar/0rhxPlayer-Desktop/releases/download/${tagName}/0rhxPlayer-${tagName}-windows-x64-setup.exe`;
  }
  if (!zipUrl) {
    zipUrl = `https://github.com/RinCynar/0rhxPlayer-Desktop/releases/download/${tagName}/0rhxPlayer-${tagName}-windows-x64-portable.zip`;
  }

  const newData = {
    version,
    tag: tagName,
    name,
    releaseDate,
    htmlUrl,
    downloads: {
      windows_x64_exe: exeUrl,
      windows_x64_zip: zipUrl
    }
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
