import axios, { AxiosInstance } from 'axios';
import { ApiResponse, LoginResponse, Item, ItemPageResult, AddItemRequest, QueryItemsRequest } from '../types';

/**
 * API Client for backend communication
 */
export class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;
  private apiKey: string | null = null;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const message = error.response.data?.message || error.message;
          throw new Error(`API Error: ${error.response.status} - ${message}`);
        }
        throw new Error(`Network Error: ${error.message}`);
      }
    );
  }

  /**
   * Set API Key for authentication
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.client.defaults.headers['X-API-Key'] = apiKey;
  }

  /**
   * Set JWT token for authentication
   */
  setToken(token: string): void {
    this.token = token;
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Login with API Key and get JWT token
   */
  async login(apiKey: string): Promise<string> {
    const response = await this.client.post<ApiResponse<LoginResponse>>('/api-keys/login', {
      apiKey,
    });

    const token = response.data.data.token;
    this.setToken(token);
    return token;
  }

  /**
   * Scan item by barcode
   */
  async scanItem(barcode: string): Promise<Item> {
    const response = await this.client.get<ApiResponse<Item>>('/items/scan', {
      params: { barcode },
    });
    return response.data.data;
  }

  /**
   * Add new item
   */
  async addItem(item: AddItemRequest): Promise<Item> {
    const response = await this.client.post<ApiResponse<Item>>('/items', item);
    return response.data.data;
  }

  /**
   * Query items
   */
  async queryItems(query: QueryItemsRequest): Promise<ItemPageResult> {
    const response = await this.client.get<ApiResponse<ItemPageResult>>('/items/list', {
      params: query,
    });
    return response.data.data;
  }

  /**
   * Get item by ID
   */
  async getItem(id: number): Promise<Item> {
    const response = await this.client.get<ApiResponse<Item>>(`/items/${id}`);
    return response.data.data;
  }

  /**
   * Get locations list
   */
  async getLocations(): Promise<any[]> {
    const response = await this.client.get<ApiResponse<any[]>>('/locations');
    return response.data.data;
  }

  /**
   * Get categories list
   */
  async getCategories(): Promise<any[]> {
    const response = await this.client.get<ApiResponse<any[]>>('/categories');
    return response.data.data;
  }
}
