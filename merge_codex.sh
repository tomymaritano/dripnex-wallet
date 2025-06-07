#!/bin/bash

# Lista ordenada de ramas
branches=(
  "codex/move-and-rename-wallet-components"
  "codex/add-security-headers-to-next.config.ts"
  "codex/replace-regex-with-zod-schemas-for-address-and-email"
  "codex/add-token-selector-and-balances"
  "codex/update-profile-to-store-multiple-wallets"
  "codex/create-dockerfile-and-docker-compose.yml"
  "codex/set-up-playwright-and-tests"
  "codex/update-github-workflow-for-linting,-build,-and-test"
  "codex/update-readme.md-and-add-contributing.md"
)

for branch in "${branches[@]}"; do
  echo "---------------------------------------------"
  echo "➡️ Merging $branch"
  echo "---------------------------------------------"

  temp_branch="temp_${branch//\//_}"

  git checkout -b "$temp_branch" "origin/$branch" || exit 1
  git checkout main
  git pull origin main
  git merge --no-ff --no-edit "$temp_branch" || {
    echo "⚠️ Conflicts detected. Resolve manually and continue."
    exit 1
  }
  git push origin main
  git branch -d "$temp_branch"
done

echo "✅ All branches merged!"