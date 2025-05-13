import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InventoryService, InventoryItem } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create inventory item' })
  @ApiResponse({ status: 201, description: 'Inventory item created successfully.' })
  create(@Body() createInventoryDto: CreateInventoryDto): InventoryItem {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  @ApiResponse({ status: 200, description: 'List of inventory items.' })
  findAll(): InventoryItem[] {
    return this.inventoryService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get inventory item by ID' })
  // @ApiResponse({ status: 200, description: 'Inventory item found.' })
  // findOne(@Param('id') id: string): InventoryItem {
  //   return this.inventoryService.findOne(id);
  // }
}
