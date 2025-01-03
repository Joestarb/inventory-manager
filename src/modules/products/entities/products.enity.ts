import { Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity, OneToMany } from "typeorm";
import { Category } from "src/modules/categories/entities/category.entity";
import { SaleItem } from "src/modules/sale_items/entities/sale_items.entity";
import { PurchaseItems } from "src/modules/purchase_items/entities/purchase_items.entity";
@Entity('products')
export class Product {
    @PrimaryColumn() 
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    purchase_price: number;

    @Column()
    sale_price: number;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => SaleItem, saleItem => saleItem.product)
    saleItems: SaleItem[];

    @OneToMany(() => PurchaseItems, purchaseItem => purchaseItem.product)
    purchaseItems: PurchaseItems[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    deleted: boolean;

    @Column()
    product_number: string;
}











