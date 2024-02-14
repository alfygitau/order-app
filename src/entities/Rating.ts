import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  ratingId: number;
  
  @Column({ type: 'decimal', precision: 5, scale: 1 })
  value: number;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
