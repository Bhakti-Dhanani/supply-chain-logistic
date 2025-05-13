import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WarehouseService, StockItem, Order } from './warehouse.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('stock')
  @ApiOperation({ summary: 'Get all stock items' })
  @ApiResponse({ status: 200, description: 'List of stock items.' })
  getAllStock(): StockItem[] {
    return this.warehouseService.getAllStock();
  }

  @Put('stock/:category')
  @ApiOperation({ summary: 'Update stock by category' })
  @ApiResponse({ status: 200, description: 'Stock item updated successfully.' })
  updateStock(@Param('category') category: string, @Body() updateStockDto: UpdateStockDto): StockItem | undefined {
    return this.warehouseService.updateStock(category, updateStockDto);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders.' })
  getAllOrders(): Order[] {
    return this.warehouseService.getAllOrders();
  }

  @Get('orders/status/:status')
  @ApiOperation({ summary: 'Get orders by status' })
  @ApiResponse({ status: 200, description: 'List of orders filtered by status.' })
  getOrdersByStatus(@Param('status') status: string): Order[] {
    return this.warehouseService.getOrdersByStatus(status);
  }
}
