import { ApiClient } from '../api/client.js';

export interface QueryItemsArgs {
  keyword?: string;
  locationId?: number;
  locationName?: string;
  status?: number;
  isNearlyExpired?: number;
  categoryId?: number;
  pageNum?: number;
  pageSize?: number;
}

export async function handleQueryItems(client: ApiClient, args: QueryItemsArgs): Promise<string> {
  try {
    let locationId = args.locationId;
    if (!locationId && args.locationName) {
      const locations = await client.getLocations();
      const location = locations.find(
        (l) => l.name.toLowerCase() === args.locationName?.toLowerCase()
      );
      if (location) {
        locationId = location.id;
      }
    }

    const result = await client.queryItems({
      keyword: args.keyword,
      locationId,
      status: args.status,
      isNearlyExpired: args.isNearlyExpired,
      categoryId: args.categoryId,
      pageNum: args.pageNum || 1,
      pageSize: args.pageSize || 20,
    });

    const items = result.list.map((item) => ({
      id: item.id,
      name: item.name,
      location: item.location?.name || '未设置',
      status: item.statusText,
      expiryDate: item.expiryDate || '无保质期',
      daysToExpiry: item.daysToExpiry,
      quantity: item.quantity,
      brand: item.brand,
    }));

    return JSON.stringify({
      success: true,
      total: result.total,
      pageNum: result.pageNum,
      pageSize: result.pageSize,
      items,
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : '查询物品失败',
    });
  }
}
