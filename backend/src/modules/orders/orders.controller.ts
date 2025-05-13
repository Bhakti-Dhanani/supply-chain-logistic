import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders.' })
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order found.' })
  getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  @Get('vendor/:vendorId')
  getOrdersByVendorId(@Param('vendorId') vendorId: number) {
    return this.ordersService.getOrdersByVendorId(vendorId);
  }

  @Put(':id')
  updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
