// Type declarations for OpenClaw plugin-sdk
declare module "openclaw/plugin-sdk" {
  export type ClawdbotConfig = any;
  export type RuntimeEnv = any;
  export type HistoryEntry = any;
  export type ChannelMeta = any;
  export type ChannelPlugin<T = any> = any;
  export type ChannelOutboundAdapter = any;
  export type AllowlistMatch<T = any> = any;
  export type ChannelGroupContext = any;
  export type GroupToolPolicyConfig = any;
  export type ReplyPayload = any;
  export type PluginRuntime = any;
  
  export interface OpenClawPluginApi {
    logger: any;
    registerChannel: (config: any) => void;
    registerTool: (tool: any) => void;
    registerCommand: (command: any) => void;
    registerRpc: (rpc: any) => void;
    runtime: PluginRuntime;
  }
  
  export const DEFAULT_ACCOUNT_ID: string;
  export const PAIRING_APPROVED_MESSAGE: string;
  
  export function emptyPluginConfigSchema(): any;
  export function buildAgentMediaPayload(...args: any[]): any;
  export function buildBaseChannelStatusSummary(...args: any[]): any;
  export function buildPendingHistoryContextFromMap(...args: any[]): any;
  export function clearHistoryEntriesIfEnabled(...args: any[]): any;
  export function createScopedPairingAccess(...args: any[]): any;
  export function createDefaultChannelRuntimeState(...args: any[]): any;
  export function recordPendingHistoryEntryIfEnabled(...args: any[]): any;
  export function resolveDefaultGroupPolicy(...args: any[]): any;
  export function resolveAllowlistProviderRuntimeGroupPolicy(...args: any[]): any;
  export function fetchWithSsrFGuard(...args: any[]): any;
  export function createDedupeCache(...args: any[]): any;
  export function createPersistentDedupe(...args: any[]): any;
  export function resolvePreferredOpenClawTmpDir(...args: any[]): any;
  export function installRequestBodyLimitGuard(...args: any[]): any;
  export function createReplyPrefixContext(...args: any[]): any;
}
