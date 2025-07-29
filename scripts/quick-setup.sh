#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[QUICK SETUP] Installing dependencies and browsers..."
npm install
npx playwright install
chmod +x scripts/*.sh
npm run test:parallel || {
  echo '[ERROR] Tests failed in parallel mode'; exit 1;
}
npm run open:report
