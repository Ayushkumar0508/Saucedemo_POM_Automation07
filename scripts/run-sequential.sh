#!/bin/bash
set -e
cd "$(dirname \"$0\")/.."
echo "[SEQUENTIAL EXECUTION] Ensure dependencies and browsers are installed."
npm install
npx playwright install
npm run test:sequential
