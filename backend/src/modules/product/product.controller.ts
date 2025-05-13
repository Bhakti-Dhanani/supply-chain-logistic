import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created or stock incremented.' })
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products.' })
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product found.' })
  async findProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.updateProduct(Number(id), updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(Number(id));
  }
}
