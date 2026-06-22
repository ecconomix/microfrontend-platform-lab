#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

IMAGE_TAG="${IMAGE_TAG:-latest}"

echo "Configured image tag: ${IMAGE_TAG}"
echo

echo "Resolved Docker Compose images:"
docker compose config --images
