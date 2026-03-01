# 🦐 WeCom 插件迁移 - 行动清单

俊杰，我已经帮你创建了一个完整的 **WeCom 第三方插件** 框架！

## 📂 已创建的文件

位置：`/home/openclaw/.openclaw/workspace/wecom-plugin/`

```
wecom-plugin/
├── package.json              # npm 包配置
├── tsconfig.json            # TypeScript 配置
├── README.md                # 插件说明文档
├── MIGRATION.md             # 详细迁移指南
├── LICENSE                  # MIT 许可证
├── quick-start.sh           # 快速开始脚本
├── .github/workflows/
│   └── publish.yml          # GitHub Actions 自动发布
└── src/
    └── index.ts             # 插件入口（需要你的代码）
```

## 🎯 接下来要做什么

### 第一步：复制你的 WeCom 代码（5 分钟）

```bash
cd /home/openclaw/.openclaw/workspace/wecom-plugin

# 从 OpenClaw 主仓库复制你的代码
cp -r /home/openclaw/code/openclaw/extensions/wecom/src/* ./src/
```

### 第二步：修改 package.json（2 分钟）

编辑 `package.json`，替换以下内容：

```json
{
  "name": "@openclaw/wecom",
  "author": "张俊杰",
  "repository": {
    "url": "https://github.com/<your-github-username>/openclaw-wecom-plugin.git"
  },
  "openclaw": {
    "install": {
      "gitUrl": "https://github.com/<your-github-username>/openclaw-wecom-plugin.git"
    }
  }
}
```

### 第三步：本地测试（10 分钟）

```bash
# 安装依赖
npm install

# 编译代码
npm run build

# 在 OpenClaw 中测试
# 编辑 ~/.openclaw/config.yaml，添加：
plugins:
  entries:
    wecom:
      enabled: true
      path: /home/openclaw/.openclaw/workspace/wecom-plugin

# 重启 Gateway
openclaw gateway restart

# 测试发消息
openclaw message send --channel wecom --target ZhangJunJie --message "测试插件"
```

### 第四步：发布到 npm（10 分钟）

1. **注册 npm 账号**（如果没有）
   - 访问：https://www.npmjs.com/signup

2. **本地登录**
   ```bash
   npm login
   ```

3. **发布**
   ```bash
   npm version 1.0.0
   npm publish --access public
   ```

### 第五步：创建 GitHub 仓库（5 分钟）

1. 访问 https://github.com/new
2. 仓库名：`openclaw-wecom-plugin`
3. 公开仓库
4. 创建后关联并推送：
   ```bash
   git remote add origin https://github.com/<your-username>/openclaw-wecom-plugin.git
   git push -u origin main
   ```

### 第六步：回复社区邮件（2 分钟）

使用以下模板回复 OpenClaw 社区：

---

**邮件回复模板：**

```
Hi OpenClaw Team,

Thank you for the feedback! I understand that the WeCom channel should be 
maintained as a third-party plugin.

I'm creating an independent npm package for the WeCom plugin:
- Repository: https://github.com/<your-username>/openclaw-wecom-plugin
- npm: https://www.npmjs.com/package/@openclaw/wecom

The plugin will include:
✅ Full WeCom message support (text, image, file, voice, video, location, link)
✅ Private chat and group chat with session history
✅ Access policy enforcement (open/pairing/allowlist)
✅ Message deduplication for WeCom retries
✅ Auto-refresh access tokens (2h TTL)
✅ Multi-account ready

I'll submit a PR to add it to the community plugins page once published.

Thanks for the guidance!

Best regards,
张俊杰 (Junjie Zhang)
```

---

### 第七步：提交到社区插件列表（可选）

发布后，可以 PR 到 OpenClaw 文档，添加到社区插件页面：

**文件**: `docs/plugins/community.md`

```markdown
### WeCom (企业微信)

- **Name**: @openclaw/wecom
- **Description**: 企业微信消息通道插件，支持私聊和群聊
- **Repository**: https://github.com/<your-username>/openclaw-wecom-plugin
- **npm**: https://www.npmjs.com/package/@openclaw/wecom
- **Author**: @<your-username>
```

## ⏱️ 预计总时间

| 步骤 | 时间 |
|------|------|
| 复制代码 | 5 分钟 |
| 修改配置 | 2 分钟 |
| 本地测试 | 10 分钟 |
| 发布 npm | 10 分钟 |
| GitHub 仓库 | 5 分钟 |
| 回复邮件 | 2 分钟 |
| **总计** | **约 35 分钟** |

## 🎁 额外建议

### 1. 添加自动化测试

```bash
npm install --save-dev vitest
```

创建 `src/__tests__/channel.test.ts` 测试核心功能。

### 2. 添加 CI/CD

已为你创建 `.github/workflows/publish.yml`，创建 Release 时自动发布到 npm。

### 3. 添加文档站点

使用 VitePress 或 Docusaurus 创建独立文档站点。

### 4. 持续维护

- 定期更新依赖
- 响应用户 Issue
- 根据企业微信 API 更新调整代码

## 🆘 需要帮助？

如果遇到问题：

1. 查看 `MIGRATION.md` 详细指南
2. 查看 OpenClaw 插件文档：https://docs.openclaw.ai/plugin
3. 在 OpenClaw Discord 提问：https://discord.gg/clawd

## 🎉 完成后

完成后告诉我，我可以帮你：
- 检查代码质量
- 优化性能
- 添加更多功能
- 准备社区展示

加油！你很快就能拥有一个独立的开源项目了！🚀
