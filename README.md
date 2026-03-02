# OpenClaw WeCom Plugin (企业微信插件)

[OpenClaw](https://openclaw.ai) 企业微信通道插件，让你可以通过企业微信与 AI 助手对话。

## 功能特性

- 支持企业微信消息收发
- 支持私聊和群聊
- 支持文本、图片、文件、语音、视频、位置、链接消息
- 访问控制策略（私聊：开放/配对/白名单；群聊：开放/白名单/禁用）
- 群聊 @提及要求
- 消息去重（处理企业微信重试）
- 访问令牌自动缓存和刷新
- 支持多账号配置

## 安装

### 方式一：从 npm 安装（推荐）

```bash
openclaw plugins install @junjiezhang/openclaw-wecom-plugin
```

### 方式二：本地开发

```bash
git clone git@github.com:pk19876824/openclaw-wecom-plugin.git
cd openclaw-wecom-plugin
npm install
npm run build
```

在 OpenClaw 配置中添加插件路径：

```json
{
  "plugins": {
    "load": {
      "paths": ["/path/to/openclaw-wecom"]
    },
    "entries": {
      "wecom": { "enabled": true }
    }
  }
}
```

## 配置

在 `~/.openclaw/openclaw.json` 中添加以下配置：

```json
{
  "channels": {
    "wecom": {
      "enabled": true,
      "corpId": "ww<your-corp-id>",
      "agentId": "<your-agent-id>",
      "secret": "<your-secret>",
      "token": "<your-token>",
      "encodingAESKey": "<your-encoding-aes-key>",
      "webhookPort": 3000,
      "webhookHost": "127.0.0.1",
      "webhookPath": "/wecom/events",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist",
      "requireMention": true,
      "allowFrom": ["*"],
      "groupAllowFrom": ["<group-chat-id>"],
      "historyLimit": 50,
      "dmHistoryLimit": 50,
      "textChunkLimit": 2000,
      "mediaMaxMb": 20
    }
  }
}
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | boolean | `true` | 是否启用通道 |
| `corpId` | string | 必填 | 企业 ID |
| `agentId` | string | 必填 | 应用 AgentID |
| `secret` | string | 必填 | 应用 Secret |
| `token` | string | 必填 | Token（回调验证用） |
| `encodingAESKey` | string | 必填 | EncodingAESKey（消息加解密） |
| `webhookPort` | number | `3000` | Webhook 服务器端口 |
| `webhookHost` | string | `"127.0.0.1"` | Webhook 绑定地址 |
| `webhookPath` | string | `"/wecom/events"` | Webhook 路径 |
| `dmPolicy` | string | `"pairing"` | 私聊策略：`open` / `pairing` / `allowlist` |
| `groupPolicy` | string | `"allowlist"` | 群聊策略：`open` / `allowlist` / `disabled` |
| `requireMention` | boolean | `true` | 群聊是否需要 @机器人 |
| `allowFrom` | string[] | `[]` | 私聊白名单（用户 UserID，`"*"` 表示所有用户） |
| `groupAllowFrom` | string[] | `[]` | 群聊白名单（群聊 ID） |
| `historyLimit` | number | `50` | 会话历史消息数限制 |
| `dmHistoryLimit` | number | `50` | 私聊历史消息数限制 |
| `textChunkLimit` | number | `2000` | 文本分块大小限制 |
| `mediaMaxMb` | number | `20` | 媒体文件最大 MB |

### 访问控制策略

**私聊策略 (`dmPolicy`)**:
- `open`: 允许所有用户
- `pairing`: 需要用户先完成配对
- `allowlist`: 仅允许白名单用户

**群聊策略 (`groupPolicy`)**:
- `open`: 允许所有群聊
- `allowlist`: 仅允许白名单群聊
- `disabled`: 禁用群聊

## 使用

### 1. 启动 Gateway

```bash
openclaw gateway start
```

### 2. 配置企业微信后台

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/)
2. 进入「应用管理」→ 选择你的应用
3. 在「接收消息」中配置：
   - **URL**: `http://<your-server>:3000/wecom/events`
   - **Token**: 与配置文件中一致
   - **EncodingAESKey**: 与配置文件中一致
4. 点击「保存」，系统会自动验证 URL

### 3. 测试消息

从企业微信发送消息给你的应用，AI 助手会自动回复。

### 4. 主动发送消息

```bash
# 发送给个人
openclaw message send --channel wecom --target <userid> --message "你好！"

# 发送给群聊
openclaw message send --channel wecom --target <groupid> --message "大家好！"
```

## 安全说明

### Webhook 安全

- 所有请求都会验证签名（SHA1 HMAC）
- 请求体限制为 1 MB
- 解密后验证 CorpId 是否匹配

### 访问令牌

- 访问令牌仅存储在进程内存中
- 自动刷新（有效期 2 小时）
- 不会写入磁盘或日志

### 网络暴露

- 默认绑定 `127.0.0.1`（仅本地访问）
- 如需外网访问，设置 `webhookHost: "0.0.0.0"` 并配置防火墙
- 建议使用内网穿透工具（如 ngrok）进行开发测试

## 故障排查

### Webhook 验证失败

1. 检查 `token` 和 `encodingAESKey` 是否与后台配置完全一致
2. 确保 Gateway 已启动且 Webhook 服务器正常运行
3. 检查端口是否被占用：`lsof -i :3000`
4. 查看日志：`tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | grep wecom`

### 消息无法发送

1. 检查 `secret` 是否正确
2. 确认应用有「发消息」权限
3. 验证目标 UserID 或群聊 ID 是否正确

### 端口被占用

```bash
lsof -i :3000
# 或修改配置中的端口
```

## 开发

```bash
git clone git@github.com:pk19876824/openclaw-wecom-plugin.git
cd openclaw-wecom-plugin
npm install
npm run build
```

### 目录结构

```
openclaw-wecom/
├── src/
│   ├── index.ts          # 插件入口
│   ├── channel.ts        # 通道实现
│   ├── bot.ts            # 消息处理
│   ├── client.ts         # API 客户端
│   ├── config-schema.ts  # 配置 Schema
│   ├── monitor.ts        # Webhook 服务器
│   ├── send.ts           # 发送消息
│   ├── policy.ts         # 访问控制
│   ├── dedup.ts          # 消息去重
│   └── ...
├── dist/                  # 编译输出
├── package.json
├── openclaw.plugin.json  # 插件清单
├── tsconfig.json
├── types.d.ts            # 类型声明
└── README.md
```

## 许可证

MIT License

## 致谢

- [OpenClaw](https://openclaw.ai) - AI 助手框架
- [企业微信 API 文档](https://developer.work.weixin.qq.com/document)