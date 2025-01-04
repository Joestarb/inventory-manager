import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Supplier } from '../suppliers/entity/supplier.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Product } from '../products/entities/products.enity';
import { Sale } from '../sales/entities/sale.entity';
import { SaleItem } from '../sale_items/entities/sale_items.entity';
import { PurchaseItems } from '../purchase_items/entities/purchase_items.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          User,
          Category,
          Supplier,
          Purchase,
          Product,
          Sale,
          SaleItem,
          PurchaseItems,
        ],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}


