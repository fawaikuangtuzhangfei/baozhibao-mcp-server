import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ApiClient } from './api/client.js';
import { handleLogin } from './tools/login.js';
import { handleAddItem } from './tools/addItem.js';
import { handleScanAddItem } from './tools/scanAddItem.js';
import { handleQueryItems } from './tools/queryItems.js';
import { handleGetItem } from './tools/getItem.js';

// Configuration
const API_URL = process.env.BAOZHIBAO_API_URL || 'http://localhost:8080';
const DEFAULT_API_KEY = process.env.BAOZHIBAO_API_KEY;

// Create API client
const apiClient = new ApiClient(API_URL);

// If default API key is provided, auto-login
if (DEFAULT_API_KEY) {
  console.error('[MCP] Auto-login with default API key...');
  apiClient.login(DEFAULT_API_KEY).catch((err) => {
    console.error('[MCP] Auto-login failed:', err.message);
  });
}

// Create MCP Server
const server = new Server(
  {
    name: 'baozhibao-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'login',
        description: '使用 API Key 登录，获取认证 Token。这是使用其他工具前的第一步。',
        inputSchema: {
          type: 'object',
          properties: {
            apiKey: {
              type: 'string',
              description: 'API Key，格式为 sk_xxx，可在小程序中生成',
            },
          },
          required: ['apiKey'],
        },
      },
      {
        name: 'add_item',
        description: '添加新物品。可以记录物品名称、存放位置、过期日期等信息。',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: '物品名称（必填）' },
            locationId: { type: 'number', description: '存放位置ID' },
            locationName: { type: 'string', description: '存放位置名称，如"冰箱"、"柜子"' },
            expiryDate: { type: 'string', description: '过期日期，格式 YYYY-MM-DD' },
            quantity: { type: 'number', description: '数量，默认为1' },
            categoryId: { type: 'number', description: '分类ID' },
            categoryName: { type: 'string', description: '分类名称，如"食品"、"日用品"' },
            description: { type: 'string', description: '物品描述' },
            brand: { type: 'string', description: '品牌' },
            specification: { type: 'string', description: '规格' },
            price: { type: 'number', description: '价格' },
            remark: { type: 'string', description: '备注' },
          },
          required: ['name'],
        },
      },
      {
        name: 'scan_add_item',
        description: '通过扫描条形码添加物品。系统会自动识别物品信息，用户只需补充存放位置等信息。',
        inputSchema: {
          type: 'object',
          properties: {
            barcode: { type: 'string', description: '条形码（必填）' },
            locationId: { type: 'number', description: '存放位置ID' },
            locationName: { type: 'string', description: '存放位置名称，如"冰箱"、"柜子"' },
            quantity: { type: 'number', description: '数量，默认为1' },
            expiryDate: { type: 'string', description: '过期日期，格式 YYYY-MM-DD' },
          },
          required: ['barcode'],
        },
      },
      {
        name: 'query_items',
        description: '查询物品列表。可以通过关键词、位置、状态等条件筛选。',
        inputSchema: {
          type: 'object',
          properties: {
            keyword: { type: 'string', description: '搜索关键词，匹配物品名称、品牌等' },
            locationId: { type: 'number', description: '存放位置ID' },
            locationName: { type: 'string', description: '存放位置名称' },
            status: { type: 'number', description: '状态：0-未过期，1-已过期，2-已消费' },
            isNearlyExpired: { type: 'number', description: '是否临期：0-非临期，1-临期' },
            categoryId: { type: 'number', description: '分类ID' },
            pageNum: { type: 'number', description: '页码，默认1' },
            pageSize: { type: 'number', description: '每页数量，默认20' },
          },
          required: [],
        },
      },
      {
        name: 'get_item',
        description: '获取物品详细信息。通过物品ID查询物品的完整信息。',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '物品ID（必填）' },
          },
          required: ['id'],
        },
      },
    ],
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  let result: string;

  switch (name) {
    case 'login':
      result = await handleLogin(apiClient, args as any);
      break;
    case 'add_item':
      result = await handleAddItem(apiClient, args as any);
      break;
    case 'scan_add_item':
      result = await handleScanAddItem(apiClient, args as any);
      break;
    case 'query_items':
      result = await handleQueryItems(apiClient, args as any);
      break;
    case 'get_item':
      result = await handleGetItem(apiClient, args as any);
      break;
    default:
      result = JSON.stringify({ success: false, message: `Unknown tool: ${name}` });
  }

  return {
    content: [{ type: 'text', text: result }],
  };
});

// Start server
export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[MCP] Server started');
}
