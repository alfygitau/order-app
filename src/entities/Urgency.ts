import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_urgency' })
export class Urgency {
  @PrimaryGeneratedColumn()
  urgency_id: number;

  @Column()
  order_urgency_name: string;

  @Column()
  order_urgency_duration: number;

  @Column({ nullable: true })
  order_urgency_description: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
