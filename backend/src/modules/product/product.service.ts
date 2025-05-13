import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const { name, category, stockQuantity = 1, ...rest } = productData;
    // Find category by id
    const categoryEntity = await this.categoryRepository.findOne({ where: { id: category?.id } });
    if (!categoryEntity) {
      throw new Error('Category not found');
    }
    // Check if product with same name and category exists
    let product = await this.productRepository.findOne({ where: { name, category: { id: categoryEntity.id } }, relations: ['category'] });
    if (product) {
      product.stockQuantity += stockQuantity;
      await this.productRepository.save(product);
      // Refetch with all relations for full details
      return this.productRepository.findOne({ where: { id: product.id }, relations: ['category'] }) as Promise<Product>;
    } else {
      product = this.productRepository.create({ name, stockQuantity, category: categoryEntity, ...rest });
      const savedProduct = await this.productRepository.save(product);
      // Refetch with all relations for full details
      return this.productRepository.findOne({ where: { id: savedProduct.id }, relations: ['category'] }) as Promise<Product>;
    }
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new Error('Product not found');
    return product;
  }

  async updateProduct(id: number, updateData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new Error('Product not found');
    // Explicitly update stockQuantity if provided
    if (updateData.stockQuantity !== undefined) {
      product.stockQuantity = updateData.stockQuantity;
      delete updateData.stockQuantity;
    }
    Object.assign(product, updateData);
    await this.productRepository.save(product);
    // Refetch with all relations for full details
    return this.productRepository.findOne({ where: { id: product.id }, relations: ['category'] }) as Promise<Product>;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
