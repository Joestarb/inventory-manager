import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Product} from './entities/products.enity';
import { Category } from '../categories/entities/category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}

