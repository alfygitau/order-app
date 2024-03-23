import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ManualOrderFile } from './Manual_order_files';

@Entity()
export class ManualOrder {
  @PrimaryGeneratedColumn()
  manual_order_id: number;

  @Column({ length: 500, nullable:true })
  manual_order_title: string;

  @Column({ length: 10000, nullable:true })
  manual_order_comments: string;

  @JoinColumn()
  @OneToMany(() => ManualOrderFile, (file) => file.order)
  manual_order_files: ManualOrderFile[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
