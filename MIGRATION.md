# WeCom 插件迁移指南

## 📋 背景

OpenClaw 社区希望第三方通道作为独立插件维护，而不是合并到主仓库。这是开源项目的常见做法，特别是对于特定地区/场景的功能。

## 🎯 目标

将现有的 WeCom 通道代码从 OpenClaw 主仓库迁移到独立的 npm 包，作为第三方插件发布。

## 📦 迁移步骤

### 步骤 1: 创建独立的 Git 仓库

```bash
# 创建新仓库目录
mkdir openclaw-wecom-plugin
cd openclaw-wecom-plugin

# 初始化 Git 仓库
git init

# 创建 .gitignore
cat > .gitignore <<EOF
node_modules/
dist/
*.log
.DS_Store
.env
EOF
```

### 步骤 2: 复制现有代码

从 OpenClaw 主仓库复制 WeCom 相关代码：

```bash
# 复制通道实现
cp -r /home/openclaw/code/openclaw/extensions/wecom/src/* ./src/

# 复制配置文件（作为示例）
cp /home/openclaw/code/openclaw/extensions/wecom/README.md ./README.md
```

### 步骤 3: 调整代码结构

#### 3.1 修改导入路径

原代码中的导入需要调整：

```typescript
// 原来（在 OpenClaw 主仓库中）
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

// 现在（独立插件）- 保持不变
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
```

#### 3.2 创建插件入口文件

创建 `src/index.ts`：

```typescript
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import { wecomPlugin } from "./src/channel.js";

const plugin = {
  id: "wecom",
  name: "WeCom",
  description: "WeCom (企业微信) channel plugin for OpenClaw",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    api.registerChannel({ plugin: wecomPlugin });
  },
};

export default plugin;
```

### 步骤 4: 创建 package.json

```json
{
  "name": "@openclaw/wecom",
  "version": "1.0.0",
  "description": "OpenClaw WeCom (企业微信) channel plugin",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@sinclair/typebox": "0.34.48",
    "zod": "^4.3.6",
    "axios": "^1.6.0",
    "crypto-js": "^4.2.0",
    "xml2js": "^0.6.2"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0"
  },
  "openclaw": {
    "extensions": ["./dist/index.js"],
    "channel": {
      "id": "wecom",
      "label": "WeCom",
      "selectionLabel": "WeCom (企业微信)",
      "blurb": "企业微信消息通道，支持私聊和群聊"
    }
  }
}
```

### 步骤 5: 创建 TypeScript 配置

创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 步骤 6: 编译和测试

```bash
# 安装依赖
npm install

# 编译 TypeScript
npm run build

# 检查输出
ls -la dist/
```

### 步骤 7: 本地测试

在 OpenClaw 中测试本地插件：

```yaml
# ~/.openclaw/config.yaml
plugins:
  entries:
    wecom:
      enabled: true
      path: /path/to/openclaw-wecom-plugin
```

重启 Gateway 并测试功能。

### 步骤 8: 发布到 npm

#### 8.1 准备 npm 账号

1. 注册 [npm](https://www.npmjs.com/) 账号
2. 本地登录：`npm login`

#### 8.2 发布

```bash
# 确保版本号正确
npm version 1.0.0

# 发布（公开包）
npm publish --access public
```

#### 8.3 验证发布

```bash
# 查看发布的包
npm view @openclaw/wecom

# 测试安装
npm install @openclaw/wecom
```

### 步骤 9: 创建 GitHub 仓库

```bash
# 在 GitHub 创建新仓库（例如：openclaw-wecom-plugin）

# 关联远程仓库
git remote add origin https://github.com/<your-username>/openclaw-wecom-plugin.git

# 提交代码
git add .
git commit -m "Initial release: WeCom plugin for OpenClaw"
git push -u origin main

# 创建 Release
git tag v1.0.0
git push origin v1.0.0
```

### 步骤 10: 提交到 OpenClaw 社区插件列表

PR 到 OpenClaw 文档仓库，添加你的插件到社区插件页面：

```markdown
## Community Plugins

### WeCom (企业微信)

- **Name**: @openclaw/wecom
- **Description**: 企业微信消息通道插件
- **Repository**: https://github.com/<your-username>/openclaw-wecom-plugin
- **npm**: https://www.npmjs.com/package/@openclaw/wecom
- **Author**: @<your-username>
```

## 📝 回复社区邮件模板

```
Hi OpenClaw Team,

Thank you for the feedback! I understand that the WeCom channel should be 
maintained as a third-party plugin.

I'm in the process of creating an independent npm package for the WeCom plugin:
- Repository: https://github.com/<your-username>/openclaw-wecom-plugin
- npm: https://www.npmjs.com/package/@openclaw/wecom

The plugin will include:
- Full WeCom message support (text, image, file, voice, video, location, link)
- Private chat and group chat with session history
- Access policy enforcement (open/pairing/allowlist)
- Message deduplication
- Auto-refresh access tokens

Once published, I'll submit a PR to add it to the community plugins page.

Thanks for the guidance!

Best regards,
<Your Name>
```

## 🔗 相关资源

- [OpenClaw 插件文档](https://docs.openclaw.ai/plugin)
- [社区插件列表](https://docs.openclaw.ai/plugins/community)
- [npm 发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-and-modules/publishing-packages)
- [TypeScript 编译指南](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## ✅ 检查清单

- [ ] 创建独立的 Git 仓库
- [ ] 复制并调整代码结构
- [ ] 创建 package.json
- [ ] 创建 tsconfig.json
- [ ] 编译 TypeScript 代码
- [ ] 本地测试功能正常
- [ ] 创建 npm 账号
- [ ] 发布到 npm
- [ ] 创建 GitHub 仓库
- [ ] 编写 README.md
- [ ] 回复社区邮件
- [ ] 提交到社区插件列表

## 🎉 完成！

恭喜你完成迁移！现在你的 WeCom 插件是一个独立的第三方插件，可以由你自主维护和更新。
