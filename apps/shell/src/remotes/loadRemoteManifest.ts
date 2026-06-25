import type { RemoteApi } from "@platform/contracts";

export type RemoteName = "dashboard" | "settings";

export type RemoteConfig = {
  url: string;
  version: string;
  contractVersion: string;
  globalName: string;
};

export type RemoteManifest = Record<RemoteName, RemoteConfig>;

let cachedManifest: RemoteManifest | null = null;

export async function loadRemoteManifest(): Promise<RemoteManifest> {
  if (cachedManifest !== null) {
    return cachedManifest;
  }
  const response = await fetch("/remotes/loadRemoteManifest.json");

  if (!response.ok) {
    throw new Error(`Failed to load remote manifest: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `Remote manifest returned non-JSON response: ${contentType}`,
    );
  }

  cachedManifest = (await response.json()) as RemoteManifest;

  return cachedManifest;
}

export function getRemoteFromWindow(globalName: string): RemoteApi | undefined {
  return window[globalName as keyof Window] as RemoteApi | undefined;
}
