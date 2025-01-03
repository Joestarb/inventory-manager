import { Module } from '@nestjs/common';
import { PurchaseItemsController } from './purchase_items.controller';
import { PurchaseItemsService } from './purchase_items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItems } from './entities/purchase_items.entity';
import { Product } from '../products/entities/products.enity';
import { Purchase } from '../purchases/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItems,Product,Purchase])],
  controllers: [PurchaseItemsController],
  providers: [PurchaseItemsService]
})
export class PurchaseItemsModule {}
