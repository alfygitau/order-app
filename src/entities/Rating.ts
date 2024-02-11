import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  ratingId: number;

  @Column()
  value: number;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
