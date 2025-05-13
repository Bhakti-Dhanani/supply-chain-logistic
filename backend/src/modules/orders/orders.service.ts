import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

export interface OrderItem {
  id: number;
  product: string;
  vendorId: number;
  status: string;
}

@Injectable()
export class OrdersService {
  private orders: OrderItem[] = []; // Initialize as an empty array

  createOrder(createOrderDto: CreateOrderDto) {
    const newOrder: OrderItem = {
      id: Date.now(),
      product: createOrderDto.product,
      vendorId: createOrderDto.vendorId,
      status: createOrderDto.status,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  getAllOrders() {
    return this.orders;
  }

  getOrderById(id: number) {
    return this.orders.find((order) => order.id === id);
  }

  getOrdersByVendorId(vendorId: number) {
    return this.orders.filter((order) => order.vendorId === vendorId);
  }

  updateOrderStatus(id: number, status: string) {
    const order = this.orders.find((order) => order.id === id);
    if (order) {
      order.status = status;
    }
    return order;
  }

  deleteOrder(id: number) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index !== -1) {
      return this.orders.splice(index, 1);
    }
    return null;
  }
}
