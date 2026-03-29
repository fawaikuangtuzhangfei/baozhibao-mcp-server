#!/usr/bin/env node
const path = require('path');
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

// 读取 .env.test 文件
function loadEnvTest() {
  const fs = require('fs');
  const envPath = path.join(__dirname, '.env.test');
  const env = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        env[match[1]] = match[2];
      }
    });
  }
  return env;
}

const env = loadEnvTest();
const serverPath = 'D:/workspace/WeChatProjects_workspace/out_date_boot/mcp-server/dist/index.js';
const apiUrl = env.BAOZHIBAO_API_URL || 'http://localhost:8889/out_date';
const apiKey = env.BAOZHIBAO_API_KEY || 'sk_test';

async function testMCPServer() {
  console.log('🚀 完整功能测试\n');
  console.log(`API URL: ${apiUrl}`);
  console.log(`API Key: ${apiKey.substring(0, 15)}...\n`);

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
    const client = new Client(
      { name: 'test-client', version: '1.0.0' },
      { capabilities: {} }
    );

    console.log('📡 连接服务器...');
    await client.connect(transport);
    console.log('✅ 已连接\n');

    // 测试 1: 登录
    console.log('🔐 测试 1: 登录');
    console.log('─────────────────────────────');
    const loginRes = await client.callTool({
      name: 'login',
      arguments: { apiKey },
    });
    console.log(loginRes.content[0].text);
    console.log('');

    // 测试 2: 查询所有物品
    console.log('📦 测试 2: 查询所有物品');
    console.log('─────────────────────────────');
    const queryRes = await client.callTool({
      name: 'query_items',
      arguments: {},
    });
    console.log(queryRes.content[0].text);
    console.log('');

    // 测试 3: 关键词搜索
    console.log('🔍 测试 3: 关键词搜索"测试"');
    console.log('─────────────────────────────');
    const searchRes = await client.callTool({
      name: 'query_items',
      arguments: { keyword: '测试' },
    });
    console.log(searchRes.content[0].text);
    console.log('');

    // 测试 4: 获取物品详情
    console.log('📄 测试 4: 获取物品详情 (ID: 6057)');
    console.log('─────────────────────────────');
    const getRes = await client.callTool({
      name: 'get_item',
      arguments: { id: 6057 },
    });
    console.log(getRes.content[0].text);
    console.log('');

    // 测试 5: 添加物品（简单版）
    console.log('➕ 测试 5: 添加物品（简单）');
    console.log('─────────────────────────────');
    try {
      const addRes1 = await client.callTool({
        name: 'add_item',
        arguments: {
          name: '苹果',
          locationName: '冰箱',
        },
      });
      console.log(addRes1.content[0].text);
    } catch (err) {
      console.log('Error:', err.message);
    }
    console.log('');

    // 测试 6: 添加物品（完整版）
    console.log('➕ 测试 6: 添加物品（完整信息）');
    console.log('─────────────────────────────');
    try {
      const addRes2 = await client.callTool({
        name: 'add_item',
        arguments: {
          name: '牛奶',
          locationName: '冷藏室',
          expiryDate: '2025-12-31',
          quantity: 2,
          categoryName: '食品',
          brand: '伊利',
          price: 5.5,
        },
      });
      console.log(addRes2.content[0].text);
    } catch (err) {
      console.log('Error:', err.message);
    }
    console.log('');

    // 测试 7: 扫码添加
    console.log('📱 测试 7: 扫码添加物品');
    console.log('─────────────────────────────');
    try {
      const scanRes = await client.callTool({
        name: 'scan_add_item',
        arguments: {
          barcode: '6974324350001',
          locationName: '货架',
        },
      });
      console.log(scanRes.content[0].text);
    } catch (err) {
      console.log('Error:', err.message);
    }
    console.log('');

    // 测试 8: 查询临期物品
    console.log('⏰ 测试 8: 查询临期物品');
    console.log('─────────────────────────────');
    try {
      const expiringRes = await client.callTool({
        name: 'query_items',
        arguments: { isNearlyExpired: 1 },
      });
      console.log(expiringRes.content[0].text);
    } catch (err) {
      console.log('Error:', err.message);
    }
    console.log('');

    console.log('✅ 所有测试完成!');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    await transport.close();
    console.log('\n🧹 清理完成');
    process.exit(0);
  }
}

testMCPServer().catch(console.error);
