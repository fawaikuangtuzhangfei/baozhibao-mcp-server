#!/usr/bin/env node
import 'dotenv/config';
import { main } from './server.js';

main().catch((error) => {
  console.error('[MCP] Fatal error:', error);
  process.exit(1);
});
