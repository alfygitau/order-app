import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ManualOrder } from './ManualOrder';

@Entity('manual_order_files')
export class ManualOrderFile {
  @PrimaryGeneratedColumn({ name: 'manual_file_id' })
  manualFileId: number;

  @ManyToOne(() => ManualOrder, { nullable: true })
  @JoinColumn({ name: 'manual_order' })
  order: ManualOrder;

  @Column({ name: 'manual_file_url' })
  manualfileUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
