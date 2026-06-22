#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

PREVIOUS_DEPLOYED_TAG_FILE=".previous-image-tag"

if [ ! -f "$PREVIOUS_DEPLOYED_TAG_FILE" ]; then
  echo "Error: no previous image tag found."
  echo
  echo "Rollback is only available after at least two deployments."
  exit 1
fi

PREVIOUS_TAG="$(cat "$PREVIOUS_DEPLOYED_TAG_FILE")"

if [ -z "$PREVIOUS_TAG" ]; then
  echo "Error: previous image tag file is empty."
  exit 1
fi

echo "Rolling back to image tag: ${PREVIOUS_TAG}"
echo

./scripts/set-version.sh "$PREVIOUS_TAG"
./scripts/deploy.sh

echo
echo "Rollback completed."
