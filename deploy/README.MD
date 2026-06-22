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

## Restore process

This section describes how to restore the deployment on a new VM.

The source code repository contains safe deployment templates and scripts.

The VM backup contains runtime-only files such as `.env`, Certbot certificates, and deployment metadata.

## Recovery model

There are two sources of recovery data:

* Git repository
* VM backup archive

The Git repository should contain safe reusable files:

* `deploy/docker-compose.yml`
* `deploy/nginx.conf`
* `deploy/README.MD`
* `deploy/.env.example`
* `deploy/scripts/`

The VM backup should contain runtime-only files:

* `.env`
* `certbot/conf/`
* `.current-image-tag`
* `.previous-image-tag`

## Required inputs

Before restoring, you need:

* Access to the Git repository
* Access to GHCR
* Latest deployment backup archive
* Domain pointing to the VM public IP
* Docker installed on the VM
* Docker Compose plugin installed
* cron installed if certificate renewal should be scheduled

## 1. Create deployment folder

On the VM:

```
mkdir -p ~/microfrontend-platform-lab
cd ~/microfrontend-platform-lab
```

## 2. Copy safe deployment files from Git

From the repository, copy the contents of:

```
deploy/
```

into:

```
~/microfrontend-platform-lab/
```

The VM folder should contain:

```
docker-compose.yml
nginx.conf
README.MD
.env.example
scripts/
```

## 3. Restore runtime files from backup

Copy the backup archive to the VM.

Example:

```
scp deployment-backup-YYYYMMDD-HHMMSS.tar.gz <vm-user>@<vm-ip>:~/
```

Extract it into the deployment folder:

```
cd ~/microfrontend-platform-lab
tar -xzf ~/deployment-backup-YYYYMMDD-HHMMSS.tar.gz
```

The restored files may include:

```
.env
certbot/conf/
.current-image-tag
.previous-image-tag
```

If no backup is available, create `.env` manually from `.env.example`:

```
cp .env.example .env
nano .env
```

## 4. Verify required files

Check the deployment folder:

```
ls -la
```

Check scripts:

```
ls -la scripts
```

Check Certbot files:

```
ls -la certbot/conf
```

Check environment config:

```
cat .env
```

Important:

Do not print or share certificate private keys.

## 5. Make scripts executable

```
chmod +x scripts/*.sh
```

## 6. Login to GHCR

If the images are private, login to GitHub Container Registry:

```
docker login ghcr.io
```

Use a GitHub token with permission to pull packages.

## 7. Start deployment

```
./scripts/deploy.sh
```

This should:

1. Load `.env`
2. Pull images from GHCR
3. Start containers
4. Reload nginx
5. Verify routes

## 8. Verify deployment status

```
./scripts/status.sh
```

Expected routes:

```
/           -> shell
/dashboard/ -> dashboard
/settings/  -> settings
```

## 9. Restore cron renewal

Check current cron:

```
crontab -l
```

If needed, add certificate renewal again:

```
crontab -e
```

Example cron entry:

```
0 3 * * * /home/<vm-user>/microfrontend-platform-lab/scripts/renew-certificates.sh >> /home/<vm-user>/microfrontend-platform-lab/renew-certificates.log 2>&1
```

Replace `<vm-user>` with the real VM username.

## 10. Verify HTTPS

Check response headers:

```
curl -I https://microfrontend-platform-lab.duckdns.org/
curl -I https://microfrontend-platform-lab.duckdns.org/dashboard/
curl -I https://microfrontend-platform-lab.duckdns.org/settings/
```

Check correct app content:

```
curl -fsSL https://microfrontend-platform-lab.duckdns.org/ | grep -i '<title>'
curl -fsSL https://microfrontend-platform-lab.duckdns.org/dashboard/ | grep -i '<title>'
curl -fsSL https://microfrontend-platform-lab.duckdns.org/settings/ | grep -i '<title>'
```

Expected output:

```
<title>shell</title>
<title>dashboard</title>
<title>settings</title>
```

## Notes

The VM should not build source code.

The VM should only:

* pull images from GHCR
* run Docker Compose
* route traffic through nginx
* renew certificates with Certbot

If Certbot files are not restored, certificates can be reissued.

Avoid repeated Certbot issuance or dry-run attempts because Let’s Encrypt has rate limits.


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
