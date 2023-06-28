import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Order } from './Order';

@Entity()
export class OrderRevision {
  @PrimaryGeneratedColumn()
  revision_id: number;

  @Column()
  order_id: number;

  @Column()
  revision_title: string;

  @Column()
  revision_instructions: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userId, { nullable: false })
  @JoinColumn()
  created_by: User;

  @ManyToOne(() => Order, (order) => order.order_id)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
