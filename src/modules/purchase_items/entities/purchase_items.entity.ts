import { Product } from "src/modules/products/entities/products.enity";
import { Purchase } from "src/modules/purchases/entities/purchase.entity";
import { Entity, ManyToOne, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchase_items')
export class PurchaseItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Purchase, purchase => purchase.purchaseItems)
    @JoinColumn({ name: 'purchase_id' })
    purchase: Purchase;

    @ManyToOne(() => Product, product => product.purchaseItems)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number;

    @Column()
    unit_price: number;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    deleted: boolean;
}