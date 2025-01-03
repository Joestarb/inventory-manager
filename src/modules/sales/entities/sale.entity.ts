import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn,ManyToOne, Join, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { SaleItem } from "src/modules/sale_items/entities/sale_items.entity";
@Entity('sales')

export class Sale {
  @PrimaryColumn()
  id: number;

 @ManyToOne(()=> User, (user) => user.sales)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  total_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => SaleItem, saleItem => saleItem.sale)
  saleItems: SaleItem[];
}