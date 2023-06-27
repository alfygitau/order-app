import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';

@Entity('order_files')
export class OrderFile {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId: number;

  @ManyToOne(() => Order, { nullable: false })
  @JoinColumn({ name: 'order' })
  order: Order;

  @Column({ name: 'file_url' })
  fileUrl: string;
}
