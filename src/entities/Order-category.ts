import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order-category' })
export class OrderCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_category_name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  order_category_value: number;

  @Column({ nullable: true })
  order_category_description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
