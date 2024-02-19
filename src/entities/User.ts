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

  @Column()
  orderCount: number;

  @Column({ default: 1 })
  averageRating: number;

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

  calculateOrderCount() {
    this.orderCount = this.orders ? this.orders.length : 0;
  }
  calculateAverageRating() {
    if (this.ratings && this.ratings.length > 0) {
      const totalRating = this.ratings.reduce(
        (sum, rating) => sum + rating.value,
        0,
      );
      this.averageRating = Number(
        (totalRating / this.ratings.length).toFixed(1),
      );
    } else {
      this.averageRating = 0.0;
    }
  }
}
