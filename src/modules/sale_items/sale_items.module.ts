import { Module } from '@nestjs/common';
import { SaleItemsController } from './sale_items.controller';
import { SaleItemsService } from './sale_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleItem } from './entities/sale_items.entity';
import { Product } from '../products/entities/products.enity';
import { Sale } from '../sales/entities/sale.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SaleItem, Product, Sale])],
  controllers: [SaleItemsController],
  providers: [SaleItemsService]
})
export class SaleItemsModule {}
