#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

if [ "$#" -ne 1 ]; then
  echo "Usage: ./scripts/set-version.sh <image-tag>"
  echo
  echo "Example:"
  echo "  ./scripts/set-version.sh latest"
  echo "  ./scripts/set-version.sh 4f2a9c1"
  exit 1
fi

NEW_TAG="$1"

if [ ! -f .env ]; then
  echo "Error: .env file not found."
  exit 1
fi

if grep -q '^IMAGE_TAG=' .env; then
  sed -i.bak "s/^IMAGE_TAG=.*/IMAGE_TAG=${NEW_TAG}/" .env
else
  echo "IMAGE_TAG=${NEW_TAG}" >> .env
fi

echo "Updated IMAGE_TAG to: ${NEW_TAG}"
echo
echo "Previous .env backup saved as: .env.bak"
