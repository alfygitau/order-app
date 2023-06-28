import { ContactDetails } from 'src/utils/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './Profile';

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

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;
}
