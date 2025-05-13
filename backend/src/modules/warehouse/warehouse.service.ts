import { Injectable } from '@nestjs/common';

export interface StockItem {
  category: string;
  quantity: number;
}

export interface Order {
  id: number;
  product: string;
  quantity: number;
  status: string;
}

@Injectable()
export class WarehouseService {
  private stock: StockItem[] = [
    { category: 'Electronics', quantity: 100 },
    { category: 'Furniture', quantity: 50 },
  ];

  private orders: Order[] = [
    { id: 1, product: 'Laptop', quantity: 10, status: 'Pending' },
    { id: 2, product: 'Chair', quantity: 5, status: 'Delivered' },
  ];

  getAllStock(): StockItem[] {
    return this.stock;
  }

  updateStock(category: string, updateStockDto: { quantity: number; action: 'add' | 'subtract' }): StockItem | undefined {
    const stockItem = this.stock.find((item) => item.category === category);
    if (stockItem) {
      if (updateStockDto.action === 'add') {
        stockItem.quantity += updateStockDto.quantity;
      } else if (updateStockDto.action === 'subtract') {
        stockItem.quantity -= updateStockDto.quantity;
      }
    }
    return stockItem;
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrdersByStatus(status: string): Order[] {
    return this.orders.filter((order) => order.status === status);
  }
}
