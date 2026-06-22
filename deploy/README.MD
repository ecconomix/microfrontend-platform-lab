# microfrontend-platform-lab Deployment

This folder is the deployment/runtime folder for the `microfrontend-platform-lab` project.

It has the same name as the Git repository, but it serves a different purpose.

The Git repository contains source code.

This VM folder contains deployment configuration and operational scripts.

## Architecture

Browser → DuckDNS → Google Cloud VM → nginx reverse proxy → Docker internal network → shell/dashboard/settings

## Public URLs

- https://microfrontend-platform-lab.duckdns.org/
- https://microfrontend-platform-lab.duckdns.org/dashboard/
- https://microfrontend-platform-lab.duckdns.org/settings/

## Folder structure

```txt
.
├── docker-compose.yml
├── nginx.conf
├── .env
├── README.md
├── certbot/
│   ├── www/
│   └── conf/
└── scripts/
    ├── deploy.sh
    ├── status.sh
    ├── logs.sh
    ├── current-version.sh
    ├── set-version.sh
    ├── rollback.sh
    └── renew-certificates.sh
```

## Configuration

Deployment configuration lives in `.env`.

Important values:

```env
DOMAIN=microfrontend-platform-lab.duckdns.org
IMAGE_TAG=latest
```

`IMAGE_TAG` controls which Docker image tag is deployed.

## Deploy

```bash
./scripts/deploy.sh
```

This script:

1. Loads `.env`.
2. Pulls Docker images.
3. Starts containers.
4. Checks public HTTPS endpoints.
5. Saves deployment metadata after successful health checks.

## Check status

```bash
./scripts/status.sh
```

This checks:

- Docker Compose services
- Running Docker containers
- Public HTTPS URLs

## View logs

Default reverse proxy logs:

```bash
./scripts/logs.sh
```

Specific service logs:

```bash
./scripts/logs.sh shell
./scripts/logs.sh dashboard
./scripts/logs.sh settings
./scripts/logs.sh reverse-proxy
```

## Show current configured version

```bash
./scripts/current-version.sh
```

## Change image tag

```bash
./scripts/set-version.sh <image-tag>
```

Example:

```bash
./scripts/set-version.sh latest
```

Future Git SHA example:

```bash
./scripts/set-version.sh abc1234
```

## Rollback

```bash
./scripts/rollback.sh
```

Rollback uses:

```txt
.current-image-tag
.previous-image-tag
```

Rollback only works after at least two successful deployments with different tags.

## Renew certificates

```bash
./scripts/renew-certificates.sh
```

This is also called by cron.

Check cron:

```bash
crontab -l
```

## Backup deployment files

Create a backup archive:

````bash
./scripts/backup.sh

## Important notes

The VM should not build source code.

The VM should only:

* pull images from GHCR
* run containers
* route traffic through nginx
* renew certificates

Do not commit or share:

```txt
certbot/conf/
````

It contains Let’s Encrypt certificates and private keys.
