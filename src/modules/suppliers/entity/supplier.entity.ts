import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Purchase } from "src/modules/purchases/entities/purchase.entity";
@Entity('suppliers')
export class Supplier{
    @PrimaryColumn()
    id: number;

    @Column ()
    name: string;

    @Column()
    email: string;

    @Column( )
    phone: number;

    @Column()
    address: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: false }) 
    deleted: boolean;

    @OneToMany(() => Purchase, (purchase) => purchase.supplier)
    purchases: Purchase[];
}