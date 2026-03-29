import { ApiClient } from '../api/client.js';

export interface LoginArgs {
  apiKey: string;
}

export async function handleLogin(client: ApiClient, args: LoginArgs): Promise<string> {
  try {
    const token = await client.login(args.apiKey);
    return JSON.stringify({
      success: true,
      message: '登录成功',
      token: token.substring(0, 20) + '...',
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : '登录失败',
    });
  }
}
