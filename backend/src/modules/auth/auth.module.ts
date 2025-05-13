import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { OrdersModule } from '../orders/orders.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ShipmentsModule } from '../shipments/shipments.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

dotenv.config();

const userRepositoryProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: [DataSource],
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      ...require('../../config/jwt.config').default().jwt,
    }),
    TypeOrmModule.forFeature([User]),
    OrdersModule,
    InventoryModule,
    ShipmentsModule,
    WarehouseModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, userRepositoryProvider],
})
export class AuthModule {}
