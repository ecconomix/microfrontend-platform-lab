# Infrastructure Architecture

This document describes the infrastructure architecture of the Microfrontend Platform deployment.

---

# High-Level Architecture

```txt
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
GitHub Container Registry (GHCR)
    │
    ▼
Google Cloud VM
    │
    ▼
Docker Compose
    │
    ▼
nginx Reverse Proxy
    │
    ▼
Docker Network
 ┌─────────────┬─────────────┬─────────────┐
 ▼             ▼             ▼
shell      dashboard      settings
```

---

# Deployment Flow

## Build Phase

Developer pushes code:

```txt
Git Push
```

GitHub Actions:

1. Build applications
2. Build Docker images
3. Push images to GHCR

Produced images:

```txt
ghcr.io/ecconomix/microfrontend-platform-lab-shell
ghcr.io/ecconomix/microfrontend-platform-lab-dashboard
ghcr.io/ecconomix/microfrontend-platform-lab-settings
```

---

## Deployment Phase

Deployment server:

```txt
Google Cloud VM
```

The VM:

- Pulls images from GHCR
- Runs containers using Docker Compose
- Does not build source code

Deployment command:

```bash
./scripts/deploy.sh
```

---

# Public Traffic Flow

```txt
Browser
    │
    ▼
DuckDNS
    │
    ▼
Public IP
    │
    ▼
Google Cloud VM
    │
    ▼
nginx
```

---

# Reverse Proxy Routing

```txt
/            -> shell
/dashboard/  -> dashboard
/settings/   -> settings
```

nginx forwards requests to internal Docker services.

---

# Internal Docker Network

```txt
nginx
  │
  ├── shell:80
  ├── dashboard:80
  └── settings:80
```

Services are not exposed publicly.

Only nginx exposes:

```txt
80
443
```

---

# HTTPS

Certificates are provided by:

```txt
Let's Encrypt
```

Managed by:

```txt
Certbot
```

Renewal:

```txt
cron
    │
    ▼
renew-certificates.sh
```

---

# Deployment Configuration

Configuration source:

```txt
.env
```

Important values:

```txt
DOMAIN
IMAGE_TAG

SHELL_IMAGE
DASHBOARD_IMAGE
SETTINGS_IMAGE
```

---

# Deployment Metadata

Files:

```txt
.current-image-tag
.previous-image-tag
```

Purpose:

```txt
rollback support
deployment tracking
```

---

# Backup Strategy

Git repository stores:

```txt
deployment templates
scripts
documentation
```

VM backups store:

```txt
.env
certbot/conf
deployment metadata
```

---

# Current Limitations

Current architecture deploys three independent frontend applications.

Microfrontend composition has not been implemented yet.

Future iteration:

```txt
shell
   │
   ├── dashboard remote
   └── settings remote
```

using Module Federation or another composition mechanism.

---

# Future Evolution

Current:

```txt
Monorepo
    │
    ▼
Docker
    │
    ▼
Single VM
```

Planned:

```txt
Monorepo
    │
    ▼
Docker
    │
    ▼
Infrastructure as Code
    │
    ▼
Observability
    │
    ▼
Kubernetes
```
