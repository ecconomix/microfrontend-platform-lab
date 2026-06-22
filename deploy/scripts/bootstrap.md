# Server Bootstrap Guide

This document describes how to prepare a brand-new server for the Microfrontend Platform deployment.

The goal is to transform a fresh Ubuntu VM into a deployment-ready environment capable of running Dockerized applications from GHCR.

---

# VM Requirements

Minimum requirements:

- Ubuntu 24.04+ LTS
- 1 vCPU
- 1 GB RAM
- 10 GB disk

Current environment:

- Google Cloud e2-micro
- Ubuntu 26.04 LTS

---

# Initial Server Access

Connect to the server:

```bash
ssh <user>@<server-ip>
```

Update packages:

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Install Docker

Install Docker Engine:

```bash
sudo apt install docker.io -y
```

Start Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Add current user to Docker group:

```bash
sudo usermod -aG docker $USER
```

Reconnect to the server after running the command.

Verify:

```bash
docker version
```

---

# Install Docker Compose Plugin

Install:

    sudo apt install docker-compose-plugin -y

Verify:

    docker compose version

Expected:

```txt
Docker Compose version v2.x.x
```

---

# Verify Docker Installation

```bash
docker ps
docker compose version
```

---

# Create Deployment Folder

```bash
mkdir -p ~/microfrontend-platform-lab
cd ~/microfrontend-platform-lab
```

---

# Copy Deployment Files

Copy deployment files from repository:

```txt
deploy/
```

Required files:

```txt
docker-compose.yml
nginx.conf
README.MD
.env.example
scripts/
```

---

# Create Environment File

```bash
cp .env.example .env
nano .env
```

---

# Login to GHCR

The VM never builds source code.

The VM only pulls prebuilt images from GHCR.

Login:

```bash
docker login ghcr.io
```

Verify:

```bash
docker pull ghcr.io/ecconomix/microfrontend-platform-lab-shell:latest
```

---

# Make Scripts Executable

```bash
chmod +x scripts/*.sh
```

---

# Deploy Applications

```bash
./scripts/deploy.sh
```

Deployment performs:

1. Pull images
2. Start containers
3. Reload nginx
4. Run health checks
5. Save deployment metadata

---

# Configure Certificate Renewal

Open cron:

```bash
crontab -e
```

Example:

```cron
0 3 * * * /home/<user>/microfrontend-platform-lab/scripts/renew-certificates.sh >> /home/<user>/microfrontend-platform-lab/renew-certificates.log 2>&1
```

---

# Verification

Check deployment:

```bash
./scripts/status.sh
```

Verify routes:

```txt
/
/dashboard/
/settings/
```

Verify versions:

```bash
./scripts/current-version.sh
```

Verify containers:

```bash
docker ps
```

---

# Restore Existing Deployment

If migrating to a new VM, follow the "Restore process" section in:

    deploy/README.MD

to restore:

- .env
- certbot/conf
- deployment metadata

from backup archives.

---

# Operational Commands

Deploy:

```bash
./scripts/deploy.sh
```

Status:

```bash
./scripts/status.sh
```

Logs:

```bash
./scripts/logs.sh
```

Reload nginx:

```bash
./scripts/reload-nginx.sh
```

Rollback:

```bash
./scripts/rollback.sh
```

Backup:

```bash
./scripts/backup.sh
```

Renew certificates:

```bash
./scripts/renew-certificates.sh
```
