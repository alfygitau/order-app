import { ContactDetails } from 'src/utils/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './Profile';
import { Order } from './Order';
import { Rating } from './Rating';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  WRITER = 'writer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  get orderCount(): number {
    return this.orders ? this.orders.length : 0;
  }
}
