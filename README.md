# 不过期助手 MCP Server

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
git clone https://github.com/fawaikuangtuzhangfei/baozhibao-mcp-server.git
cd baozhibao-mcp-server
npm install
npm run build
```

## 🚀 快速开始（从零配置）

### 第一步：获取 API Key

1. 打开微信，搜索「不过期助手」小程序
2. 进入小程序后，点击「我的」->「设置」
3. 找到「API Key 管理」，点击「创建 API Key」
4. 输入名称（如 "Claude Code"），点击确认
5. **立即复制** 生成的 API Key（格式：`sk_xxx`），只会显示一次！

### 第二步：安装 MCP Server

**方式 A：全局安装（推荐）**

```bash
npm install -g baozhibao-mcp-server
```

**方式 B：从源码构建**

```bash
git clone https://github.com/fawaikuangtuzhangfei/baozhibao-mcp-server.git
cd baozhibao-mcp-server
npm install
npm run build
```

### 第三步：配置 Claude Code

1. 找到配置文件位置：
   - **Windows**: `C:\Users\<你的用户名>\.claude\settings.json`
   - **macOS/Linux**: `~/.claude/settings.json`

2. 如果文件不存在，手动创建

3. 添加 MCP Server 配置：

```json
{
  "mcpServers": {
    "baozhibao": {
      "command": "node",
      "args": [
        "D:/path/to/baozhibao-mcp-server/dist/index.js"
      ],
      "env": {
        "BAOZHIBAO_API_URL": "https://h1b.site/out_date",
        "BAOZHIBAO_API_KEY": "sk_xxx"
      }
    }
  }
}
```

> **注意**：
> - `args` 填你实际安装的路径
> - `BAOZHIBAO_API_URL` 填后端服务地址
> - `BAOZHIBAO_API_KEY` 填第一步获取的密钥

### 第四步：重启 Claude Code

配置完成后，重启 Claude Code 使配置生效。

### 第五步：验证配置

在 Claude Code 中输入：

```
帮我看看我有哪些物品
```

如果返回你的物品列表，说明配置成功！

---

## ⚙️ 详细配置

### 环境变量

创建 `.env` 文件或直接在 MCP 配置的 `env` 中设置：

```bash
# API 服务地址（必填）
BAOZHIBAO_API_URL=https://h1b.site/out_date

# API Key（可选，用于默认登录）
BAOZHIBAO_API_KEY=sk_xxx
```

参考 `.env.example` 文件：

```bash
cp .env.example .env
```

## 🖥️ 其他客户端配置

### Claude Desktop

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
        "BAOZHIBAO_API_URL": "https://h1b.site/out_date",
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
        "BAOZHIBAO_API_URL": "https://h1b.site/out_date",
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
        "BAOZHIBAO_API_URL": "https://h1b.site/out_date"
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
      "BAOZHIBAO_API_URL": "https://h1b.site/out_date"
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
        "BAOZHIBAO_API_URL": "https://h1b.site/out_date"
      }
    }
  }
}
```

## 💬 使用示例

以下为真实对话效果，AI 会自动调用工具并以友好的格式呈现结果。

### 场景一：查询所有物品

```
用户: 帮我看看我有哪些物品

AI: 你一共有 28 件物品，按状态分类如下：

    ✅ 未过期（有效物品）
    | 物品               | 位置   | 数量 | 过期日期     |
    |--------------------|--------|------|-------------|
    | 苹果               | 冰箱   | 1    | 无保质期     |
    | 尖叫多肽型运动饮料 | 我的家 | 4    | 2026-04-29  |
    | 红枣桂圆枸杞茶     | 我的家 | 1    | 2026-09-08  |
    | 洁柔纸面巾         | 我的家 | 6    | 2028-11-29  |

    ⚠️ 已过期（需注意）
    | 物品         | 数量 | 过期日期     |
    |--------------|------|-------------|
    | 三麟椰子水   | 2    | 2025-06-08  |

    📌 提醒：三麟椰子水已过期将近10个月了，建议处理掉。
```

> AI 会自动分页查询、按状态分类汇总，并主动提醒过期物品。

### 场景二：按关键词搜索

```
用户: 我的牛奶放哪了？

AI: 找到 2 件牛奶相关物品：
    - 牛奶 x 2，位于未设置，过期日期 2025-12-31（已过期88天）

    ⚠️ 这批牛奶已经过期了，建议检查是否还能使用。
```

### 场景三：添加物品

```
用户: 帮我记录一下，牛奶放在冰箱里，5月1号过期

AI: ✅ 已添加：牛奶
    - 存放位置：冰箱
    - 过期日期：2025-05-01
    - 数量：1
```

### 场景四：扫码添加

```
用户: 帮我扫码添加这个商品，条形码是 6920459950180，放冰箱，明年3月过期

AI: ✅ 已识别并添加商品
    - 商品名称：蒙牛纯牛奶
    - 存放位置：冰箱
    - 过期日期：2026-03-31
    - 数量：1
```

### 场景五：按状态筛选

```
用户: 有哪些快过期的东西？

AI: 查询到以下临期物品：
    | 物品               | 位置   | 剩余天数 | 过期日期    |
    |--------------------|--------|---------|------------|
    | 尖叫多肽型运动饮料 | 我的家 | 30天    | 2026-04-29 |

    📌 运动饮料还有1个月过期，建议尽快饮用。
```

### 场景六：查看物品详情

```
用户: 帮我看看牛奶的详细信息

AI: 物品详细信息：
    - 名称：牛奶
    - 存放位置：未设置
    - 数量：2
    - 过期日期：2025-12-31
    - 状态：已过期（过期88天）
```

### 实用提示

- **分页加载**：物品较多时 AI 会自动分页查询（每页 20 条）
- **智能分类**：AI 会按"未过期/已过期/已消费"自动归类，不只是罗列数据
- **过期提醒**：AI 会主动计算过期天数并给出建议
- **模糊匹配**：搜索关键词支持物品名称、品牌等模糊匹配

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

1. 打开「不过期助手」小程序
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
- 不过期助手小程序
![小程序二维码](./doc/mini-scan.png)
- [问题反馈](https://github.com/fawaikuangtuzhangfei/baozhibao-mcp-server/issues)

## 📞 联系方式

- 作者: fawaikuangtuzhangfei
- GitHub: [@fawaikuangtuzhangfei](https://github.com/fawaikuangtuzhangfei)

---

如果这个项目对你有帮助，请给个 ⭐️ Star！
