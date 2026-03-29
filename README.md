# 宝知道 MCP Server

> 物品管理小程序的 MCP Server，支持智能体（Claude、Cursor、Cline、小龙虾等）通过 API Key 管理物品。

[![npm version](https://badge.fury.io/js/baozhibao-mcp-server.svg)](https://www.npmjs.com/package/baozhibao-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%3E=18.0.0-green)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0.0-purple)](https://modelcontextprotocol.io/)

## ✨ 功能特性

### 🛠️ 可用工具

| 工具 | 描述 | 参数 |
|------|------|------|
| `login` | 使用 API Key 登录，获取认证 Token | `apiKey` |
| `add_item` | 添加新物品，记录名称、位置、过期日期等 | `name`, `locationName`, `expiryDate`, ... |
| `scan_add_item` | 通过扫描条形码添加物品，自动识别信息 | `barcode`, `locationName`, ... |
| `query_items` | 查询物品列表，支持关键词、位置、状态筛选 | `keyword`, `locationName`, `status`, ... |
| `get_item` | 获取物品详细信息 | `id` |

### 🎯 核心特性

- 🔐 **API Key 认证** - 安全的身份验证机制
- 📦 **类型安全** - 完整的 TypeScript 类型定义
- 🔍 **智能搜索** - 支持关键词、位置、状态等多维度查询
- 📱 **条形码扫描** - 自动识别商品信息
- 🌐 **通用兼容** - 支持 Claude Desktop、Cursor、Cline、小龙虾等

## 📦 安装

### 方式一：全局安装（推荐）

```bash
npm install -g baozhibao-mcp-server
# 或
npx baozhibao-mcp-server
```

### 方式二：本地安装

```bash
git clone https://github.com/yechaoa/baozhibao-mcp-server.git
cd baozhibao-mcp-server
npm install
npm run build
```

## ⚙️ 配置

### 环境变量

创建 `.env` 文件或设置环境变量：

```bash
# API 服务地址（必填）
BAOZHIBAO_API_URL=https://your-api.com

# API Key（可选，用于默认登录）
BAOZHIBAO_API_KEY=sk_xxx
```

参考 `.env.example` 文件：

```bash
cp .env.example .env
```

## 🚀 使用

### 在 Claude Desktop 中配置

编辑 `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) 或 `%APPDATA%\Claude\claude_desktop_config.json` (Windows)：

```json
{
  "mcpServers": {
    "baozhibao": {
      "command": "node",
      "args": [
        "/path/to/baozhibao-mcp-server/dist/index.js"
      ],
      "env": {
        "BAOZHIBAO_API_URL": "https://your-api.com",
        "BAOZHIBAO_API_KEY": "sk_xxx"
      }
    }
  }
}
```

### 在 Claude Code 中配置

编辑 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "baozhibao": {
      "command": "node",
      "args": [
        "/path/to/baozhibao-mcp-server/dist/index.js"
      ],
      "env": {
        "BAOZHIBAO_API_URL": "https://your-api.com",
        "BAOZHIBAO_API_KEY": "sk_xxx"
      }
    }
  }
}
```

### 在 Cursor 中配置

编辑 Cursor 设置中的 MCP Servers 配置：

```json
{
  "mcpServers": {
    "baozhibao": {
      "command": "node",
      "args": [
        "/path/to/baozhibao-mcp-server/dist/index.js"
      ],
      "env": {
        "BAOZHIBAO_API_URL": "https://your-api.com"
      }
    }
  }
}
```

### 在 Cline (VSCode) 中配置

在 VSCode 设置中搜索 `cline.mcp.servers`，添加：

```json
{
  "baozhibao": {
    "command": "node",
    "args": [
      "/path/to/baozhibao-mcp-server/dist/index.js"
    ],
    "env": {
      "BAOZHIBAO_API_URL": "https://your-api.com"
    }
  }
}
```

### 在小龙虾中配置

1. 打开小龙虾设置
2. 添加 MCP Server
3. 输入配置：

```json
{
  "mcpServers": {
    "baozhibao": {
      "command": "node",
      "args": [
        "/path/to/baozhibao-mcp-server/dist/index.js"
      ],
      "env": {
        "BAOZHIBAO_API_URL": "https://your-api.com"
      }
    }
  }
}
```

## 💬 使用示例

### 登录

```
用户: 帮我登录宝知道
AI: [调用 login 工具]
     请提供您的 API Key（格式：sk_xxx）
```

### 添加物品

```
用户: 帮我记录一下，牛奶放在冰箱里，5月1号过期
AI: [调用 add_item 工具]
     ✅ 已添加：牛奶
     - 存放位置：冰箱
     - 过期日期：2024-05-01
```

### 查询物品

```
用户: 我的牛奶放哪了？
AI: [调用 query_items 工具]
     搜索结果：
     - 牛奶 x 2，存放于冰箱
     - 纯牛奶 x 1，存放于冷藏室
```

### 扫码添加

```
用户: 帮我扫码添加这个商品，条形码是 6901234567890
AI: [调用 scan_add_item 工具]
     已识别商品：伊利纯牛奶
     请补充存放位置和过期日期信息
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 编译 TypeScript
npm run build

# 监听模式编译
npm run watch

# 调试 MCP Server
npx @modelcontextprotocol/inspector npm run dev
```

## 🔑 获取 API Key

1. 打开「宝知道」小程序
2. 进入「设置」->「API Key 管理」
3. 点击「创建 API Key」
4. 输入名称（如"小龙虾"）
5. 复制生成的 API Key（格式：`sk_xxx`）

## 📋 工具参数详解

### login - 登录

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| apiKey | string | ✅ | API Key，格式为 `sk_xxx` |

### add_item - 添加物品

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | ✅ | 物品名称 |
| locationId | number | ❌ | 存放位置 ID |
| locationName | string | ❌ | 存放位置名称，如"冰箱" |
| expiryDate | string | ❌ | 过期日期，格式 `YYYY-MM-DD` |
| quantity | number | ❌ | 数量，默认 1 |
| categoryId | number | ❌ | 分类 ID |
| categoryName | string | ❌ | 分类名称 |
| description | string | ❌ | 物品描述 |
| brand | string | ❌ | 品牌 |
| specification | string | ❌ | 规格 |
| price | number | ❌ | 价格 |
| remark | string | ❌ | 备注 |

### scan_add_item - 扫码添加

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| barcode | string | ✅ | 条形码 |
| locationId | number | ❌ | 存放位置 ID |
| locationName | string | ❌ | 存放位置名称 |
| quantity | number | ❌ | 数量，默认 1 |
| expiryDate | string | ❌ | 过期日期 |

### query_items - 查询物品

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | ❌ | 搜索关键词 |
| locationId | number | ❌ | 存放位置 ID |
| locationName | string | ❌ | 存放位置名称 |
| status | number | ❌ | 状态：0-未过期，1-已过期，2-已消费 |
| isNearlyExpired | number | ❌ | 是否临期：0-否，1-是 |
| categoryId | number | ❌ | 分类 ID |
| pageNum | number | ❌ | 页码，默认 1 |
| pageSize | number | ❌ | 每页数量，默认 20 |

### get_item - 获取详情

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | ✅ | 物品 ID |

## 🏗️ 项目结构

```
baozhibao-mcp-server/
├── src/
│   ├── api/
│   │   └── client.ts          # API 客户端
│   ├── tools/
│   │   ├── login.ts           # 登录工具
│   │   ├── addItem.ts         # 添加物品工具
│   │   ├── scanAddItem.ts     # 扫码添加工具
│   │   ├── queryItems.ts      # 查询物品工具
│   │   └── getItem.ts         # 获取详情工具
│   ├── types/
│   │   └── index.ts           # 类型定义
│   ├── index.ts               # 入口文件
│   └── server.ts              # MCP Server 主逻辑
├── dist/                      # 编译输出
├── .env.example               # 环境变量示例
├── package.json
├── tsconfig.json
└── README.md
```

## ⚠️ 注意事项

- 🔑 API Key 只在创建时显示一次，请妥善保存
- 🚫 不要将 API Key 提交到代码仓库
- 🔄 如果 API Key 泄露，请立即在小程序中删除并重新创建
- 📝 所有日志输出到 stderr，数据通信通过 stdout

## 📌 当前限制

### 仅支持个人模式

当前 MCP Server 仅支持**个人模式**，所有物品操作均以当前登录用户的个人身份进行（`familyId = null`），不支持家庭相关的功能。

**不受影响的功能：**
- ✅ 添加/查询/详情查看个人物品
- ✅ 扫码添加个人物品
- ✅ 个人位置和分类管理

**暂不支持的功能：**
- ❌ 家庭物品管理（共享物品、家庭内私有物品）
- ❌ 家庭成员相关操作（查看成员、邀请、移除等）
- ❌ 按家庭成员筛选物品
- ❌ 个人与家庭数据同步
- ❌ 家庭位置/分类管理

> 后端 API 已具备完整的家庭功能支持（17 个接口），后续版本会逐步接入。

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [宝知道小程序](https://your-miniapp-url.com)
- [问题反馈](https://github.com/yechaoa/baozhibao-mcp-server/issues)

## 📞 联系方式

- 作者: yechaoa
- GitHub: [@yechaoa](https://github.com/yechaoa)

---

如果这个项目对你有帮助，请给个 ⭐️ Star！
