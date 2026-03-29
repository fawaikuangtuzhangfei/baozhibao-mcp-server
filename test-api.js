#!/usr/bin/env node
const path = require('path');
const axios = require('axios');

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
const apiUrl = env.BAOZHIBAO_API_URL || 'http://localhost:8889/out_date';
const apiKey = env.BAOZHIBAO_API_KEY || 'sk_test';

async function testAPIs() {
  console.log('🔍 测试后端 API\n');
  console.log(`API URL: ${apiUrl}\n`);

  const client = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
  });

  // 先登录获取 token
  console.log('🔐 1. 登录');
  console.log('─────────────────────────────');
  try {
    const loginRes = await client.post('/api-keys/login', { apiKey });
    const token = loginRes.data.data.token;
    console.log('✅ 登录成功');
    client.defaults.headers['Authorization'] = `Bearer ${token}`;

    // 测试获取位置列表
    console.log('\n📍 2. 获取位置列表');
    console.log('─────────────────────────────');
    const locRes = await client.get('/locations');
    console.log('✅ 位置列表:', locRes.data.data);

    // 测试获取分类列表
    console.log('\n📂 3. 获取分类列表');
    console.log('─────────────────────────────');
    const catRes = await client.get('/categories');
    console.log('✅ 分类列表:', catRes.data.data);

    // 测试扫码
    console.log('\n📱 4. 扫码测试');
    console.log('─────────────────────────────');
    try {
      const scanRes = await client.post('/items/scan', { barcode: '6901234567890' });
      console.log('✅ 扫码结果:', scanRes.data.data);
    } catch (err) {
      console.log('❌ 扫码失败:', err.response?.data || err.message);
    }

    // 测试添加物品
    console.log('\n➕ 5. 添加物品测试');
    console.log('─────────────────────────────');
    try {
      const addRes = await client.post('/items', {
        name: 'MCP测试物品',
        locationId: 1,
        quantity: 1,
      });
      console.log('✅ 添加成功:', addRes.data.data);
    } catch (err) {
      console.log('❌ 添加失败:', err.response?.data || err.message);
    }

  } catch (error) {
    console.log('❌ 错误:', error.response?.data || error.message);
  }
}

testAPIs().catch(console.error);
