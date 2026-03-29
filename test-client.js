#!/usr/bin/env node
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

// 配置
const serverPath = 'D:/workspace/WeChatProjects_workspace/out_date_boot/mcp-server/dist/index.js';
const apiUrl = process.env.BAOZHIBAO_API_URL || 'https://h1b.site/out_date';
const apiKey = process.env.BAOZHIBAO_API_KEY || 'sk_test';

async function testMCPServer() {
  console.log('🚀 Starting MCP Server test...\n');
  console.log(`API URL: ${apiUrl}`);
  console.log(`API Key: ${apiKey.substring(0, 10)}...\n`);

  // 创建 stdio transport - 会自动启动服务器进程
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath],
    env: {
      BAOZHIBAO_API_URL: apiUrl,
      BAOZHIBAO_API_KEY: apiKey,
    },
    stderr: 'inherit',
  });

  try {
    // 创建客户端
    const client = new Client(
      {
        name: 'test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    // 连接 transport (会自动启动服务器)
    console.log('📡 Connecting to server...');
    await client.connect(transport);
    console.log('✅ Connected!\n');

    // 测试 1: 列出工具
    console.log('🔧 Test 1: List Tools');
    console.log('─────────────────────────────');
    const toolsResponse = await client.listTools();
    console.log(`Available tools: ${toolsResponse.tools.length}`);
    toolsResponse.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description.substring(0, 50)}...`);
    });
    console.log('');

    // 测试 2: 登录
    console.log('🔐 Test 2: Login');
    console.log('─────────────────────────────');
    try {
      const loginResponse = await client.callTool({
        name: 'login',
        arguments: {
          apiKey: apiKey,
        },
      });
      console.log('Login result:', loginResponse.content[0].text);
    } catch (err) {
      console.log('Login failed:', err.message);
    }
    console.log('');

    // 测试 3: 查询物品
    console.log('📦 Test 3: Query Items');
    console.log('─────────────────────────────');
    try {
      const queryResponse = await client.callTool({
        name: 'query_items',
        arguments: {
          keyword: '测试',
        },
      });
      console.log('Query result:', queryResponse.content[0].text);
    } catch (err) {
      console.log('Query failed:', err.message);
    }
    console.log('');

    // 测试 4: 添加物品
    console.log('➕ Test 4: Add Item');
    console.log('─────────────────────────────');
    try {
      const addResponse = await client.callTool({
        name: 'add_item',
        arguments: {
          name: '测试物品',
          locationName: '测试位置',
          expiryDate: '2025-12-31',
        },
      });
      console.log('Add item result:', addResponse.content[0].text);
    } catch (err) {
      console.log('Add item failed:', err.message);
    }
    console.log('');

    console.log('✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // 清理
    try {
      await transport.close();
    } catch (e) {
      // ignore
    }
    console.log('\n🧹 Cleaned up');
    process.exit(0);
  }
}

testMCPServer().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
