import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Product } from "src/modules/products/entities/products.enity";
@Entity('categories')
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 200})
    description: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column({default: false})
    deleted: boolean;

     @OneToMany(() => Product, (product) => product.category)
     products: Product[];

}   