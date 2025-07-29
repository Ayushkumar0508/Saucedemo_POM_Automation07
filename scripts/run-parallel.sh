#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[PARALLEL EXECUTION] Ensure dependencies and browsers are installed."
npm install
npx playwright install
npm run test:parallel
