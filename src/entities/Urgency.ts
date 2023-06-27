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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
