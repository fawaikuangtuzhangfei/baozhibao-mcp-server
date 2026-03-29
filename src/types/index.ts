/**
 * Type definitions for MCP Server
 */

// API Response wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Login response
export interface LoginResponse {
  token: string;
}

// Item DTO
export interface Item {
  id: number;
  name: string;
  categoryId?: number;
  category?: Category;
  locationId?: number;
  location?: Location;
  productionDate?: string;
  shelfLife?: number;
  shelfLifeUnit?: string;
  expiryDate?: string;
  description?: string;
  image?: string;
  status?: number;
  statusText?: string;
  daysToExpiry?: number;
  barcode?: string;
  specification?: string;
  brand?: string;
  isNearlyExpired?: number;
  nearlyExpiredText?: string;
  quantity?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  price?: number;
  remark?: string;
  hasExpiry?: number;
  enableReminder?: number;
  familyId?: number;
  isShared?: number;
  createTime?: string;
  updateTime?: string;
}

// Category
export interface Category {
  id: number;
  name: string;
  icon?: string;
}

// Location
export interface Location {
  id: number;
  name: string;
  icon?: string;
}

// Item page result
export interface ItemPageResult {
  list: Item[];
  total: number;
  pageNum: number;
  pageSize: number;
  pages: number;
}

// Add item request
export interface AddItemRequest {
  name: string;
  categoryId?: number;
  locationId?: number;
  productionDate?: string;
  shelfLife?: number;
  shelfLifeUnit?: string;
  expiryDate?: string;
  description?: string;
  image?: string;
  barcode?: string;
  specification?: string;
  brand?: string;
  quantity?: number;
  price?: number;
  remark?: string;
  hasExpiry?: number;
  enableReminder?: number;
  familyId?: number;
  isShared?: number;
}

// Query items request
export interface QueryItemsRequest {
  pageNum?: number;
  pageSize?: number;
  categoryId?: number;
  locationId?: number;
  status?: number;
  keyword?: string;
  isNearlyExpired?: number;
  sortField?: string;
  sortOrder?: string;
  familyId?: number;
  memberId?: number;
}

// MCP Tool context
export interface ToolContext {
  apiClient: ApiClient;
}

// API Client interface
export interface ApiClient {
  login(apiKey: string): Promise<string>;
  scanItem(barcode: string): Promise<Item>;
  addItem(item: AddItemRequest): Promise<Item>;
  queryItems(query: QueryItemsRequest): Promise<ItemPageResult>;
  getItem(id: number): Promise<Item>;
}

// Configuration
export interface McpServerConfig {
  apiUrl: string;
  apiKey?: string;
}
