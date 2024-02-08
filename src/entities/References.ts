import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_references')
export class Reference {
  @PrimaryGeneratedColumn()
  reference_id: number;

  @Column()
  reference_name: string;

  @Column({ length: 500 })
  reference_description: string;

  @Column()
  number_of_references: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
