#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

BACKUP_DIR="$HOME/backups/microfrontend-platform-lab"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_FILE="$BACKUP_DIR/deployment-backup-$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "Creating deployment backup..."
echo "Backup file: $BACKUP_FILE"
echo

sudo tar -czf "$BACKUP_FILE" \
  --ignore-failed-read \
  docker-compose.yml \
  nginx.conf \
  README.md \
  .env \
  scripts \
  certbot/conf \
  .current-image-tag \
  .previous-image-tag

echo
echo "Backup completed:"
ls -lh "$BACKUP_FILE"
