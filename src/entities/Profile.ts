import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  academicLevel: string;

  @Column()
  bio: string;

  @Column()
  profilePicture: string;

  @Column()
  language: string;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;
}
