import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_academic-level' })
export class AcademicLevel {
  @PrimaryGeneratedColumn()
  academic_level_id: number;

  @Column()
  academic_level_name: string;

  @Column({ nullable: true })
  academic_level_description: string;

  @Column({ nullable: true })
  academic_level_code: string;

  @Column({ nullable: true })
  academic_level_value: number;

  @Column({ nullable: true })
  level_order: number;

  @Column({ default: true })
  IsActive: boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
