import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
