import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'order_type' })
export class OrderType {
  @PrimaryGeneratedColumn()
  typeId: number;

  @Column({ unique: true })
  typeName: string;

  @Column()
  typeCode: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricing: number;
}
