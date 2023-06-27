import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'order_type' })
export class OrderType {
  @PrimaryGeneratedColumn()
  order_type_id: number;

  @Column({ unique: true })
  order_type_name: string;

  @Column()
  order_type_code: string;

  @Column()
  order_type_description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  order_type_pricing: number;
}
