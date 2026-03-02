import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { wecomPlugin } from "./channel.js";
import { setWeComRuntime } from "./runtime.js";

export { wecomPlugin } from "./channel.js";

const plugin = {
  id: "wecom",
  name: "WeCom",
  description: "WeCom (企业微信) channel plugin for OpenClaw",
  version: "1.0.2",

  register(api: OpenClawPluginApi) {
    setWeComRuntime(api.runtime);
    api.registerChannel({ plugin: wecomPlugin });
    api.logger.info("wecom: plugin registered successfully");
  },
};

export default plugin;
