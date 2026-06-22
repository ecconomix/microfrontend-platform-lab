#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "Testing nginx configuration..."
docker compose exec reverse-proxy nginx -t

echo "Reloading nginx..."
docker compose exec reverse-proxy nginx -s reload

echo "nginx reloaded successfully."
