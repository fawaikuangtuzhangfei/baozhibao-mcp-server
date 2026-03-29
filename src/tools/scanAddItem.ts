import { ApiClient } from '../api/client.js';

export interface ScanAddItemArgs {
  barcode: string;
  locationId?: number;
  locationName?: string;
  quantity?: number;
  expiryDate?: string;
}

export async function handleScanAddItem(client: ApiClient, args: ScanAddItemArgs): Promise<string> {
  try {
    const scannedItem = await client.scanItem(args.barcode);

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

    const item = await client.addItem({
      name: scannedItem.name || `条形码商品 ${args.barcode}`,
      barcode: args.barcode,
      locationId,
      expiryDate: args.expiryDate,
      quantity: args.quantity || 1,
      categoryId: scannedItem.categoryId,
      brand: scannedItem.brand,
      specification: scannedItem.specification,
      image: scannedItem.image,
    });

    return JSON.stringify({
      success: true,
      message: '扫码添加物品成功',
      item: {
        id: item.id,
        name: item.name,
        barcode: args.barcode,
        brand: item.brand || '未知',
        specification: item.specification || '未知',
        location: item.location?.name || '未设置',
        expiryDate: item.expiryDate || '未设置',
        quantity: item.quantity,
      },
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : '扫码添加物品失败',
    });
  }
}
