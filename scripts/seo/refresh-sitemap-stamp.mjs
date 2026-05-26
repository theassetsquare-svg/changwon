#!/usr/bin/env node
// 매일 sitemap에 사용되는 빌드 스탬프를 갱신해 lastmod가 자동으로 새 날짜를 반영하게 한다.
// 빌드 시점이 곧 lastmod이므로, 매일 commit & 재배포로 sitemap이 갱신된다.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STAMP_FILE = path.resolve(__dirname, "../../app/.last-sync");

const now = new Date();
const stamp = now.toISOString();
fs.writeFileSync(STAMP_FILE, stamp + "\n");
console.log(`[refresh-sitemap-stamp] ${stamp} → ${path.relative(process.cwd(), STAMP_FILE)}`);
