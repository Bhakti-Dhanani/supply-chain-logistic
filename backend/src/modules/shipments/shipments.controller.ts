import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShipmentsService, ShipmentItem } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shipment' })
  @ApiResponse({ status: 201, description: 'Shipment created successfully.' })
  create(@Body() createShipmentDto: CreateShipmentDto): ShipmentItem {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shipments' })
  @ApiResponse({ status: 200, description: 'List of shipments.' })
  findAll(): ShipmentItem[] {
    return this.shipmentsService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get shipment by ID' })
  // @ApiResponse({ status: 200, description: 'Shipment found.' })
  // findOne(@Param('id') id: string): ShipmentItem {
  //   return this.shipmentsService.findOne(id);
  // }
}
