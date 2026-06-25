import { useEffect, useRef, useState } from "react";
import type { RemoteApi } from "@platform/contracts";
import {
  getRemoteFromWindow,
  loadRemoteManifest,
  type RemoteName,
} from "./loadRemoteManifest";
import { loadScript } from "./loadScript";
import { retry } from "./retry";
import { withTimeout } from "./withTimeout";
import { assertRemoteCompatible } from "./remoteCompatibility";

type RemoteStatus = "idle" | "loading" | "ready" | "error";

type RemoteAppProps = {
  name: RemoteName;
};

export function RemoteApp({ name }: RemoteAppProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<RemoteStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let cancelled = false;
    let mounted = false;
    let globalName: string | null = null;

    setStatus("loading");
    setError(null);

    retry(async () => {
      const manifest = await withTimeout(
        loadRemoteManifest(),
        3000,
        "Remote manifest loading timed out",
      );

      const remoteConfig = manifest[name];
      assertRemoteCompatible(name, remoteConfig);
      globalName = remoteConfig.globalName;

      await withTimeout(
        loadScript(remoteConfig.url),
        5000,
        `${name} remote script loading timed out`,
      );

      const remote = getRemoteFromWindow(remoteConfig.globalName);

      if (!remote) {
        throw new Error(`${name} remote was loaded, but API is missing`);
      }

      return remote;
    }, 2)
      .then((remote: RemoteApi) => {
        if (cancelled) {
          return;
        }

        remote.mount(container);
        mounted = true;
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) {
          return;
        }

        setStatus("error");
        setError(err instanceof Error ? err.message : "Unknown remote error");
      });

    return () => {
      cancelled = true;

      if (mounted && globalName) {
        getRemoteFromWindow(globalName)?.unmount(container);
      }
    };
  }, [name, retryKey]);

  if (status === "loading") {
    return <p>Loading {name}...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>
          {name} is unavailable: {error}
        </p>

        <button onClick={() => setRetryKey((value) => value + 1)}>Retry</button>
      </div>
    );
  }

  return <div ref={containerRef} />;
}
