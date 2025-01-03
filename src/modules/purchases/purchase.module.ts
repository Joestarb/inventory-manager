import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from '../suppliers/entity/supplier.entity';

@Module({
 imports: [TypeOrmModule.forFeature([Purchase, Supplier]),
  
],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
