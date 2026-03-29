# 贡献指南

感谢你对不过期助手 MCP Server 的关注！我们欢迎任何形式的贡献。

## 🐛 报告问题

如果你发现了 bug 或有功能建议：

1. 在 [Issues](https://github.com/fawaikuangtuzhangfei/baozhibao-mcp-server/issues) 中搜索是否已有相关问题
2. 如果没有，创建新的 Issue，包含：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤（如果是 bug）
   - 预期行为 vs 实际行为
   - 环境信息（Node 版本、操作系统等）

## 💡 提交代码

### 开发流程

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/baozhibao-mcp-server.git
   cd baozhibao-mcp-server
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **进行开发**
   ```bash
   # 开发模式
   npm run dev

   # 编译代码
   npm run build

   # 运行测试（如果有）
   npm test
   ```

6. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add some feature"
   ```

7. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建 Pull Request**
   - 在 GitHub 上打开你的 Fork
   - 点击 "New Pull Request"
   - 填写 PR 描述

### 代码规范

- 使用 TypeScript 编写代码
- 遵循现有的代码风格
- 添加必要的类型定义
- 更新相关文档

### 提交信息规范

使用语义化的提交信息：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具链相关

示例：
```
feat: add support for bulk item import
fix: resolve authentication token expiration issue
docs: update README with Cursor configuration
```

## 🧪 测试

在提交 PR 前，请确保：

1. 代码能够成功编译：`npm run build`
2. 使用 MCP Inspector 测试工具功能
   ```bash
   npx @modelcontextprotocol/inspector npm run dev
   ```
3. 在至少一个 AI 客户端中测试（Claude Desktop、Cursor 等）

## 📝 文档

如果你的更改影响了用户使用方式，请更新相关文档：

- README.md - 主要文档
- 工具描述 - 在 `server.ts` 中更新工具的 `description`
- API 文档 - 如果有 API 变更

## 🎨 功能建议

对于新功能建议，请先创建 Issue 讨论：

1. 描述你想要的功能
2. 说明使用场景
3. 如果可能，提供实现思路
4. 等待维护者反馈后再开始开发

## 📧 联系方式

如有疑问，可以通过以下方式联系：

- GitHub Issues: [创建 Issue](https://github.com/fawaikuangtuzhangfei/baozhibao-mcp-server/issues)
- Email: your-email@example.com

## 📜 行为准则

- 尊重所有贡献者
- 保持友好和专业的沟通
- 接受建设性的批评
- 关注对社区最有利的事情

---

再次感谢你的贡献！🎉
