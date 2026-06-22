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

DOMAIN="${DOMAIN:-microfrontend-platform-lab.duckdns.org}"

check_title() {
  local path="$1"
  local expected_title="$2"
  local url="https://${DOMAIN}${path}"

  if curl -fsSL "$url" | grep -qi "<title>${expected_title}</title>"; then
    echo "OK: ${url} returned ${expected_title}"
  else
    echo "FAILED: ${url} did not return ${expected_title}"
    return 1
  fi
}

echo "Docker Compose status:"
docker compose ps
echo

echo "Running Docker containers:"
docker ps
echo

echo "Public route checks:"

check_title "/" "MFL - Home"
check_title "/dashboard/" "MFL - Dashboard"
check_title "/settings/" "MFL - Settings"
