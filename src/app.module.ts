import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./modules/auth/auth.module";
import { CategoriesModule } from './modules/categories/categories.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { PurchaseItemsModule } from './modules/purchase_items/purchase_items.module';
import { PurchaseModule } from './modules/purchases/purchase.module';
import { SaleItemsModule } from './modules/sale_items/sale_items.module';
import { SalesModule } from './modules/sales/sales.module';
import { SupplierModule } from './modules/suppliers/supplier.module';
import { UsersModule } from './modules/users/users.module';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    CategoriesModule,
    SupplierModule,
    PurchaseModule,
    ProductsModule,
    SalesModule,
    SaleItemsModule,
    PurchaseItemsModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}


