import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany,  } from "typeorm";
import { Supplier } from "src/modules/suppliers/entity/supplier.entity";
import { PurchaseItems } from "src/modules/purchase_items/entities/purchase_items.entity";
@Entity('purchases')
export class Purchase{
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;
    
    @Column()
    total_amount: number;

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false })
    deleted: boolean;

    @OneToMany(() => PurchaseItems, purchaseItem => purchaseItem.purchase)
    purchaseItems: PurchaseItems[];
}