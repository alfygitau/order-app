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

@Entity('revision_files')
export class RevisionFile {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId: number;

  @ManyToOne(() => Order, (order) => order.order_id, { nullable: false })
  @JoinColumn({ name: 'order' })
  order: Order;

  // @ManyToOne(() => OrderRevision, (revision) => revision.revision_id, { nullable: false })
  // @JoinColumn({ name: 'order' })
  // revision_id: OrderRevision;

  @Column({ name: 'file_url' })
  fileUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
