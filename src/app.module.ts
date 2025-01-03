import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';  // Asegúrate de importar el UsersModule
import { User } from './modules/users/entities/user.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './modules/categories/entities/category.entity';
import { SupplierModule } from './modules/suppliers/supplier.module';
import { Supplier } from './modules/suppliers/entity/supplier.entity';
import { PurchaseModule } from './modules/purchases/purchase.module';
import { Purchase } from './modules/purchases/entities/purchase.entity';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/products.enity';
import { SalesModule } from './modules/sales/sales.module';
import { Sale } from './modules/sales/entities/sale.entity';
import { SaleItemsModule } from './modules/sale_items/sale_items.module';
import { SaleItem } from './modules/sale_items/entities/sale_items.entity';
import { PurchaseItemsModule } from './modules/purchase_items/purchase_items.module';
import { PurchaseItems } from './modules/purchase_items/entities/purchase_items.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pos_system',
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
    UsersModule,
    CategoriesModule,
    SupplierModule,
    PurchaseModule,
    ProductsModule,
    SalesModule,
    SaleItemsModule,
    PurchaseItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

