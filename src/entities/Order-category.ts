import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'order-category'})
export class OrderCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_category_name: string;

  @Column({ nullable: true })
  order_category_description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
