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
IMAGE_TAG="${IMAGE_TAG:-latest}"

CURRENT_DEPLOYED_TAG_FILE=".current-image-tag"
PREVIOUS_DEPLOYED_TAG_FILE=".previous-image-tag"

check_title() {
  local path="$1"
  local expected_title="$2"
  local url="https://${DOMAIN}${path}"

  echo "Checking ${url} expects title: ${expected_title}"

  curl -fsSL "$url" | grep -qi "<title>${expected_title}</title>"

  echo "OK: ${path} returned ${expected_title}"
}

echo "Starting deployment..."
echo "Deploying image tag: ${IMAGE_TAG}"
echo "Domain: ${DOMAIN}"
echo

echo "Pulling Docker images..."
docker compose pull
echo

echo "Starting containers..."
docker compose up -d
echo

echo "Testing nginx configuration..."
docker compose exec reverse-proxy nginx -t
echo

echo "Reloading nginx..."
docker compose exec reverse-proxy nginx -s reload
echo

echo "Container status:"
docker compose ps
echo

echo "Checking public routes..."

check_title "/" "shell"
check_title "/dashboard/" "dashboard"
check_title "/settings/" "settings"

echo
echo "Health checks passed."

if [ -f "$CURRENT_DEPLOYED_TAG_FILE" ]; then
  CURRENT_DEPLOYED_TAG="$(cat "$CURRENT_DEPLOYED_TAG_FILE")"

  if [ "$CURRENT_DEPLOYED_TAG" != "$IMAGE_TAG" ]; then
    echo "$CURRENT_DEPLOYED_TAG" > "$PREVIOUS_DEPLOYED_TAG_FILE"
    echo "Previous image tag saved: ${CURRENT_DEPLOYED_TAG}"
  else
    echo "Image tag unchanged. Previous tag was not updated."
  fi
fi

echo "$IMAGE_TAG" > "$CURRENT_DEPLOYED_TAG_FILE"
echo "Current image tag saved: ${IMAGE_TAG}"

echo
echo "Deployment completed successfully."
