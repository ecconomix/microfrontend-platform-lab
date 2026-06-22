#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

SERVICE="${1:-reverse-proxy}"

echo "Showing logs for service: ${SERVICE}"
echo

docker compose logs -f --tail=100 "$SERVICE"
