import type { PluginRuntime } from "openclaw/plugin-sdk";

// Use globalThis to ensure the runtime is shared across module instances
// This is necessary because jiti may load the module multiple times
declare global {
  // eslint-disable-next-line no-var
  var __wecomRuntime: PluginRuntime | null | undefined;
}

export function setWeComRuntime(next: PluginRuntime) {
  globalThis.__wecomRuntime = next;
}

export function getWeComRuntime(): PluginRuntime {
  if (!globalThis.__wecomRuntime) {
    throw new Error("WeCom runtime not initialized");
  }
  return globalThis.__wecomRuntime;
}
