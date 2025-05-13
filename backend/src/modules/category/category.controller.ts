import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from '../product/entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  async createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.createCategory(categoryData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of categories.' })
  async findAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category found.' })
  async findCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findCategoryById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.updateCategory(Number(id), categoryData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(Number(id));
  }
}
