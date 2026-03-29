import { ApiClient } from '../api/client.js';

export interface GetItemArgs {
  id: number;
}

export async function handleGetItem(client: ApiClient, args: GetItemArgs): Promise<string> {
  try {
    const item = await client.getItem(args.id);

    return JSON.stringify({
      success: true,
      item: {
        id: item.id,
        name: item.name,
        category: item.category?.name || '未分类',
        location: item.location?.name || '未设置',
        status: item.statusText,
        expiryDate: item.expiryDate || '无保质期',
        daysToExpiry: item.daysToExpiry,
        quantity: item.quantity,
        totalQuantity: item.totalQuantity,
        consumedQuantity: item.consumedQuantity,
        brand: item.brand || '未知',
        specification: item.specification || '未知',
        barcode: item.barcode || '无',
        price: item.price,
        description: item.description,
        remark: item.remark,
        createTime: item.createTime,
        updateTime: item.updateTime,
        isNearlyExpired: item.isNearlyExpired === 1,
      },
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : '获取物品详情失败',
    });
  }
}
