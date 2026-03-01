// Type declarations for OpenClaw plugin-sdk
declare module "openclaw/plugin-sdk" {
  export interface OpenClawPluginApi {
    log: {
      info: (msg: string) => void;
      warn: (msg: string) => void;
      error: (msg: string) => void;
    };
    registerChannel: (config: any) => void;
    registerTool: (tool: any) => void;
    registerCommand: (command: any) => void;
    registerRpc: (rpc: any) => void;
    runtime: any;
  }
  
  export function emptyPluginConfigSchema(): any;
}
