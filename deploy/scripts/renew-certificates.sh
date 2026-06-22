#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

cd "$(dirname "$0")"

docker compose run --rm certbot renew --quiet

docker compose exec reverse-proxy nginx -s reload
