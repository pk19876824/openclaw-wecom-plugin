import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { wecomPlugin } from "./channel.js";

export { wecomPlugin } from "./channel.js";

const plugin = {
  id: "wecom",
  name: "WeCom",
  description: "WeCom (企业微信) channel plugin for OpenClaw",
  version: "1.0.0",
  
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: wecomPlugin });
    api.log.info("wecom: plugin registered successfully");
  },
};

export default plugin;
