# OpenClaw WeCom Plugin (企业微信插件)

[OpenClaw](https://openclaw.ai) 企业微信通道插件，让你可以通过企业微信与 AI 助手对话。

## ✨ 功能特性

- ✅ 支持企业微信消息收发
- ✅ 支持私聊和群聊
- ✅ 支持文本、图片、文件、语音、视频、位置、链接消息
- ✅ 访问控制策略（私聊：开放/配对/白名单；群聊：开放/白名单/禁用）
- ✅ 群聊 @提及要求
- ✅ 消息去重（处理企业微信重试）
- ✅ 访问令牌自动缓存和刷新
- ✅ 支持多账号配置

## 📦 安装

### 方式一：从 npm 安装（推荐）

```bash
openclaw plugins install @openclaw/wecom
```

### 方式二：从 Git 安装

```bash
openclaw plugins install github:<your-username>/openclaw-wecom-plugin
```

### 方式三：本地安装

```bash
cd openclaw-wecom-plugin
npm install
npm run build
```

然后在 OpenClaw 配置中启用：

```yaml
plugins:
  entries:
    wecom:
      enabled: true
      path: ./openclaw-wecom-plugin
```

## ⚙️ 配置

在 `~/.openclaw/config.yaml` 中添加以下配置：

```yaml
channels:
  wecom:
    enabled: true
    
    # 企业微信应用配置
    corpId: "ww<your-corp-id>"        # 企业 ID
    agentId: "<your-agent-id>"         # 应用 AgentID
    secret: "<your-secret>"            # 应用 Secret
    token: "<your-token>"              # Token（回调验证用）
    encodingAESKey: "<your-aes-key>"   # EncodingAESKey
    
    # Webhook 服务器配置
    webhookPort: 3000                  # 默认 3000
    webhookHost: "127.0.0.1"           # 默认 127.0.0.1，如需外网访问设为 0.0.0.0
    webhookPath: "/wecom/events"       # 默认 /wecom/events
    
    # 访问控制策略
    dmPolicy: "pairing"                # 私聊策略：open / pairing / allowlist
    groupPolicy: "allowlist"           # 群聊策略：open / allowlist / disabled
    requireMention: true               # 群聊是否需要 @机器人
    
    # 白名单配置
    allowFrom: ["ZhangJunJie"]         # 私聊白名单（用户 UserID）
    groupAllowFrom: ["<group-chat-id>"] # 群聊白名单（群聊 ID）
    
    # 其他配置
    historyLimit: 50                   # 会话历史消息数限制
    dmHistoryLimit: 50                 # 私聊历史消息数限制
    textChunkLimit: 2000               # 文本分块大小限制
```

## 🚀 使用

### 1. 启动 Gateway

```bash
openclaw gateway start
```

### 2. 配置企业微信后台

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/)
2. 进入「应用管理」→ 选择你的应用
3. 在「接收消息」中配置：
   - **API 接收消息 URL**: `http://<your-server>:3000/wecom/events`
   - **Token**: 与配置文件中一致
   - **EncodingAESKey**: 随机生成或自定义
4. 点击「保存」，系统会自动验证 URL

### 3. 测试消息

从企业微信发送消息给你的应用，AI 助手会自动回复！

### 4. 主动发送消息

```bash
# 发送给个人
openclaw message send --channel wecom --target ZhangJunJie --message "你好！"

# 发送给群聊
openclaw message send --channel wecom --target "<group-chat-id>" --message "大家好！"
```

## 🔒 安全说明

### Webhook 安全

- 所有请求都会验证签名（SHA1 HMAC）
- 请求体限制为 1 MB
- 读取超时 30 秒
- 解密后验证 CorpId 是否匹配

### 访问令牌

- 访问令牌仅存储在进程内存中
- 自动刷新（有效期 2 小时）
- 不会写入磁盘或日志

### 网络暴露

- 默认绑定 `127.0.0.1`（仅本地访问）
- 如需外网访问，设置 `webhookHost: "0.0.0.0"` 并配置防火墙
- 建议使用内网穿透工具（如 ngrok）进行开发测试

## 🛠️ 故障排查

### Webhook 验证失败

**症状**: 企业微信后台显示「验证失败」

**解决方案**:
1. 检查 `token` 和 `encodingAESKey` 是否与后台配置完全一致
2. 确保 Gateway 已启动且 Webhook 服务器正常运行
3. 检查端口是否被占用：`lsof -i :3000`
4. 查看日志：`openclaw gateway logs | grep wecom`

### 消息无法发送

**症状**: AI 回复无法送达

**解决方案**:
1. 检查 `secret` 是否正确
2. 确认应用有「发消息」权限
3. 检查访问令牌是否有效：查看日志中的 token 刷新记录
4. 验证目标 UserID 或群聊 ID 是否正确

### 端口被占用

**症状**: 启动时提示 `EADDRINUSE`

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程或修改配置中的端口
webhookPort: 3001
```

### 群聊无响应

**症状**: 群聊中发送消息没有回复

**解决方案**:
1. 检查 `groupPolicy` 配置
2. 如果是 `allowlist` 模式，确保群聊 ID 在 `groupAllowFrom` 中
3. 检查 `requireMention` 设置，确认是否需要 @机器人

## 📝 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/<your-username>/openclaw-wecom-plugin.git
cd openclaw-wecom-plugin

# 安装依赖
npm install

# 编译
npm run build

# 链接到 OpenClaw（可选）
npm link
```

### 目录结构

```
openclaw-wecom-plugin/
├── src/
│   ├── index.ts          # 插件入口
│   ├── channel.ts        # 通道实现
│   ├── crypto.ts         # 加密解密工具
│   ├── xml.ts            # XML 解析工具
│   └── types.ts          # 类型定义
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## 📄 许可证

MIT License

## 🙏 致谢

- [OpenClaw](https://openclaw.ai) - AI 助手框架
- [企业微信 API 文档](https://developer.work.weixin.qq.com/document)

## 📮 联系方式

- 问题反馈：[GitHub Issues](https://github.com/<your-username>/openclaw-wecom-plugin/issues)
- 讨论区：[OpenClaw Discord](https://discord.gg/clawd)
