import { ApiClient } from '../api/client.js';

export interface AddItemArgs {
  name: string;
  locationId?: number;
  locationName?: string;
  expiryDate?: string;
  quantity?: number;
  categoryId?: number;
  categoryName?: string;
  description?: string;
  brand?: string;
  specification?: string;
  price?: number;
  remark?: string;
}

export async function handleAddItem(client: ApiClient, args: AddItemArgs): Promise<string> {
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

    let categoryId = args.categoryId;
    if (!categoryId && args.categoryName) {
      const categories = await client.getCategories();
      const category = categories.find(
        (c) => c.name.toLowerCase() === args.categoryName?.toLowerCase()
      );
      if (category) {
        categoryId = category.id;
      }
    }

    const item = await client.addItem({
      name: args.name,
      locationId,
      expiryDate: args.expiryDate,
      quantity: args.quantity || 1,
      categoryId,
      description: args.description,
      brand: args.brand,
      specification: args.specification,
      price: args.price,
      remark: args.remark,
    });

    return JSON.stringify({
      success: true,
      message: '物品添加成功',
      item: {
        id: item.id,
        name: item.name,
        location: item.location?.name || '未设置',
        expiryDate: item.expiryDate || '未设置',
        quantity: item.quantity,
      },
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : '添加物品失败',
    });
  }
}
