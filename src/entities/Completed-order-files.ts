import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './Order';

@Entity('complete_order_files')
export class CompletedOrderFile {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId: number;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({ name: 'order' })
  order: Order;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
