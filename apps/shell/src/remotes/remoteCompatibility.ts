import type { RemoteName, RemoteConfig } from "./loadRemoteManifest";

const SUPPORTED_CONTRACT_VERSION = "1";

export function assertRemoteCompatible(
  name: RemoteName,
  config: RemoteConfig,
): void {
  if (config.contractVersion !== SUPPORTED_CONTRACT_VERSION) {
    throw new Error(
      `${name} remote contract version ${config.contractVersion} is not supported by Shell. Supported version: ${SUPPORTED_CONTRACT_VERSION}`,
    );
  }
}
