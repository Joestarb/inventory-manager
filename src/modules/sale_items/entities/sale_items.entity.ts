import { Column, UpdateDateColumn, CreateDateColumn, Entity, PrimaryColumn, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Product } from "src/modules/products/entities/products.enity";
@Entity('sale_items')
export class SaleItem {
    @PrimaryColumn()
    id: number;

    //fk sale_id
    @ManyToOne(() => Sale, sale => sale.saleItems)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
    //fk product_id
    @ManyToOne(() => Product, product => product.saleItems)
    @JoinColumn({ name: 'product_id' })
    product: Product;
    @Column()
    quantity: number;

    @Column()
    unit_price: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Column()
    deleted: boolean;

}



