#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[VALIDATE] Checking project setup and test discovery..."
npm ls @playwright/test || npm install @playwright/test
npx playwright install || true
npx playwright test --list || { echo '[ERROR] Test discovery failed.'; exit 1; }
echo '[SUCCESS] All tests discovered and setup validated.'
